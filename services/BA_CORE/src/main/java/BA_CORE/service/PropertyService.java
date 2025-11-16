package BA_CORE.service;

import BA_CORE.models.Property;
import BA_CORE.repository.PropertyRepository;
import org.springframework.stereotype.Service;

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
}
