<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: projID_res,
            res: res,
            hrate: hrate,
            eseff: eseff,
            aceff: aceff,
            rpc: rpc,
            otall: otall,
            otr: otr,
            role: role
        }
*/

$id = $_POST['id'];
$res = $_POST['res'];
$hrate = $_POST['hrate'];
$eseff = $_POST['eseff'];
$aceff = $_POST['aceff'];
$rpc = $_POST['rpc'];
$otall = $_POST['otall'];
$otr = $_POST['otr'];
$role = $_POST['role'];

// Set the SQL
$sql = "INSERT INTO Project_Resources
        (
            Resource_ID, 
            Project_ID,
            Hourly_Rate, 
            Estimate_Effort, 
            Actual_Effort, 
            Relative_Percentage_completed, 
            ot_allowed, 
            ot_rate, 
            resource_role 	 
        ) VALUES (
            $res,
            '$id',
            '$hrate',
            '$eseff',
            '$aceff',
            '$rpc',
            '$otall',
            '$otr',
            '$role'
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