package ba.core.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreatePropertyDTO {
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Description is mandatory")
    private String description;
    @NotBlank(message = "Address is mandatory")
    private String address;
    @NotNull(message = "Monthly rent is mandatory")
    @Positive(message = "Rent must be greater than zero")
    private Float monthlyRent;
}
