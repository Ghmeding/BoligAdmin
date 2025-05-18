package db

import (
	"chatApp/config"
	"chatApp/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB(uri string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}

func CheckUsernameExists(username string) (bool, error) {
	var user models.User
	result := config.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return false, gorm.ErrRecordNotFound
		}
		return false, result.Error
	}

	return true, nil
}
