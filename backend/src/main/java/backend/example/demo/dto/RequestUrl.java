package backend.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RequestUrl {
    @NotNull(message = "URL cannot be null")
    @NotEmpty(message = "URL cannot be empty")
    @Pattern(
            regexp = "^(https?|ftp|www?)://[^\\s/$.?#].[^\\s]*$",
            message = "Invalid URL format"
    )
    private String originalUrl;
}
