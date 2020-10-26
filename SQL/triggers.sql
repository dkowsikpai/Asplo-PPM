use open_ppm;
-- Create procedures that were not created earlier
-- Procedure to get the last updated percentage value on project transaction for a given resource id and project id
DELIMITER //
CREATE PROCEDURE last_Project_Transaction(IN Resource_ID INT, IN ProjectID INT, OUT pCompleted DEC(5, 2))
BEGIN
    SELECT Percentage_Completed INTO pCompleted FROM Project_Transaction WHERE Resource_ID=1 AND ProjectID=2 ORDER BY Entry_Date DESC LIMIT 1;
END//
DELIMITER ;

-- ***************************** TRIGGERS ******************************
-- Before Insert
-- Trigger to check the currently entered percentage completed on project transaction is less than or equal to the previously entered value
-- If the trigger is true it will signal the error to the screen and prevents the data to be entered to the database
DELIMITER //
CREATE TRIGGER project_transaction_insert
BEFORE INSERT
ON Project_Transaction FOR EACH ROW
BEGIN
    CALL last_Project_Transaction(NEW.Resource_ID, NEW.ProjectID, @lastPercentage);
    IF @lastPercentage >= NEW.Percentage_Completed THEN
    	SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Percentage completed same or less than last update';
    END IF;
END //
DELIMITER ;

-- Testing Triggers
INSERT INTO Project_Transaction(Resource_ID, Effort_Spent, Percentage_Completed, ProjectID) VALUES( 1, 15, 0.6, 2 );
-- Trying to update old value with same value
-- This must give an error
INSERT INTO Project_Transaction(Resource_ID, Effort_Spent, Percentage_Completed, ProjectID) VALUES( 1, 15, 0.6, 2 );
-- Correct insertion
INSERT INTO Project_Transaction(Resource_ID, Effort_Spent, Percentage_Completed, ProjectID) VALUES( 1, 15, 0.8, 2 );
SELECT * FROM Project_Transaction WHERE Resource_ID=1 AND ProjectID=2;

-- After Insert
-- Create a trigger to update the project resource table to update actual efforts when we insert the new project transaction
DELIMITER //
CREATE TRIGGER project_transation_insert_update
AFTER INSERT
ON Project_Transaction FOR EACH ROW
BEGIN
	DECLARE old_actual_effort DEC(12, 2);
    SELECT Actual_Effort INTO old_actual_effort FROM Project_Resources WHERE Resource_ID = NEW.Resource_ID AND Project_ID = NEW.ProjectID;
    SET old_actual_effort = old_actual_effort + NEW.Effort_Spent;
	UPDATE Project_Resources SET Actual_Effort = old_actual_effort WHERE Resource_ID = NEW.Resource_ID AND Project_ID = NEW.ProjectID;
END //
DELIMITER ;
-- This inserts new value to the project 
INSERT INTO Project_Transaction(Resource_ID, Effort_Spent, Percentage_Completed, ProjectID) VALUES( 1, 15, 0.9, 2 );
SELECT * FROM Project_Resources WHERE Project_ID = 2 AND Resource_ID = 1;
-- Add value again and see the updated value
INSERT INTO Project_Transaction(Resource_ID, Effort_Spent, Percentage_Completed, ProjectID) VALUES( 1, 15, 1.0, 2 );
SELECT * FROM Project_Resources WHERE Project_ID = 2 AND Resource_ID = 1;


-- ************************* CURSORS *****************************
-- Compute the whole effort spent per project from project transaction
DELIMITER //
CREATE PROCEDURE getAggregateEffortPerProject(IN ProjID INT, OUT Effort DEC(12, 2))
BEGIN
	DECLARE finish INT DEFAULT 0;
	DECLARE agg DEC(12, 2) DEFAULT 0.00;
    DECLARE val DEC(12, 2);
    DECLARE eff_cur CURSOR FOR SELECT Effort_Spent FROM Project_Transaction WHERE ProjectID = ProjID;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finish = 1;
    
    OPEN eff_cur;
    
    agg_loop: LOOP
    	FETCH eff_cur INTO val;
        IF finish = 1 THEN
        	LEAVE agg_loop;
        END IF;
        SET agg = agg + val;
    END LOOP agg_loop;
    
    CLOSE eff_cur;
    
    SET Effort = agg;
    
END //
DELIMITER ;

-- Call the Procedure and Print
CALL getAggregateEffortPerProject(2, @Effort);
SELECT @Effort;
