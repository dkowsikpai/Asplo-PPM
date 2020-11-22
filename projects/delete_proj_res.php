<?php
include('../config/connection.php');
$conn = connection();
/*
        {
            id: id
        }
*/

$id = $_POST["id"];

// Set the SQL
$sql = "DELETE FROM Project_Resources WHERE ID=$id";
// echo $sql;
$json_data = array();
$result = mysqli_query($conn, $sql);
if ($result === TRUE){
    $json_data["success"] = TRUE;
    $json_data["message"] = "Deleted Successfully";
} else {
    $json_data["success"] = FALSE;
    $json_data["message"] = "Couldn't delete record. Try again later. ".mysqli_error($conn);
}
header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>