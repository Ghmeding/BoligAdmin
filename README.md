# BoligAdmin Backend

A Spring Boot microservice for managing residential properties and apartments. This backend API handles property administration, apartment management, and tenant information with JWT-based security.

## Overview

BoligAdmin is part of a larger property management system designed to help property owners manage their real estate portfolio. The backend service provides REST APIs for managing properties, apartments, and related operations with role-based security.

## Tech Stack

- **Framework**: Spring Boot 3.5.7
- **Language**: Java 21
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT (OAuth2 Resource Server)
- **Build Tool**: Gradle
- **ORM**: Spring Data JPA / Hibernate
- **Authentication**: JWT (JJWT 0.11.5)
- **Utilities**: Lombok

## Project Structure

```
ba_core/
├── src/main/java/ba/core/
│   ├── App.java                           # Spring Boot application entry point
│   ├── config/
│   │   ├── JwtAuthenticationFilter.java   # JWT token validation and extraction
│   │   └── SecurityConfiguration.java     # Spring Security configuration
│   ├── controller/
│   │   ├── ApartmentController.java       # Apartment management endpoints
│   │   ├── PropertyController.java        # Property management endpoints
│   │   └── HealthController.java          # Health check endpoint
│   ├── dto/
│   │   ├── CreateApartmentDto.java        # DTO for apartment creation
│   │   ├── CreatePropertyDto.java         # DTO for property creation
│   │   └── GetAllApartmentsByPropertyIdDto.java # DTO for fetching apartments
│   ├── exception/
│   │   └── GlobalExceptionHandler.java    # Centralized exception handling
│   ├── models/
│   │   ├── Property.java                  # Property entity
│   │   ├── Apartment.java                 # Apartment entity
│   │   └── Tenant.java                    # Tenant entity
│   ├── repository/
│   │   ├── PropertyRepository.java        # Property data access
│   │   └── ApartmentRepository.java       # Apartment data access
│   └── service/
│       ├── PropertyService.java           # Property business logic
│       └── ApartmentService.java          # Apartment business logic
└── resources/
    └── application.properties              # Application configuration
```

## Key Features

### Property Management
- **Retrieve Owner Properties**: Fetch all properties owned by an authenticated user
- Endpoint: `GET /property/getAllOwnerProperties`
- Requires JWT authentication

### Apartment Management
- **Create Apartment**: Add a new apartment to a property
- Endpoint: `POST /apartment/createApartment`
- Requires JWT authentication

- **Retrieve Apartments by Property**: Get all apartments in a specific property
- Endpoint: `GET /apartment/getAllApartmentsByPropertyId`
- Requires JWT authentication

### Health Check
- **Health Endpoint**: Verify service is running
- Endpoint: `GET /health` (via HealthController)

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/property/getAllOwnerProperties` | Get all properties for logged-in owner | Yes |
| GET | `/apartment/getAllApartmentsByPropertyId` | Get apartments for a property | Yes |
| POST | `/apartment/createApartment` | Create a new apartment | Yes |
| GET | `/health` | Health check | No |

## Security

The application uses **Spring Security** with **JWT (JSON Web Tokens)** for authentication and authorization:

- All endpoints (except health check) require a valid JWT token in the Authorization header
- JWT tokens are validated by `JwtAuthenticationFilter`
- Owner ID is extracted from the JWT subject claim
- Token validation is configured in `SecurityConfiguration.java`

### Configuration
- Security configuration is defined in `SecurityConfiguration.java`
- JWT tokens are validated against the configured secret key
- OAuth2 Resource Server pattern for stateless authentication

## Database Models

### Property
- `id` (UUID): Unique identifier
- `ownerId` (String): Owner/user ID
- `title` (String): Property title
- `description` (String): Property details
- `createdAt` (LocalDateTime): Creation timestamp
- `updatedAt` (LocalDateTime): Last update timestamp
- Relationship: One-to-many with Apartment (cascade delete)

### Apartment
- `id` (UUID): Unique identifier
- `propertyId` (String): Associated property
- Additional fields for apartment-specific data
- Relationship: Many-to-one with Property

### Tenant
- Entity for tenant information
- Associates tenants with apartments/properties

## Configuration

### Environment Variables
Configure the following in your `.env` file or system environment:

```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/boligadmin
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password

# Security
JWT_SECRET_KEY=your_jwt_secret_key
```

### Application Properties
- **Server Port**: `8080` (default)
- **Database Dialect**: PostgreSQL
- **JPA DDL**: `update` (auto-update schema)
- **Transaction Management**: Enabled

## Getting Started

### Prerequisites
- Java 21+
- PostgreSQL database
- Gradle (or use ./gradlew)

### Build
```bash
cd services/ba_core
./gradlew build
```

### Run
```bash
./gradlew bootRun
```

The application will start on `http://localhost:8080`

### Test
```bash
./gradlew test
```

## Dependencies

Key Spring Boot starters:
- `spring-boot-starter-web` - Web and REST support
- `spring-boot-starter-data-jpa` - Database access
- `spring-boot-starter-security` - Security framework
- `spring-boot-starter-oauth2-resource-server` - OAuth2 resource server
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson` - JWT token handling
- `postgresql` - PostgreSQL database driver
- `lombok` - Code generation for getters/setters/constructors

## Development Notes

### Known TODOs
- Owner validation: Verify that the authenticated user is the owner of the property before returning apartments

### Future Enhancements
- Add apartment update/delete endpoints
- Add property update/delete endpoints
- Implement comprehensive validation
- Add pagination for list endpoints
- Add filtering and search capabilities

## License

This project is part of the BoligAdmin ecosystem.

## Author

Ghmeding
