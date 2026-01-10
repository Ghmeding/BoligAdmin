package ba.core.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "property")
@Getter
@Setter
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ownerId;

    @Column
    private String title;

    @Column
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Apartment> apartments = new ArrayList<>();

    public Property(
            String ownerId,
            String title,
            String description,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.apartments = new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    public Property() {
    }
}
