package ba.core.repository;

import ba.core.models.PropertyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<PropertyEntity, String> {
    List<PropertyEntity> findByOwnerId(String ownerId);
}
