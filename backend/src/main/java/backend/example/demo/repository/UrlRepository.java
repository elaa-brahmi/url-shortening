package backend.example.demo.repository;

import backend.example.demo.model.UrlShortened;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<UrlShortened,Integer> {
    Optional<UrlShortened> findByShortenedUrl(String shortenedUrl);
}
