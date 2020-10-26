------------README--------------
Login to the MySQL Database Server using your credential. If It is CLI
use the command
mysql -u <username> -p
Enter the password

---------- Creation of Packages  ----------
Package are not suppoerted in current MySQL version.

------------ Creation of database Triggers and Cursors -------------
SQL Commands are in the agg.sql in the same directory from this file was downloaded
Use source command to read and execute the command in SQL
For Eg:
msql> source /home/<path to directory>/triggers.sql

Wait until the process completes

It will show all the following functions in one table
1. Trigger
	1. Before Insert
		Trigger to check the currently entered percentage completed on project transaction is less than or equal to the previously entered 				value
		If the trigger is true it will signal the error to the screen and prevents the data to be entered to the 				database			
	2. After Insert
		Create a trigger to update the project resource table to update actual efforts when we insert the new project transaction

2. Cursor
	Compute the whole effort spent per project from project transaction



