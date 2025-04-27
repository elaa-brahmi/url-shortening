package backend.example.demo.service;

import backend.example.demo.model.UrlShortened;
import backend.example.demo.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHORT_CODE_LENGTH = 6;
    @Autowired
    private UrlRepository urlRepository;
    public UrlService(UrlRepository urlRepository){
        this.urlRepository = urlRepository;
    }
    public String generateRandomUrl(){
        Random random=new Random();
        String shorturl;
        int counter=0;
        do{
            StringBuilder url=new StringBuilder();
            for(int i=0;i<SHORT_CODE_LENGTH;i++){
                url.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            shorturl=url.toString();
            counter++;
            if(counter>6){
                throw new RuntimeException("failed to generate unique code after 6 attempts");
            }

        }while(urlRepository.findByShortenedUrl(shorturl)==null);
        return shorturl;
    }
    public void createUrl(String  Originalurl){
        String shorturl=generateRandomUrl();
        UrlShortened newUrl=new UrlShortened();
        newUrl.builder()
                .shortenedUrl(shorturl)
                .originalUrl(Originalurl)
                .build();
        urlRepository.save(newUrl);

    }
    public Optional<UrlShortened> getUrlFromShortenedUrl(String shortenedUrl){
         Optional<UrlShortened> original =urlRepository.findByShortenedUrl(shortenedUrl);
         if(original.isPresent()){
             UrlShortened urlShortened=original.get();
             urlShortened.setAccessCount(original.get().getAccessCount()+1);
             urlRepository.save(urlShortened);
         }
         else{
             return Optional.empty();
         }
         return original;
    }

    public void updateShortUrl(String originalUrl, String shortenedUrl){
        Optional<UrlShortened> original =urlRepository.findByShortenedUrl(shortenedUrl);
        if(original.isPresent()){
            original.get().setOriginalUrl(originalUrl);
            original.get().setUpdatedAt(LocalDateTime.now());
            urlRepository.save(original.get());
        }

    }
    public List<UrlShortened> getAllUrls(){
        List<UrlShortened> urls=urlRepository.findAll();
        return urls;

    }
    public void deleteUrl(Integer id){
        urlRepository.deleteById(id);

    }
    public Integer getNumberAccessed(Integer id){
        UrlShortened url=urlRepository.findById(id).get();
        return url.getAccessCount();

    }

}
