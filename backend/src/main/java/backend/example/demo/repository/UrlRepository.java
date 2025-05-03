package backend.example.demo.repository;

import backend.example.demo.model.UrlShortened;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<UrlShortened,Integer> {
    Optional<UrlShortened> findByShortenedUrl(String shortenedUrl);
    @Query(value = "SELECT * FROM urls ORDER BY COALESCE(updated_at, created_at) DESC", nativeQuery = true)
    List<UrlShortened> findAllOrderByUpdatedOrCreatedDesc();

    Optional<UrlShortened> findByOriginalUrl(String originalUrl);

    Optional<UrlShortened> findByShortenedUrlContaining(String shortenedUrl);

    Optional<UrlShortened> findByShortenedUrlContainingIgnoreCase(String shortenedUrl);

    Optional<List<UrlShortened>> findAllByShortenedUrlContainingIgnoreCase(String shortenedUrl);
}
