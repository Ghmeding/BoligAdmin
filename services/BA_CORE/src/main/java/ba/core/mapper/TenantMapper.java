package ba.core.mapper;

import ba.core.dto.CreateTenantDTO;
import ba.core.models.PropertyEntity;
import ba.core.models.TenantEntity;

public class TenantMapper {

    private TenantMapper() {}

    public static TenantEntity convertToEntity(CreateTenantDTO createTenantDTO, PropertyEntity propertyEntity) {
        if (createTenantDTO == null) return null;

        TenantEntity tenant = new TenantEntity();
        tenant.setEmail(createTenantDTO.getEmail());
        tenant.setFullName(createTenantDTO.getFullName());

        // We set the property proxy here
        tenant.setProperty(propertyEntity);

        return tenant;
    }
}
