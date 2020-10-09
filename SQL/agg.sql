use open_ppm;

-- AVG, COUNT, SUM, STD, VARIANCE
-- Calculate the average of effort spent transaction made for each project. Also Display the number of transaction, Sum, Standard Deviation, and variance
SELECT 
    Projects.title, 
    COUNT(Project_Transaction.Effort_Spent) AS "No of Transactions",
    AVG(Project_Transaction.Effort_Spent) AS "Average",
    SUM(Project_Transaction.Effort_Spent) AS "Sum",
    STD(Project_Transaction.Effort_Spent) AS "Standard Deviation",
    VARIANCE(Project_Transaction.Effort_Spent) AS "Variance"
FROM 
    Projects JOIN Project_Transaction 
ON Projects.ID = Project_Transaction.ProjectID 
GROUP BY Projects.title;

-- MIN, MAX
-- Display the minimum and maximuam in project transaction
SELECT 
    MIN(Project_Transaction.Percentage_Completed), 
    MAX(Project_Transaction.Percentage_Completed) 
FROM Project_Transaction;