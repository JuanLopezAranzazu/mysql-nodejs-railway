CREATE DATABASE IF NOT EXISTS `db-railway-nodejs`;

USE `db-railway-nodejs`;

CREATE TABLE product (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  description VARCHAR(45) DEFAULT NULL,
  price INT(5) DEFAULT NULL,
  quantity INT(5) DEFAULT NULL,
  PRIMARY KEY (id)
);
