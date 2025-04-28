package backend.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor //generate a constructor with all fields
@NoArgsConstructor //generate a constructor with no fields
@Entity
@Data
@Table(name="urls")
public class UrlShortened {
    @Id
    @GeneratedValue
    private Integer id;
    private String originalUrl;
    private String shortenedUrl;
    @CreatedDate()
    @Column(updatable = false,nullable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;
    private Integer accessCount;
}
