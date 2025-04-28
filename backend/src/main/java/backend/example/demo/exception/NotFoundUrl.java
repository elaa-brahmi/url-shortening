package backend.example.demo.exception;

public class NotFoundUrl extends RuntimeException {
    public NotFoundUrl(String message) {
        super(message);
    }
}
