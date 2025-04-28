package backend.example.demo.exception;

public class ShortUrlExist extends RuntimeException {
    public ShortUrlExist(String s) {
        super(s);
    }
}
