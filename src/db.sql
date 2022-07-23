use caoExam;

CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(30) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password TEXT NOT NULL, reg_timestamp DATE NOT NULL);
 INSERT INTO users (full_name, email, password, reg_timestamp) VALUES ('Zilvinas TEST', 'test@test123', 'SQLtest123', '1000-01-10');
 SELECT * FROM users;
 
 CREATE TABLE `groups` (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL);
 ALTER TABLE `groups` MODIFY COLUMN name VARCHAR(50) UNIQUE NOT NULL;
 INSERT INTO `groups` (name) VALUES ('groupName3');
 SELECT * FROM `groups`;
 
 CREATE TABLE bills (id INT AUTO_INCREMENT PRIMARY KEY, group_id INT NOT NULL, amount FLOAT(7, 2) NOT NULL, description TEXT NOT NULL);
 ALTER TABLE bills MODIFY COLUMN amount FLOAT(10, 2) NOT NULL;
 DROP TABLE bills;
 INSERT INTO bills (group_id, amount, description) VALUES (9, 1000, 'qqqqqqqqqqqq');
 SELECT * FROM bills;
 
 CREATE TABLE accounts (id INT AUTO_INCREMENT PRIMARY KEY, group_id INT NOT NULL, user_id INT NOT NULL);
 INSERT INTO accounts (group_id, user_id) VALUES (1, 1);
 SELECT * FROM accounts;
 
 
 