<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: id,
            technology: technology,
            version: version
        }
*/

$id = $_POST["id"];
$technology = $_POST['technology'];
$version = $_POST['version'];

// Set the SQL
$sql = "UPDATE Technology
        SET
            Technology = '$technology',
            Version = '$version'
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