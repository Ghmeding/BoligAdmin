package BA_CORE.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name= "property")
@Getter
@Setter
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String owner_id;

    @Column
    private String title;
    private String address;
    private String city;

    @Column(name = "postal_code")
    private String postalCode;

    @Column
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Property(String owner_id, String title, String address, String city, String postalCode, String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.owner_id = owner_id;
        this.title = title;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
