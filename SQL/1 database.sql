-- Create database
CREATE DATABASE open_ppm;

USE open_ppm;

-- Create table contacts
CREATE TABLE open_ppm.Contacts ( 
    Conatct_Person VARCHAR(200) NOT NULL, 
    ID INT NOT NULL UNIQUE AUTO_INCREMENT, 
    phone VARCHAR(14) NOT NULL, 
    mobile VARCHAR(14) NOT NULL, 
    Email VARCHAR(200) NOT NULL, 
    profile_desc VARCHAR(300) NOT NULL, 
    CustomerID INT NOT NULL, PRIMARY KEY (ID) 
);

-- Create table customers
CREATE TABLE open_ppm.Customers ( 
    Name VARCHAR(200) NOT NULL, 
    ID INT NOT NULL UNIQUE AUTO_INCREMENT, 
    phone VARCHAR(14) NOT NULL, 
    email VARCHAR(200) NOT NULL, 
    fax VARCHAR(14), 
    pAddress VARCHAR(200), 
    PRIMARY KEY (ID) 
);


-- Alter Table Contacts and add customer foreign key
ALTER TABLE open_ppm.Contacts ADD FOREIGN KEY (CustomerID) REFERENCES open_ppm.Customers(ID); 

-- Create table Designation
CREATE TABLE open_ppm.Designations
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  Grade VARCHAR(8) NOT NULL,
  Designation VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID)
);

-- Create table consultants
CREATE TABLE open_ppm.Consultants
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(14) NOT NULL,
  email VARCHAR(200) NOT NULL,
  presentAddress VARCHAR(300) NOT NULL,
  pAddress VARCHAR(200) NOT NULL,
  designation INT NOT NULL,
  highest_edu VARCHAR(100) NOT NULL,
  experience INT NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  FOREIGN KEY (`designation`) REFERENCES `Designations`(`ID`)
);

-- Create table projects
CREATE TABLE open_ppm.Projects
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  Title VARCHAR(200) NOT NULL,
  Description VARCHAR(300) NOT NULL,
  CustomerID INT NOT NULL,
  PM INT NOT NULL,
  status INT NOT NULL,
  estimated_effort DOUBLE(10, 2) NOT NULL DEFAULT 0,
  estimated_cost DOUBLE(10, 2) NOT NULL DEFAULT 0,
  pCompleted DOUBLE(5, 2) NOT NULL DEFAULT 0,
  Start_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Finish_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(ID),
  FOREIGN KEY (PM) REFERENCES Consultants(ID)
);

-- Create table Project_Resources
CREATE TABLE open_ppm.Project_Resources
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  Project_ID INT NOT NULL,
  Resource_ID INT NOT NULL,
  Hourly_Rate DOUBLE(12, 2) NOT NULL DEFAULT 0,
  Estimate_Effort DOUBLE(12, 2) NOT NULL DEFAULT 0,
  Actual_Effort DOUBLE(12, 2) NOT NULL DEFAULT 0,
  Relative_Percentage_completed DOUBLE(5, 2) NOT NULL DEFAULT 0,
  PRIMARY KEY (ID),
  FOREIGN KEY (Project_ID) REFERENCES Projects(ID),
  FOREIGN KEY (Resource_ID) REFERENCES Consultants(ID)
);

-- Create table technology
CREATE TABLE open_ppm.Technology
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  Technology VARCHAR(200) NOT NULL,
  Version VARCHAR(10) NOT NULL,
  PRIMARY KEY (ID)
);

-- Create table transaction
CREATE TABLE open_ppm.Project_Transaction
(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  Resource_ID INT NOT NULL,
  Entry_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Effort_Spent DECIMAL(10, 2) NOT NULL DEFAULT 0,
  Percentage_Completed DECIMAL(5, 2) NOT NULL DEFAULT 0,
  ProjectID INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ProjectID) REFERENCES Projects(ID),
  FOREIGN KEY (Resource_ID) REFERENCES Consultants(ID)
);

-- Create table Project Technologies
CREATE TABLE open_ppm.Project_Technologies(
  ID INT NOT NULL UNIQUE AUTO_INCREMENT,
  ProjectID INT NOT NULL,
  TechID INT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY (ProjectID) REFERENCES Projects(ID),
  FOREIGN KEY (TechID) REFERENCES Technology(ID)
);

-- Create table consultant technology
CREATE TABLE open_ppm.Consultant_Technologies (
    ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    TechID INT NOT NULL,
    ConsultantID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (TechID) REFERENCES Technology(ID),
    FOREIGN KEY (ConsultantID) REFERENCES Consultants(ID)
);
