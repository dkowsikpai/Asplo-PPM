use open_ppm;

-- Exp 10

-- GROUP BY
-- Group By Title Form the Project Effort Views
SELECT 
    Title, 
    SUM(Effort_Spent) 
FROM Projects_Efforts 
GROUP BY (Title);

-- HAVING
-- Group By Title from the Project Effor Views and select the one having the Sum of Efforts greater than 100
SELECT 
    Title, 
    SUM(Effort_Spent) as Sum 
FROM Projects_Efforts 
GROUP BY (Title) 
    HAVING Sum > 100;

-- ORDER BY
-- Order the Projects Efforts View in Decreasing Order
SELECT 
    Title, 
    Name, 
    Effort_Spent 
FROM Projects_Efforts 
ORDER BY Effort_Spent DESC;
