------------README--------------
Login to the MySQL Database Server using your credential. If It is CLI
use the command
mysql -u <username> -p
Enter the password

----------Implementation of Order By, Group By & Having clause in database----------
SQL Commands are in the func.sql in the same directory from this file was downloaded
Use source command to read and execute the command in SQL
For Eg:
msql> source /home/<path to directory>/group.sql

Wait until the process completes

It will show the tables in the order
1. GROUP BY - Group By Title Form the Project Effort Views
2. HAVING - Group By Title from the Project Effor Views and select the one having the Sum of Efforts greater than 100
3. ORDER BY - Order the Projects Efforts View in Decreasing Order


------------Implementation of set operators, nested queries and Join queries-------------
SQL Commands are in the agg.sql in the same directory from this file was downloaded
Use source command to read and execute the command in SQL
For Eg:
msql> source /home/<path to directory>/set.sql

Wait until the process completes

It will show all the following functions in one table
1. JOIN - Projects Efforts View and Join with the Consultants table and display the phone number corresponding to their effors
2. Nested Query - Use the nested query and select the CEO From the Project Effots Table and display his Effort
3. UNION - Use the nested query and select the CEO and Marketing Manager From the Project Effots Table and display his Effort
4. Set Difference - Select the name of those working in Open PPM Project not in Sirius. Use Projects_Efforts View
5. Intersection - Select the consultants working on both Open PPM and Sirius. Form Projects_Efforts View
6. CROSS Product - Just See the Cross product on Projects_Effort and Consultants Table 


