package ba.core.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name= "property")
@Getter
@Setter
public class PropertyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String ownerId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String address;

    @Column(name = "monthly_rent", nullable = false)
    private Float monthlyRent;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private TenantEntity tenant;

    public PropertyEntity(
            String ownerId,
            String title,
            String description,
            String address,
            Float monthlyRent,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.address = address;
        this.monthlyRent = monthlyRent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    public PropertyEntity() {}
}
