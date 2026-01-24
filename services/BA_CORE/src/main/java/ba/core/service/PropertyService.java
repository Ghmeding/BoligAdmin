package ba.core.service;

import ba.core.dto.CreatePropertyDTO;
import ba.core.exception.PropertyException;
import ba.core.mapper.PropertyMapper;
import ba.core.models.PropertyEntity;
import ba.core.repository.PropertyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
     * @return a list of all {@link PropertyEntity} entities
     */
    public List<PropertyEntity> getAllProperties(){
        List<PropertyEntity> properties = new ArrayList<>();
        propertyRepository.findAll().forEach(properties::add);
        return properties;
    }

    /**
     * Fetches all properties belonging to a specific owner.
     * @param ownerId the unique identifier of the property owner
     * @return a list of properties associated with the given owner
     */
    public List<PropertyEntity> getAllOwnerProperties(String ownerId) {
        return propertyRepository.findByOwnerId(ownerId);
    }

    /**
     * Creates and persists a new property record for an owner.
     * @param input the data transfer object containing property details
     * @param ownerId the identifier of the owner creating the property
     * @return a status string indicating the result of the operation
     */
    @Transactional
    public String createProperty(CreatePropertyDTO input, String ownerId){
        try {
            PropertyEntity newPropertyEntity = propertyRepository.save(PropertyMapper.convertToEntity(input, ownerId));
            return newPropertyEntity.getId();
        } catch (Exception e) {
            throw new PropertyException(e.getMessage());
        }
    }

    public void setPropertyMonthlyRent(PropertyEntity property, Float monthlyRent){

    }
}
