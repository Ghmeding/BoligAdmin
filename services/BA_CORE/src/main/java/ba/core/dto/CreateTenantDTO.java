package ba.core.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTenantDTO {
    @NotBlank
    private String propertyId;

    @NotBlank
    private String email;

    @NotBlank
    private String fullName;
}
