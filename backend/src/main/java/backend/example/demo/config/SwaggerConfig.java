package backend.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class SwaggerConfig {

    @Value("${swagger.api.title:URL Shortener API}")
    private String title;

    @Value("${swagger.api.version:1.0.0}")
    private String version;

    @Value("${swagger.api.description:API for shortening URLs}")
    private String description;


    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(description)
                        .contact(new Contact()
                                .name("API Support")

                        )
                );
    }
}
