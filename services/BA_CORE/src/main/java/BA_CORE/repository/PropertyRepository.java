package BA_CORE.repository;

import BA_CORE.models.Property;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropertyRepository extends CrudRepository<Property, String> {
    Optional<Property> findByAddress(String address);
}
