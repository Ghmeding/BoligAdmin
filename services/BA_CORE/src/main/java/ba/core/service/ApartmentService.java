package ba.core.service;

import ba.core.dto.CreateApartmentDto;
import ba.core.models.Apartment;
import ba.core.models.Property;
import ba.core.repository.ApartmentRepository;
import ba.core.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApartmentService {

    private final ApartmentRepository apartmentRepository;
    private final PropertyRepository propertyRepository;

    public ApartmentService(ApartmentRepository apartmentRepository, PropertyRepository propertyRepository) {
        this.apartmentRepository = apartmentRepository;
        this.propertyRepository = propertyRepository;
    }

    /**
     * Retrieves all apartments associated with a specific property.
     *
     * @param propertyId the unique identifier of the property
     * @return a list of {@link Apartment} entities, or an empty list if none found
     */
    public List<Apartment> getAllApartmentsByPropertyId(String propertyId) {
        return apartmentRepository.findByPropertyId(propertyId);
    }

    public String createApartment(CreateApartmentDto dto) {
        Apartment apartment = new Apartment();

        //create a proxy object that only knows the ID - no database call
        Property propertyProxy = propertyRepository.getReferenceById(dto.getPropertyId());

        apartment.setProperty(propertyProxy);
        apartment.setTitle(dto.getTitle());
        apartment.setAddress(dto.getAddress());
        apartment.setCity(dto.getCity());
        apartment.setPostalCode(dto.getPostalCode());
        apartment.setDescription(dto.getDescription());

        Apartment savedApartment = apartmentRepository.save(apartment);
        return savedApartment.getId();
    }

}
