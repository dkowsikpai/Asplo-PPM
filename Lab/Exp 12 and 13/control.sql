use open_ppm;

-- IF - THEN - ELSE - THEN
-- Create a procedure using the control flow that gives the result whether the user is active or not
DELIMITER //
CREATE PROCEDURE activeUser(IN uname VARCHAR(20), OUT status VARCHAR(20))
BEGIN
    DECLARE act INTEGER;
    SELECT active into act 
        FROM Users 
        WHERE username = uname;
    IF act = 1 THEN 
        SET status = "Active";
    ELSE 
        SET status = "De-Activated";
    END IF;
END//
DELIMITER ;
CALL activeUser("dkowsikpai", @status);
SELECT @status;

-- CASE
-- Get the project status from the procedural call
DELIMITER //
CREATE PROCEDURE projectStatus(IN pid INT, OUT state VARCHAR(20)) 
BEGIN
    DECLARE stat INT;
    SELECT status INTO stat 
        FROM Projects 
        WHERE id=pid;
    CASE stat
        WHEN 0 THEN SET state = "Not Started";
        WHEN 1 THEN SET state = "Under Development";
        ELSE SET state = "Unavailable";
    END CASE;
END //
DELIMITER ;
CALL projectStatus(6, @state);
SELECT @state;

-- WHILE
-- Get the number of days left to finish date from the given date
DELIMITER //
CREATE PROCEDURE daysLeft(IN pid INT, IN curr DATE, OUT count INT)
BEGIN
    DECLARE f_date DATE;
    SELECT Finish_Date INTO f_date 
        FROM Projects 
        WHERE id = pid;
    SET count = 0;
    WHILE curr < f_date DO
        SET count = count + 1;
        SET curr = DATE_ADD(curr, INTERVAL 1 day);
    END WHILE;
END //

DELIMITER ;
-- Getting the last date of the project id wih 6
-- SELECT Finish_Date FROM Projects WHERE id = 6;
CALL daysLeft(6, "2020-09-19", @count);
SELECT @count;

-- REPEAT
-- Use the Repeat to do the daysLeft
DELIMITER //
CREATE PROCEDURE daysLeft_Rep(IN pid INT, IN curr DATE, OUT count INT)
BEGIN
    DECLARE f_date DATE;
    SELECT Finish_Date INTO f_date 
        FROM Projects 
        WHERE id = pid;
    SET count = 0;
    REPEAT 
        SET count = count + 1;
        SET curr = DATE_ADD(curr, INTERVAL 1 day);
    UNTIL curr >= f_date
    END REPEAT;
END//
DELIMITER ;
CALL daysLeft_Rep(6, "2020-09-19", @count);
SELECT @count;


-- LOOP, ITERATE, LEAVE
-- DaysLeft using Loop, Iterate, Leave
DELIMITER //
CREATE PROCEDURE daysLeft_Loop(IN pid INT, IN curr DATE, OUT count INT) 
BEGIN 
    DECLARE f_date DATE; 
    SELECT Finish_Date INTO f_date 
        FROM Projects 
        WHERE id = pid; 
    SET count = 0; 
    counter: LOOP 
        SET count = count + 1; 
        SET curr = DATE_ADD(curr, INTERVAL 1 day); 
        IF curr >= f_date THEN  
            LEAVE counter;
        ELSE ITERATE counter; 
        END IF; 
    END LOOP; 
END//
DELIMITER ;
CALL daysLeft_Loop(6, "2020-09-19", @count);
SELECT @count;
