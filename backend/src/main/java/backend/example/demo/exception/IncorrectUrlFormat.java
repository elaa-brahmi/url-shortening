package backend.example.demo.exception;

public class IncorrectUrlFormat extends RuntimeException {
    public IncorrectUrlFormat(String message) {
        super(message);
    }
}
