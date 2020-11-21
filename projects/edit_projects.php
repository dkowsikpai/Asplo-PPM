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

$id = $_POST['id'];
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
$sql = "UPDATE Projects
        SET
            Title='$title', 
            Description='$desc', 
            CustomerID='$cust', 
            PM='$pm', 
            status=$status, 
            estimated_effort=$eff, 
            estimated_cost=$cost, 
            pCompleted=$pert, 
            Start_Date='$stdate',
            Finish_Date='$fidate'
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