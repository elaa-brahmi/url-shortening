package backend.example.demo.controller;

import backend.example.demo.dto.CustomUrlRequest;
import backend.example.demo.dto.RequestUrl;
import backend.example.demo.exception.TooManyAttempts;
import backend.example.demo.model.UrlShortened;
import backend.example.demo.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
@Validated
public class UrlController {
    private final UrlService urlService;
@PostMapping("/copy/{id}")
@Operation(summary="copy url to clipboard")
public ResponseEntity<Void> copyUrl(@PathVariable String id){
    Integer idInt=Integer.parseInt(id);
   urlService.copyUrl(idInt);
    return ResponseEntity.noContent().build();
}
    @GetMapping("/")
    @Operation(summary="get all urls")
    public ResponseEntity<List<UrlShortened>> getAllUrls(){
        Optional<List<UrlShortened>> urls = urlService.getAllUrls();
        return urls.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/customUrl")
    @Operation(summary="create a custom short url")
    public ResponseEntity<Void> createCustomUrl( @Valid @RequestBody CustomUrlRequest customUrl) throws TooManyAttempts {
        String originalUrl=customUrl.getOriginalUrl();
        String shortUrl=customUrl.getShortUrl();
        urlService.generateCustomShortenedUrl(shortUrl,originalUrl);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/create")
    @Operation(summary="create a new url")
    public ResponseEntity<Void> createUrl(@Valid @RequestBody RequestUrl urlrequest) throws TooManyAttempts {
        String url=urlrequest.getOriginalUrl();
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
    public ResponseEntity<UrlShortened> updateUrl(@PathVariable String id, @Valid @RequestBody RequestUrl urlrequest){
        String url=urlrequest.getOriginalUrl();

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
