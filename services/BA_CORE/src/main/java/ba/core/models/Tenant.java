package ba.core.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tenant")
@Getter
@Setter
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn(
            name = "apartment_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Apartment apartment;

    @Column
    private String email;

    @Column
    private String lastEmailedAt;
}
