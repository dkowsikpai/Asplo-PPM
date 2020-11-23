<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: projID_tr,
            res: res,
            es: es,
            pc: pc
        }
*/

$id = $_POST['id'];
$res = $_POST['res'];
$es = $_POST['es'];
$pc = $_POST['pc'];

// Set the SQL
$sql = "INSERT INTO Project_Transaction
        (
            Resource_ID, 
            ProjectID,
            Effort_Spent, 
            Percentage_Completed	 
        ) VALUES (
            $res,
            '$id',
            '$es',
            $pc
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