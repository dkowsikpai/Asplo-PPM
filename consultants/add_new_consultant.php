<?php
include('../config/connection.php');
$conn = connection();
/*
{
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

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$exp = $_POST['experience'];
$edu = $_POST['edu'];
$presentAddr = $_POST['presentAddr'];
$pAddr = $_POST['pAddr'];
$desig = $_POST['desig'];

// Set the SQL
$sql = "INSERT INTO Consultants
        (
            name, 
            phone, 
            email, 
            presentAddress, 
            pAddress, 
            highest_edu, 
            experience, 
            designation
        ) VALUES (
            '$name',
            '$phone',
            '$email',
            '$presentAddr',
            '$pAddr',
            '$edu',
            $exp,
            $desig
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
?>