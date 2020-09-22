-- Select name of project manager from the database
SELECT 
    Projects.Title, Consultants.name 
FROM 
    Projects JOIN Consultants 
WHERE 
    Projects.PM = Consultants.ID;



-- Select Customer Name from the database corresponding to the project name
SELECT 
    Projects.Title, Customers.Name 
FROM 
    Projects JOIN Customers 
    ON Projects.CustomerID = Customers.ID;



-- Select Name of technologies used in project. Display only the name of the project and name of technology
SELECT 
    Projects.Title, Technology.Technology 
FROM 
    Projects JOIN Project_Technologies JOIN Technology 
        ON Projects.ID = Project_Technologies.ProjectID 
            AND Project_Technologies.TechID = Technology.ID;



-- Select the name of the project, name of consultant and effort they spent on the project
SELECT 
	Projects.Title, Consultants.name, Project_Transaction.Effort_Spent
FROM
	Projects JOIN Consultants JOIN Project_Transaction
        ON 	Projects.ID = Project_Transaction.ProjectID 
            AND Consultants.ID = Project_Transaction.Resource_ID;



-- Display the names of consultant, email, phone number
SELECT
	Customers.Name, Contacts.Email, Contacts.phone
FROM
	Customers JOIN Contacts ON 	Customers.ID = Contacts.CustomerID;



-- Select the name of consultants, name of designation ad the grade
SELECT
	Consultants.name, Designations.Designation, Designations.Grade
FROM
	Consultants JOIN Designations ON Consultants.designation = Designations.ID;



-- Select the name of customer, and alternate contact phone number from the project
SELECT
	Projects.Title, Customers.Name, Contacts.phone
FROM
	Projects JOIN Customers JOIN Contacts
    	ON Projects.CustomerID = Customers.ID 
            AND Customers.ID = Contacts.CustomerID  
            AND Customers.pAddress <> Contacts.ID;