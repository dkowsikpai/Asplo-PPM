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
// $res = $_POST['res'];
$hrate = $_POST['hrate'];
$eseff = $_POST['eseff'];
$aceff = $_POST['aceff'];
$rpc = $_POST['rpc'];
$otall = $_POST['otall'];
$otr = $_POST['otr'];
$role = $_POST['role'];

// Set the SQL
$sql = "UPDATE Project_Resources
        SET
            Hourly_Rate='$hrate',
            Estimate_Effort='$eseff',
            Actual_Effort='$aceff',
            Relative_Percentage_completed='$rpc',
            ot_allowed='$otall',
            ot_rate='$otr',
            resource_role='$role'
        WHERE ID=$id ";
// echo $sql;
$json_data = array();
$result = mysqli_query($conn, $sql);
if ($result === TRUE){
    $json_data["success"] = TRUE;
    $json_data["message"] = "Edited Successfully";
} else {
    $json_data["success"] = FALSE;
    $json_data["message"] = "Couldn't edit record. Try again later. ".mysqli_error($conn);
}
header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>