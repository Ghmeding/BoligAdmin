package ba.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateApartmentDto {
    private String propertyId;
    private String title;
    private String address;
    private String city;
    private String postalCode;
    private String description;
    private String tenantId;
}
