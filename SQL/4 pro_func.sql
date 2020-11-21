USE open_ppm;

-- Add some of the columns which were not there previously
ALTER TABLE `Project_Resources` 
    ADD `ot_allowed` BOOLEAN NOT NULL DEFAULT FALSE 
        AFTER `Relative_Percentage_completed`, 
    ADD `ot_rate` DECIMAL(5,2) NOT NULL DEFAULT '0.00' 
        AFTER `ot_allowed`,
    ADD `resource_role` VARCHAR(30) NULL DEFAULT NULL AFTER `ot_rate`;

-- Update Hourly Rate values
UPDATE `Project_Resources` SET `Hourly_Rate` = '8' WHERE `Project_Resources`.`ID` = 1; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '9' WHERE `Project_Resources`.`ID` = 2; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '7' WHERE `Project_Resources`.`ID` = 3;
UPDATE `Project_Resources` SET `Hourly_Rate` = '9' WHERE `Project_Resources`.`ID` = 4; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '9' WHERE `Project_Resources`.`ID` = 5; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '8' WHERE `Project_Resources`.`ID` = 6; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '7' WHERE `Project_Resources`.`ID` = 7; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '9' WHERE `Project_Resources`.`ID` = 8; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '10' WHERE `Project_Resources`.`ID` = 9; 
UPDATE `Project_Resources` SET `Hourly_Rate` = '8' WHERE `Project_Resources`.`ID` = 10;

-- Update Over Time Rate and Over time Allowed
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '20' WHERE `Project_Resources`.`ID` = 1;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '13' WHERE `Project_Resources`.`ID` = 2;
UPDATE `Project_Resources` SET `ot_rate` = '11' WHERE `Project_Resources`.`ID` = 3;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '5' WHERE `Project_Resources`.`ID` = 4;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '8' WHERE `Project_Resources`.`ID` = 5;
UPDATE `Project_Resources` SET `ot_rate` = '20' WHERE `Project_Resources`.`ID` = 6;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '23' WHERE `Project_Resources`.`ID` = 7;
UPDATE `Project_Resources` SET `ot_rate` = '10' WHERE `Project_Resources`.`ID` = 8;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '11' WHERE `Project_Resources`.`ID` = 9;
UPDATE `Project_Resources` SET `ot_allowed` = '1', `ot_rate` = '12' WHERE `Project_Resources`.`ID` = 10;

-- Function
-- Compute the daily cost for each resource by using the transaction table and resource table.
-- SELECT PR.Project_ID, PR.Resource_ID, PR.Hourly_Rate, PR.ot_allowed, PR.ot_rate, PT.Effort_Spent, PT.Entry_Date FROM Project_Resources AS PR JOIN Project_Transaction AS PT ON PR.Project_ID = PT.ProjectID AND PR.Resource_ID = PT.Resource_ID;

DELIMITER //
CREATE FUNCTION getDailyCost(
    eff_spent DECIMAL(10, 2),
    hr_rate DECIMAL(12, 2),
    ot_rate DECIMAL(5, 2),
    ot_allowed BOOLEAN
)
RETURNS DECIMAL(20,2)
DETERMINISTIC
BEGIN
	DECLARE cost DECIMAL(20,2);
    IF ot_allowed = 1 THEN
    	SET cost = hr_rate*(8 + (eff_spent - 8)*(1 + (ot_rate/100)));
    ELSE 
    	SET cost = hr_rate*eff_spent;
    END IF;
    RETURN (cost);
END //
DELIMITER ;
-- Using Function to get information
SELECT 
    PR.Project_ID, 
    PR.Resource_ID, 
    PT.Entry_Date AS "Entry Date", 
    PT.Effort_Spent AS "Day's Effort (Hr)",
    PR.Hourly_Rate AS "Hourly Rate (Cost)", 
    PR.ot_rate AS "Overtime Rate (%)", 
    IF (PR.ot_allowed = 0, "Not Paid", "Paid") AS "Overtime Paid",
    getDailyCost(PT.Effort_Spent, PR.Hourly_Rate, PR.ot_rate, PR.ot_allowed) AS "Cost Per Day"
FROM Project_Resources AS PR JOIN Project_Transaction AS PT 
    ON PR.Project_ID = PT.ProjectID 
        AND PR.Resource_ID = PT.Resource_ID;

-- Procedure
-- Use Above Function to get the above information and print the total cost for a particular resource for a paricular project
DELIMITER //
CREATE PROCEDURE getCummulativeDailyCost(IN pid INT, IN resid INT, OUT total DECIMAL(20, 2))
BEGIN
    SELECT
        SUM(getDailyCost(PT.Effort_Spent, PR.Hourly_Rate, PR.ot_rate, PR.ot_allowed)) INTO total 
    FROM
        Project_Resources AS PR JOIN Project_Transaction AS PT
        ON PR.Project_ID = PT.ProjectID 
            AND PR.Resource_ID = PT.Resource_ID
    WHERE PR.Project_ID = pid AND PR.Resource_ID = resid;
END //
DELIMITER ;

CALL getCummulativeDailyCost(2, 1, @total_cost);
SELECT @total_cost;


DELIMITER //
CREATE FUNCTION project_status (stat INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
	DECLARE stat_str VARCHAR(20) DEFAULT "";
    SET stat_str = CASE 
    	WHEN stat = 0 THEN "Not Started yet"
    	WHEN stat = 1 THEN "Development"
    	WHEN stat = 2 THEN "Testing"
    	WHEN stat = 3 THEN "Alpha"
    	WHEN stat = 4 THEN "Beta"
    	WHEN stat = 5 THEN "Production Release"
    	WHEN stat = 6 THEN "Completed"
    	WHEN stat = 7 THEN "Maintanace"
    END;
	RETURN stat_str;
END //
DELIMITER ;

