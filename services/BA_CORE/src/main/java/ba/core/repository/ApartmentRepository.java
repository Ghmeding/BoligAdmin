package ba.core.repository;

import ba.core.models.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, String> {
    List<Apartment> findByPropertyId(String propertyId);
    Optional<Apartment> findByAddress(String address);
}
