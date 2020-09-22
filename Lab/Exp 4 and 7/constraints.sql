use open_ppm;

-- Displaying the Constraints set during Table creation
describe Consultant_Technologies;
describe Consultants;
describe Contacts;
describe Customers;
describe Designations;
describe Project_Resources;
describe Project_Technologies;
describe Project_Transaction;
describe Projects;

-- NOT NULL, PRIMARY KEY, DEFAULT

-- Trying to insert into Projects Table with NULL and check whether it produces an error 
-- Also For estimated_effort | estimated_cost | pCompleted | Start_Date | Finish_Date check whether DEFAULT Constraint works
INSERT INTO Projects (Title, Description, CustomerID, PM, status) VALUES (NULL, NULL, NULL, 1, 1);
-- Correct Statement
INSERT INTO Projects (Title, Description, CustomerID, PM, status) VALUES ("Pide Piper", "Compression Tool", 1, 1, 1);

-- Try to Insert row into Projects table with duplicate primary key
-- Select the last entered row and use it's primary key
SELECT * FROM Projects ORDER BY ID DESC LIMIT 1;
INSERT INTO Projects (ID, Title, Description, CustomerID, PM, status) VALUES (4, "Pide Piper", "Compression Tool", 1, 1, 1);

-- FOREIGN KEY
-- Try to add a Project with non existing FOREIGN KEY (Non exixting Project Manager)
INSERT INTO Projects (Title, Description, CustomerID, PM, status) VALUES ("Pide Piper", "Compression Tool", 1, 100, 1);
-- This will give an error - ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`ppm`.`Projects`, CONSTRAINT `Projects_ibfk_2` FOREIGN KEY (`PM`) REFERENCES `Consultants` (`ID`))
-- Due to PM (FOREIGN KEY to Consultants Table) does not exist

describe Technology;

-- User Table was not included in previous database. So creating Users Table
-- Consultant tinyint is a boolean field for whether the user is consultant or customer
CREATE TABLE IF NOT EXISTS `Users` (
  `ID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` varchar(200) NOT NULL UNIQUE,
  `password` varchar(1000) NOT NULL,
  `consultant` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL UNIQUE,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
);

-- Inserting One record to Users table
INSERT INTO `Users` (`ID`, `username`, `password`, `consultant`, `user_id`, `active`) VALUES
(1, 'dkowsikpai', '1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75', 1, 1, 1);


describe Users;
-- Selecting User Table
SELECT * FROM Users;

-- UNIQUE

-- Try to override UNIQUE Constraint of user id (FOREIGN KEY) in User Table
-- Password encrypted using SHA 512
INSERT INTO Users (username, password, user_id) VALUES (
    "pide piper",
    "1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75",
    1
);
-- Above statement produces an error. That is ERROR 1062 (23000): Duplicate entry '1' for key 'user_id'
-- Correct Statement 
INSERT INTO Users (username, password, user_id) VALUES (
    "pide piper",
    "1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75",
    2
);