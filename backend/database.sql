USE `Origins_digital` ;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `is_admin` TINYINT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Videos`;
CREATE TABLE IF NOT EXISTS `Videos` (
  `id` INT NOT NULL,
  `url` VARCHAR(300) NOT NULL,
  `description` TEXT NOT NULL,
  `creation_date` DATETIME NOT NULL DEFAULT NOW(),
  `img` VARCHAR(300) NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_playlists`;
CREATE TABLE IF NOT EXISTS `User_has_playlists` (
  `User_id` INT NOT NULL,
  `Videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Videos_id`),
  CONSTRAINT `fk_User_has_videos_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_favorite`;
CREATE TABLE IF NOT EXISTS `User_has_favorite` (
  `User_id` INT NOT NULL,
  `videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `videos_id`),
  CONSTRAINT `fk_User_has_videos_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos2`
    FOREIGN KEY (`videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Category`;
CREATE TABLE IF NOT EXISTS `Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Videos_has_Category`;
CREATE TABLE IF NOT EXISTS `Videos_has_Category` (
  `Videos_id` INT NOT NULL,
  `Category_id` INT NOT NULL,
  PRIMARY KEY (`Videos_id`, `Category_id`),
  CONSTRAINT `fk_Videos_has_Category_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`),
  CONSTRAINT `fk_Videos_has_Category_Category1`
    FOREIGN KEY (`Category_id`)
    REFERENCES `origins_digital`.`Category` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `Videos_has_comments`;
CREATE TABLE IF NOT EXISTS `Videos_has_comments` (
  `Videos_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`Videos_id`, `User_id`),
  CONSTRAINT `fk_Videos_has_User_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`),
  CONSTRAINT `fk_Videos_has_User_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `origins_digital`.`User` (`id`))
ENGINE = InnoDB;