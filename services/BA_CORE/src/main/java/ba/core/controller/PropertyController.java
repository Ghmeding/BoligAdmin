package ba.core.controller;

import ba.core.dto.CreatePropertyDto;
import ba.core.models.Property;
import ba.core.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            //TODO: better exception
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/createProperty")
    public ResponseEntity<String> createProperty(
            @RequestBody CreatePropertyDto createPropertyDto,
            @RequestHeader("x-user-id") String userId) {
        try {
            String id = propertyService.createProperty(createPropertyDto, userId);
            return ResponseEntity.ok(id);
        } catch (RuntimeException e){
            //TODO: better exception
            throw new RuntimeException(e);
        }
    }
}
