
use open_ppm;
-- Exp 11


-- JOIN
-- Projects Efforts View and Join with the Consultants table and display the phone number corresponding to their effors
SELECT 
    Consultants.Name, 
    Projects_Efforts.Effort_Spent, 
    Projects_Efforts.Effort_Spent, 
    Consultants.phone 
FROM Projects_Efforts JOIN Consultants 
        ON Projects_Efforts.CID = Consultants.ID;

-- Nested Query
-- Use the nested query and select the CEO From the Project Effots Table and display his Effort
SELECT 
    Consultants.Name, 
    Projects_Efforts.Effort_Spent, 
    Projects_Efforts.Effort_Spent, 
    Consultants.phone 
FROM Projects_Efforts JOIN Consultants 
    ON Projects_Efforts.CID = Consultants.ID 
        WHERE Consultants.Name 
            IN (
                SELECT 
                    Name 
                FROM Consultant_Designation 
                    WHERE Designation = "CEO" 
                );

-- UNION
-- Use the nested query and select the CEO and Marketing Manager From the Project Effots Table and display his Effort
SELECT 
    Consultants.Name, 
    Projects_Efforts.Effort_Spent, 
    Projects_Efforts.Effort_Spent, 
    Consultants.phone 
FROM Projects_Efforts JOIN Consultants 
    ON Projects_Efforts.CID = Consultants.ID 
        WHERE Consultants.Name 
            IN (
                SELECT 
                    Name 
                FROM Consultant_Designation 
                    WHERE Designation = "CEO" 
                ) 
                UNION 
                SELECT 
                    Consultants.Name, 
                    Projects_Efforts.Effort_Spent, 
                    Projects_Efforts.Effort_Spent, 
                    Consultants.phone 
                FROM Projects_Efforts JOIN Consultants 
                    ON Projects_Efforts.CID = Consultants.ID 
                        WHERE Consultants.Name 
                            IN (
                                SELECT 
                                    Name 
                                FROM Consultant_Designation 
                                    WHERE Designation = "Marketing Manager" 
                                );


-- Set Difference (NOT IN)
-- Select the name of those working in Open PPM Project not in Sirius. Use Projects_Efforts View
 SELECT 
    Name 
FROM Projects_Efforts 
    WHERE 
        Title = "Open PPM" 
    AND 
        Name NOT IN (
            SELECT 
                Name 
            FROM 
                Projects_Efforts 
                    WHERE Title = "Sirius"
                );

-- INTERSECTION / IN
-- Select the consultants working on both Open PPM and Sirius. Form Projects_Efforts View
SELECT 
    Name 
FROM Projects_Efforts 
    WHERE Title = "Open PPM" 
        AND 
        Name IN (
            SELECT 
                Name 
                FROM Projects_Efforts 
                    WHERE Title = "Sirius"
                );

-- CROSS PRODUCT / CROSS JOIN
-- Just See the Cross product on Projects_Effort and Consultants Table 
SELECT 
    Consultants.Name, 
    Projects_Efforts.Effort_Spent, 
    Projects_Efforts.Effort_Spent, 
    Consultants.phone 
FROM Projects_Efforts CROSS JOIN Consultants;