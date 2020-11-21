<?php
include('../config/connection.php');
$conn = connection();
/*
{
           technology: technology,
            version: version
        }
*/

$technology = $_POST['technology'];
$version = $_POST['version'];


// Set the SQL
$sql = "INSERT INTO Technology
        (
            Technology, 
            Version
        ) VALUES (
            '$technology',
            '$version'
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