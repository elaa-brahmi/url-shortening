package backend.example.demo.controller;

import backend.example.demo.model.UrlShortened;
import backend.example.demo.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor //generates constructor for all fields that are marked as final or are marked with @NonNull
@RequestMapping("/shorten")
@Tag(
        name="URL Shortening APIs",
        description = "APIs for shortening, managing, and resolving URLs. Includes endpoints for creating short URLs, retrieving original URLs, and analyzing URL usage statistics."
)
public class UrlController {
    private final UrlService urlService;

    @GetMapping("/")
    @Operation(summary = "get all urls",description = "")
    public ResponseEntity<List<UrlShortened>> getAllUrls(){
        Optional<List<UrlShortened>> urls = urlService.getAllUrls();
        return urls.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
    @PostMapping("/create")
    @Operation(summary="create a new url")
    public ResponseEntity<Void> createUrl(@RequestBody String url){
        urlService.createUrl(url);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/GetOriginal")
    @Operation(summary="get an original url")
    public ResponseEntity<UrlShortened> getOriginalUrl(@RequestParam String shortUrl){
        Optional<UrlShortened> original=urlService.getUrlFromShortenedUrl(shortUrl);
        return original.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
    @PutMapping("/update/{id}")
    @Operation(summary="update an url by it's id")
    public ResponseEntity<UrlShortened> updateUrl(@PathVariable String id, @RequestBody String url){
        Integer idInt = Integer.parseInt(id);
        return ResponseEntity.ok(urlService.updateShortUrl(url,idInt));
    }
    @DeleteMapping("/delete/{id}")
    @Operation(summary="delete an url by it's id")
    public ResponseEntity<Void> deleteUrl(@PathVariable String id){
        Integer idInt = Integer.parseInt(id);
        urlService.deleteUrl(idInt);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/Accessed/{id}")
    @Operation(summary="get number of accessed url")
    public ResponseEntity<Integer> accessedUrl(@PathVariable String id){
        Integer idInt = Integer.parseInt(id);
        return ResponseEntity.ok(urlService.getNumberAccessed(idInt));
    }


}
