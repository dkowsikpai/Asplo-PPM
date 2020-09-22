USE open_ppm;

-- Adding data to designation
INSERT INTO `Designations` (`ID`, `Grade`, `Designation`) VALUES
(1, '1', 'CEO'),
(2, '2', 'Accounts Manager'),
(3, '2', 'Design Manager'),
(4, '2', 'Project Manager'),
(5, '2', 'Marketing Manager'),
(6, '3', 'Web Developer'),
(7, '1', 'CFO'),
(8, '3', 'Android Developer'),
(9, '3', 'Data Analyst');

-- Creating new consultants
INSERT INTO `Consultants` (`ID`, `name`, `phone`, `email`, `presentAddress`, `pAddress`, `highest_edu`, `experience`, `designation`) VALUES
(1, 'Petey Cruiser', '410763981007', 'peter@gmail.com', '405 Fulton Court Attleboro, MA 02703', '405 Fulton Court Attleboro, MA 02703', 'BTech CSE', 0, 1),
(2, 'Anna Sthesia', '10105525611', 'anna@gmail.com', '47 Glenridge St.\r\nHuntersville, NC 28078', '47 Glenridge St.\r\nHuntersville, NC 28078', 'CA', 20, 2),
(3, 'Paul Molive', '6011377914', 'paul@gmail.com', '945 Mill Street\r\nParlin, NJ 08859', '945 Mill Street\r\nParlin, NJ 08859', 'Diploma in Computer Design', 21, 3),
(4, 'Anna Mull', '7901584026', 'annamull@gmail.com', '613 East Clay Lane\r\nPalatine, IL 60067', '613 East Clay Lane\r\nPalatine, IL 60067', 'Masters in CSE', 25, 4),
(5, 'Gail Forcewind', '1594941628', 'gail@gmail.com', '479 Thorne St.\r\nSaint Joseph, MI 49085', '479 Thorne St.\r\nSaint Joseph, MI 49085', 'CFO', 22, 5),
(6, 'Paige Turner', '0148042499', 'paige@gmail.com', '128 Hillside St.\r\nBismarck, ND 58501', '128 Hillside St.\r\nBismarck, ND 58501', 'MBA', 15, 7),
(7, 'Walter Melon', '1171089059', 'walter@gmail.com', '7990 Lakewood Dr.\r\nPlainfield, NJ 07060', '7990 Lakewood Dr.\r\nPlainfield, NJ 07060', 'BTech in CS', 10, 8),
(8, 'Nick R. Bocker', '5779877107', 'nick@gmail.com', '7555 NW. Gulf Drive\r\nJamaica, NY 11432', '7555 NW. Gulf Drive\r\nJamaica, NY 11432', 'BTech in CS', 8, 9),
(9, 'Barb Ackue', '9646946767', 'barb@gmail.com', '478 South Crescent Street\r\nBergenfield, NJ 07621', '478 South Crescent Street\r\nBergenfield, NJ 07621', 'BTech in CS', 12, 6);

-- Adding technologies
INSERT INTO `Technology` (`ID`, `Technology`, `Version`) VALUES
(1, 'Django', '3.0.0'),
(2, 'Node JS', '12.0.0'),
(3, 'Android', '8'),
(4, 'Tensorflow', '2'),
(5, 'Flutter', '10.0.0');

-- Adding consultant->tech
INSERT INTO `Consultant_Technologies` (`ID`, `TechID`, `ConsultantID`) VALUES
(1, 1, 6),
(2, 2, 6),
(3, 3, 8),
(4, 4, 9),
(5, 5, 8);

-- Creating new customers
INSERT INTO `Customers` (`Name`, `ID`, `phone`, `email`, `fax`, `pAddress`) VALUES
('Acme Corporation', 1, '1318100317', 'acme@gmail.com', '5779877107', NULL),
('Soylent Corp', 2, '0914013308', 'soylent@gmail.com', '0914013308', NULL);

-- Addind customer contacts
INSERT INTO `Contacts` (`Conatct_Person`, `ID`, `phone`, `mobile`, `Email`, `profile_desc`, `CustomerID`) VALUES
('Buck Kinnear', 1, '8653690567', '8653690567', 'buck@gmail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
('Greta Life', 2, '7759478389', '7759478389', 'greata@gmail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
('Ira Membrit', 3, '1948093558', '1948093558', 'ira@gmail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2),
('Brock Lee', 4, '3277574011', '3277574011', 'brock@gmail.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2);

-- Updating customer contacts 
UPDATE `Customers` SET `pAddress` = '1' WHERE `Customers`.`ID` = 1; 
UPDATE `Customers` SET `pAddress` = '3' WHERE `Customers`.`ID` = 2; 

-- Adding new Projects
INSERT INTO `Projects` (`ID`, `Title`, `Description`, `CustomerID`, `PM`, `status`, `estimated_effort`, `estimated_cost`, `pCompleted`, `Start_Date`, `Finish_Date`) VALUES
(1, 'Sirius', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1, 4, 0, 0.00, 0.00, 0.00, '2020-09-12 13:15:49', '2021-02-27 13:15:49'),
(2, 'Open PPM', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2, 4, 0, 0.00, 0.00, 0.00, '2020-09-12 13:15:49', '2021-04-16 13:15:49');

-- Adding Projects->Technology
INSERT INTO `Project_Technologies` (`ID`, `ProjectID`, `TechID`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10, 2, 5);

-- Adding Project Resources
INSERT INTO `Project_Resources` (`ID`, `Project_ID`, `Resource_ID`, `Hourly_Rate`, `Estimate_Effort`, `Actual_Effort`, `Relative_Percentage_completed`) VALUES
(1, 1, 1, 0.00, 0.00, 0.00, 0.00),
(2, 1, 2, 0.00, 0.00, 0.00, 0.00),
(3, 1, 3, 0.00, 0.00, 0.00, 0.00),
(4, 1, 6, 0.00, 0.00, 0.00, 0.00),
(5, 1, 8, 0.00, 0.00, 0.00, 0.00),
(6, 2, 1, 0.00, 0.00, 0.00, 0.00),
(7, 2, 2, 0.00, 0.00, 0.00, 0.00),
(8, 2, 6, 0.00, 0.00, 0.00, 0.00),
(9, 2, 7, 0.00, 0.00, 0.00, 0.00),
(10, 2, 8, 0.00, 0.00, 0.00, 0.00);

-- Adding Project Transactions
INSERT INTO `Project_Transaction` (`ID`, `Resource_ID`, `Entry_Date`, `Effort_Spent`, `Percentage_Completed`, `ProjectID`) VALUES
(1, 1, '2020-09-12 13:33:24', '22.00', '0.20', 2),
(2, 2, '2020-09-12 13:33:24', '10.00', '0.01', 2),
(3, 3, '2020-09-12 13:33:24', '10.00', '0.10', 2),
(4, 4, '2020-09-12 13:33:24', '15.00', '1.00', 2),
(5, 5, '2020-09-12 13:33:24', '25.20', '5.00', 2),
(6, 6, '2020-09-12 13:33:24', '5.00', '0.01', 2),
(7, 7, '2020-09-12 13:33:24', '2.00', '0.02', 2),
(8, 8, '2020-09-12 13:33:24', '25.00', '10.00', 2),
(9, 9, '2020-09-12 13:33:24', '26.00', '30.00', 1),
(10, 3, '2020-09-12 13:33:24', '10.00', '20.00', 1);

-- Updating name of consultant
UPDATE Consultants SET name="Alex Fleix" WHERE ID=9;

-- Deleting Project Transaction
DELETE FROM Project_Transaction WHERE ID=10;
