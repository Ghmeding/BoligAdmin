package ba.core.service;

import ba.core.dto.CreatePropertyDto;
import ba.core.models.Property;
import ba.core.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    /**
     * Retrieves all properties stored in the system database.
     * @return a list of all {@link Property} entities
     */
    public List<Property> getAllProperties(){
        List<Property> properties = new ArrayList<>();
        propertyRepository.findAll().forEach(properties::add);
        return properties;
    }

    /**
     * Fetches all properties belonging to a specific owner.
     * @param ownerId the unique identifier of the property owner
     * @return a list of properties associated with the given owner
     */
    public List<Property> getAllOwnerProperties(String ownerId) {
        return propertyRepository.findByOwnerId(ownerId);
    }

    /**
     * Creates and persists a new property record for an owner.
     * @param input the data transfer object containing property details
     * @param ownerId the identifier of the owner creating the property
     * @return a status string indicating the result of the operation
     */
    public String createProperty(CreatePropertyDto input, String ownerId){
        Property property = new Property(
                ownerId,
                input.getTitle(),
                input.getDescription(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        propertyRepository.save(property);
        return "test";
    }
}
