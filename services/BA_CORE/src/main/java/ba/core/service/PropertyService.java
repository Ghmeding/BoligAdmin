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

    public List<Property> getAllProperties(){
        List<Property> properties = new ArrayList<>();
        propertyRepository.findAll().forEach(properties::add);
        return properties;
    }

    public String createProperty(CreatePropertyDto input, String ownerId){
        Property property = new Property(
                ownerId,
                input.getTitle(),
                input.getAddress(),
                input.getCity(),
                input.getPostalCode(),
                input.getDescription(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        propertyRepository.save(property);
        return "test";
    }
}
