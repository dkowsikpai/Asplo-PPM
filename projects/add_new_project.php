<?php
include('../config/connection.php');
$conn = connection();
/*
{
            title: title,
            desc: desc,
            cust: cust,
            pm: pm,
            status: status,
            eff: eff,
            cost: cost,
            pert: pert,
            stdate: stdate,
            fidate: fidate
        }
*/

$title = $_POST['title'];
$desc = $_POST['desc'];
$cust = $_POST['cust'];
$pm = $_POST['pm'];
$status = $_POST['status'];
$eff = $_POST['eff'];
$cost = $_POST['cost'];
$pert = $_POST['pert'];
$stdate = $_POST['stdate'];
$fidate = $_POST['fidate'];

// Set the SQL
$sql = "INSERT INTO Projects
        (
            Title, 
            Description, 
            CustomerID, 
            PM, 
            status, 
            estimated_effort, 
            estimated_cost,
            pCompleted,
            Start_Date,
            Finish_Date
        ) VALUES (
            '$title',
            '$desc',
            '$cust',
            '$pm',
            '$status',
            '$eff',
            '$cost',
            '$pert',
            '$stdate',
            '$fidate'
        )";
// echo $sql;
$json_data = array();
$result = mysqli_query($conn, $sql);
if ($result === TRUE){
    $json_data["success"] = TRUE;
    $json_data["message"] = "New Record Added Successfully";
} else {
    $json_data["success"] = FALSE;
    $json_data["message"] = "Couldn't add record. Try again later. ".mysqli_error($conn);
}
header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>