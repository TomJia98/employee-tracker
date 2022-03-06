DROP SCHEMA IF EXISTS `employees_database` ; 

CREATE SCHEMA `employees_database` ;

CREATE TABLE `employees_database`.`departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `employees_database`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_roles_department_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_roles_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `employees_database`.`departments` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


CREATE TABLE `employees_database`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT UNSIGNED NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employees_role_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `employees_database`.`roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


ALTER TABLE `employees_database`.`employees` 
ADD INDEX `fk_employees_manager_idx` (`manager_id` ASC) VISIBLE;
;
ALTER TABLE `employees_database`.`employees` 
ADD CONSTRAINT `fk_employees_manager`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employees_database`.`employees` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;


