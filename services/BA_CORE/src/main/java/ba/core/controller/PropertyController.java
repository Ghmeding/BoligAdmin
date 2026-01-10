package ba.core.controller;

import ba.core.dto.CreatePropertyDto;
import ba.core.models.Property;
import ba.core.service.PropertyService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService){ this.propertyService = propertyService; }

    @GetMapping("/getAllOwnerProperties")
    public ResponseEntity<List<Property>> getUserProperties(
            @AuthenticationPrincipal Jwt jwt
    )
    {
        String ownerId = jwt.getSubject();
        List<Property> properties = propertyService.getAllOwnerProperties(ownerId);
        return ResponseEntity.ok(properties);
    }
}
