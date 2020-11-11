<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: id
            designation: name,
            grade: grade,
        }
*/

$id = $_POST["id"];
$designation = $_POST['designation'];
$grade = $_POST['grade'];

// Set the SQL
$sql = "UPDATE Designations
        SET
            Designation = '$designation',
            Grade = '$grade'
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