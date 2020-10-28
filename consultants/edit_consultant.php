<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: id
            name: name,
            phone: phone,
            email: email,
            experience: exp,
            edu: edu,
            presentAddr: presentAddr,
            pAddr: pAddr,
            desig: desig
        }
*/

$id = $_POST["id"];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$exp = $_POST['experience'];
$edu = $_POST['edu'];
$presentAddr = $_POST['presentAddr'];
$pAddr = $_POST['pAddr'];
$desig = $_POST['desig'];

// Set the SQL
$sql = "UPDATE Consultants
        SET
            name = '$name',
            phone = '$phone',
            email = '$email',
            presentAddress = '$presentAddr',
            pAddress = '$pAddr',
            highest_edu = '$edu',
            experience = $exp,
            designation = $desig
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