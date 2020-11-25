<?php

include("../config/connection.php");

$conn = connection();

$sql = "SELECT Projects.ID, Title, Description, Customers.Name as cuName, Consultants.name as pmName, project_status(status) as stat, estimated_effort, estimated_cost, pCompleted, Start_Date, Finish_Date FROM Projects JOIN Consultants ON PM=Consultants.ID JOIN Customers ON CustomerID=Customers.ID ORDER BY Title ASC";
$result = mysqli_query($conn, $sql);
$colheader = '';
$colheader .= "Project ID" ."\t"."Title" ."\t"."Description" ."\t"."Customer Name" ."\t"."Project Manager" ."\t"."Status" ."\t"."Estimated Effort" ."\t"."Estimated Cost" ."\t"."Percentage Completed" ."\t"."Start Date" ."\t"."End Date";
$setData = '';
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $setData .= $row["ID"]."\t".
                    $row["Title"]."\t".
                    $row["description"]."\t".
                    $row["cuName"]."\t".
                    $row["pmName"]."\t". 
                    $row["stat"]."\t".
                    $row["estimated_effort"]."\t". 
                    $row["estimated_cost"]."\t". 
                    $row["pCompleted"]."\t". 
                    $row["Start_Date"]."\t". 
                    $row["Finish_Date"]."\n";
    }
}

// echo $setData;

header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename=Projects.xls");  
header("Pragma: no-cache");  
header("Expires: 0");  

echo ucwords($colheader) . "\n" . $setData . "\n";
mysqli_close($conn);
?>