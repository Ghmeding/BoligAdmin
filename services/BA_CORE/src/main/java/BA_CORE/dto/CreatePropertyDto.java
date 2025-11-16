package BA_CORE.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreatePropertyDto {
    private String title;
    private String address;
    private String city;
    private String postalCode;
    private String description;
}
