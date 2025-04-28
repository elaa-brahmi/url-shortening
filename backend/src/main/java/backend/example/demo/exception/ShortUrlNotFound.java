package backend.example.demo.exception;

public class ShortUrlNotFound extends RuntimeException {
    public ShortUrlNotFound(String message) {
        super(message);
    }
}
