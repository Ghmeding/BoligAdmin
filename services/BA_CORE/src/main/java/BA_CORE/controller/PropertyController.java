package BA_CORE.controller;

import BA_CORE.dto.CreatePropertyDto;
import BA_CORE.models.Property;
import BA_CORE.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService){ this.propertyService = propertyService; }

    @GetMapping("/getAllProperties")
    public ResponseEntity<List<Property>> getUserProperties(){
        try {
            List<Property> properties = propertyService.getAllProperties();
            return ResponseEntity.ok(properties);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/createProperty")
    public ResponseEntity<String> createProperty(@RequestBody CreatePropertyDto createPropertyDto){
        try {
            Property property = new Property(
                    input.
            )
        } catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }
}
