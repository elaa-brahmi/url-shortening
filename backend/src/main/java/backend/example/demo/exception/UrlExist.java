package backend.example.demo.exception;

public class UrlExist extends RuntimeException {
    public UrlExist(String s) {
        super(s);
    }
}
