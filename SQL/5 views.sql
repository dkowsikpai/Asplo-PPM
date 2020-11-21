use open_ppm;

-- Project Technology Table Join View - Technologies used in Project
CREATE VIEW Projects_Technologies AS SELECT 
    Projects.ID, Projects.Title, Technology.ID AS TID, Technology.Technology 
FROM 
    Projects JOIN Project_Technologies 
    JOIN Technology 
        ON Projects.ID = Project_Technologies.ProjectID 
        AND Project_Technologies.TechID = Technology.ID; 

SELECT * FROM Projects_Technologies;

-- Project Cosultants - People working in the projects
CREATE VIEW Projects_Consultants AS SELECT 
    Projects.ID, Projects.Title, Consultants.ID AS CID, Consultants.name
FROM 
    Projects JOIN Consultants 
WHERE 
    Projects.PM = Consultants.ID;

SELECT * FROM Projects_Consultants;

-- Project Customer 
CREATE VIEW Projects_Customers AS SELECT 
    Projects.ID, Projects.Title, Customers.ID AS Cust_ID, Customers.Name 
FROM 
    Projects JOIN Customers 
    ON Projects.CustomerID = Customers.ID;

SELECT * FROM Projects_Customers;

-- Displays the relative efforts spent by the consultants on particular project
CREATE VIEW Projects_Efforts AS SELECT 
    Projects.ID, Projects.Title, Consultants.ID AS CID, Consultants.name, Project_Transaction.Effort_Spent
FROM
	Projects JOIN Consultants JOIN Project_Transaction
        ON 	Projects.ID = Project_Transaction.ProjectID 
            AND Consultants.ID = Project_Transaction.Resource_ID;

SELECT * FROM Projects_Efforts;


-- Consultant Designation Details
CREATE VIEW Consultant_Designation AS SELECT
	Consultants.ID, Consultants.name, Designations.ID AS Desig_ID, Designations.Designation, Designations.Grade
FROM
	Consultants JOIN Designations ON Consultants.designation = Designations.ID;

SELECT * FROM Consultant_Designation;

-- Alternate contact Information related to each project
CREATE VIEW Project_Customer_Alt_Contacts AS SELECT
	Projects.ID, Projects.Title, Customers.ID AS Cust_ID, Customers.Name, Contacts.phone
FROM
	Projects JOIN Customers JOIN Contacts
    	ON Projects.CustomerID = Customers.ID 
            AND Customers.ID = Contacts.CustomerID  
            AND Customers.pAddress <> Contacts.ID;

SELECT * FROM Project_Customer_Alt_Contacts;
