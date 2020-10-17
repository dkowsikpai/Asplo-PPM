------------README--------------
Login to the MySQL Database Server using your credential. If It is CLI
use the command
mysql -u <username> -p
Enter the password

----------Implementation of various control structures using PL/SQL----------
SQL Commands are in the func.sql in the same directory from this file was downloaded
Use source command to read and execute the command in SQL
For Eg:
msql> source /home/<path to directory>/control.sql

Wait until the process completes

It will show the tables in the order
1. IF - THEN - ELSE - THEN
	 Create a procedure using the control flow that gives the result whether the user is active or not
2. CASE
	Get the project status from the procedural call
3. WHILE
	Get the number of days left to finish date from the given date
4. REPEAT
	Use the Repeat to do the daysLeft
5. LOOP, ITERATE, LEAVE
	DaysLeft using Loop, Iterate, Leave



------------Creation of Procedures and Functions-------------
SQL Commands are in the agg.sql in the same directory from this file was downloaded
Use source command to read and execute the command in SQL
For Eg:
msql> source /home/<path to directory>/pro_func.sql

Wait until the process completes

It will show all the following functions in one table
1. Function
	Compute the daily cost for each resource by using the transaction table and resource table.
	-- Table that will be used - SELECT PR.Project_ID, PR.Resource_ID, PR.Hourly_Rate, PR.ot_allowed, PR.ot_rate, PT.Effort_Spent, PT.Entry_Date 						FROM Project_Resources AS PR JOIN Project_Transaction AS PT ON PR.Project_ID = PT.ProjectID AND PR.Resource_ID 						= PT.Resource_ID;

2. Procedure
	Use Above Function to get the above information and print the total cost for a particular resource for a paricular project



