package backend.example.demo.exception;

public class TooManyAttempts extends RuntimeException {
    public TooManyAttempts(String message) {
        super(message);
    }
}
