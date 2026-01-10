package ba.core.controller;


import ba.core.dto.CreateApartmentDto;
import ba.core.dto.GetAllApartmentsByPropertyIdDto;
import ba.core.models.Apartment;
import ba.core.models.Property;
import ba.core.service.ApartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("apartment")
public class ApartmentController {

    private final ApartmentService apartmentService;

    public ApartmentController(ApartmentService apartmentService) { this.apartmentService = apartmentService; }

    @GetMapping("getAllApartmentsByPropertyId")
    public ResponseEntity<List<Apartment>> getAllApartmentsByPropertyId(
            @RequestBody GetAllApartmentsByPropertyIdDto getAllApartmentsByPropertyIdDto,
            @AuthenticationPrincipal Jwt jwt
    )
    {
        String ownerId = jwt.getSubject();

        //TODO: validate the ownerId if it is also the owner of the property

        String propertyId = getAllApartmentsByPropertyIdDto.getPropertyId();
        List<Apartment> apartments = apartmentService.getAllApartmentsByPropertyId(propertyId);
        return ResponseEntity.ok(apartments);
    }

    @PostMapping("createApartment")
    public ResponseEntity<String> createApartment(
            @RequestBody CreateApartmentDto createApartmentDto,
            @AuthenticationPrincipal Jwt jwt
    )
    {
        String apartmentId = apartmentService.createApartment(createApartmentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(apartmentId);

    }
}
