SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vehicle` (
  `VIN` VARCHAR(45) NOT NULL,
  `Make` VARCHAR(45) NULL,
  `Model` VARCHAR(45) NULL,
  `Color` VARCHAR(45) NULL,
  `Year` YEAR NULL,
  `Location` VARCHAR(45) NULL,
  `Price` DECIMAL(7,2) NULL,
  `Mileage` INT NULL,
  `Description` VARCHAR(500) NULL,
  `Features` VARCHAR(500) NULL,
  PRIMARY KEY (`VIN`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VehicleListing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`VehicleListing` (
  `ListingID` INT NOT NULL,
  `VIN` VARCHAR(45) NULL,
  `LisitingDate` DATE NULL,
  PRIMARY KEY (`ListingID`),
  INDEX `VIN_idx` (`VIN` ASC) VISIBLE,
  CONSTRAINT `VIN`
    FOREIGN KEY (`VIN`)
    REFERENCES `mydb`.`Vehicle` (`VIN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SavedList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SavedList` (
  `SavedNum` INT NOT NULL,
  `UserID` VARCHAR(45) NULL,
  `ListingID` INT NULL,
  `VehicleID` VARCHAR(45) NULL,
  `SaveDate` DATE NULL,
  `Notes` TEXT(500) NULL,
  `Tags` VARCHAR(45) NULL,
  `Status` VARCHAR(45) NULL,
  `ExpirationDate` DATE NULL,
  `Source` VARCHAR(45) NULL,
  PRIMARY KEY (`SavedNum`),
  INDEX `AccountName_idx` (`UserID` ASC) VISIBLE,
  INDEX `VehicleID_idx` (`VehicleID` ASC) VISIBLE,
  INDEX `ListingID_idx` (`ListingID` ASC) VISIBLE,
  CONSTRAINT `AccountName`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`AccountName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `VehicleID`
    FOREIGN KEY (`VehicleID`)
    REFERENCES `mydb`.`Vehicle` (`VIN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ListingID`
    FOREIGN KEY (`ListingID`)
    REFERENCES `mydb`.`VehicleListing` (`ListingID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '		';


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `AccountName` VARCHAR(45) NOT NULL,
  `FName` VARCHAR(45) NULL,
  `LName` VARCHAR(45) NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `BDay` DATE NULL,
  `EmailAddress` VARCHAR(255) NULL,
  `SavedNum` INT NULL,
  PRIMARY KEY (`AccountName`),
  INDEX `SavedNum_idx` (`SavedNum` ASC) VISIBLE,
  CONSTRAINT `SavedNum`
    FOREIGN KEY (`SavedNum`)
    REFERENCES `mydb`.`SavedList` (`SavedNum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
