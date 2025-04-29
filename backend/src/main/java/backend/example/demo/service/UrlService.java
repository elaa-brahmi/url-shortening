package backend.example.demo.service;

import backend.example.demo.exception.NotFoundUrl;
import backend.example.demo.exception.ShortUrlExist;
import backend.example.demo.exception.TooManyAttempts;
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
                throw new TooManyAttempts("failed to generate unique code after 6 attempts");
            }


        }while(urlRepository.findByShortenedUrl(shorturl).isPresent());
        return shorturl;

    }
    public void generateCustomShortenedUrl(String shortenedUrl,String originalUrl){
        if(urlRepository.findByShortenedUrl(shortenedUrl).isPresent()){
            throw new ShortUrlExist("this short url already exist, choose another");
        }
        UrlShortened newUrl = UrlShortened.builder()
                .shortenedUrl(shortenedUrl)
                .originalUrl(originalUrl)
                .accessCount(0)
                .createdAt(LocalDateTime.now())
                .type("custom")
                .build();
        urlRepository.save(newUrl);

    }
    public void createUrl(String  Originalurl) throws TooManyAttempts {
            String shorturl=generateRandomUrl();
            UrlShortened newUrl = UrlShortened.builder()
                    .shortenedUrl(shorturl)
                    .originalUrl(Originalurl)
                    .accessCount(0)
                    .type("generated")
                    .createdAt(LocalDateTime.now())
                    .build();
            urlRepository.save(newUrl);
    }
    public void copyUrl(Integer id){
        UrlShortened url=urlRepository.findById(id).get();
        url.setAccessCount(url.getAccessCount()+1);
        urlRepository.save(url);


    }
    public Optional<UrlShortened> getUrlFromShortenedUrl(String shortenedUrl){
         Optional<UrlShortened> original =urlRepository.findByShortenedUrl(shortenedUrl);
         if(original.isPresent()){
             UrlShortened urlShortened=original.get();
             urlShortened.setAccessCount(original.get().getAccessCount()+1);
             urlRepository.save(urlShortened);
         }
         else{
             throw new NotFoundUrl("Url not found for shortened url: "+shortenedUrl);
         }
         return original;
    }

    public UrlShortened updateShortUrl(String originalUrl, Integer urlId){
        Optional<UrlShortened> original =urlRepository.findById(urlId);
        if(original.isPresent()){
            original.get().setOriginalUrl(originalUrl);
            original.get().setUpdatedAt(LocalDateTime.now());
            return urlRepository.save(original.get());
        }
        return null;

    }
    public Optional<List<UrlShortened>> getAllUrls(){
        List<UrlShortened> urls=urlRepository.findAll();
        if(urls.isEmpty()){
            throw new NotFoundUrl("no urls found");
        }
        else{
            return Optional.of(urls);
        }

    }
    public void deleteUrl(Integer id){
        urlRepository.deleteById(id);

    }
    public Integer getNumberAccessed(Integer id){
        UrlShortened url=urlRepository.findById(id).get();
        return url.getAccessCount();

    }

}
