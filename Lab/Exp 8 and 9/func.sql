use open_ppm;
-- String Fuctions

-- CHAR_LENGTH
-- Select the consultants table and output string lenth of presentAddress and presentAddress
SELECT CHAR_LENGTH(presentAddress), presentAddress FROM Consultants;

-- CONCAT, SPACE, UPPER
-- Select Consultants and print the name in the format:- Name (DESIGNATION)
-- Name + <Space> + "(" + Designation in uppercase + ")"
SELECT 
    CONCAT(
        Consultants.name, 
        SPACE(1), 
        "(", 
        UPPER(Designations.Designation), 
        ")"
    )  
FROM Consultants JOIN Designations 
ON Designations.ID = Consultants.designation;


-- Numerical Functions

-- PI
-- Print Value of PI
SELECT PI();

-- ROUND
-- Select Project Transactions table and display the project name and entries of percentage completed of each resource. Percentage completed must be rounded of to one decimal
SELECT 
    Projects.title, 
    ROUND(Project_Transaction.Percentage_Completed, 1) 
FROM Projects JOIN Project_Transaction 
ON Projects.ID = Project_Transaction.ProjectID;

-- FLOOR
-- Select Project Transactions table and display the project name and entries of percentage completed of each resource. Perentage completed must be to nearest integer (not decimal)
SELECT 
    Projects.title, 
    FLOOR(Project_Transaction.Percentage_Completed) 
FROM Projects JOIN Project_Transaction 
ON Projects.ID = Project_Transaction.ProjectID;

-- MIN, MAX
-- Display the minimum and maximuam in project transaction
SELECT 
    MIN(Project_Transaction.Percentage_Completed), 
    MAX(Project_Transaction.Percentage_Completed) 
FROM Project_Transaction;


-- Date Functions

-- CURDATE
-- Display the current date in console
SELECT CURDATE();

-- DATE_FORMAT
-- Select Project table and display the title, project start date. Date must be in format Day Date. Month must be displayed in name format
SELECT 
    title, 
    DATE_FORMAT(Start_Date, "%a %D %b %Y") 
FROM Projects;

-- DATEDIFF
-- Display the number of days between start date and finish date for each project
SELECT 
    title, 
    DATEDIFF(Finish_Date, Start_Date) 
FROM Projects;

-- DATE_SUB
-- Display the date which is 10 days before finish date in specific format.
SELECT 
    title, 
    DATE_FORMAT(
        DATE_SUB(Finish_Date, INTERVAL 10 DAY),
        "%a %D, %b %Y"
    ) 
FROM Projects; 


-- Advanced Functions

-- CASE
-- Display the status in text format corresponding to the integer format for each projects
SELECT 
    title, 
    status,  
    CASE  
        WHEN status = 0 THEN "Under Waiting"
        WHEN status = 1 THEN "Under Development"
    END AS Status_Text 
FROM Projects;

-- IF
-- Display the user_status in text format. Use IF to convert ot text
SELECT 
    username, 
    active, 
    IF(active=1, "ACTIVE", "DEACTIVATED") AS User_Status 
FROM Users;

-- DATABASE, CURRENT_USER, CONNECTION_ID, VERSION
-- Display the details of the current connection
SELECT 
    DATABASE(), 
    CURRENT_USER(), 
    CONNECTION_ID(), 
    VERSION();