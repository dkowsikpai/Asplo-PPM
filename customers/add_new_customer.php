<?php
include('../config/connection.php');
$conn = connection();
/*
{
            name: name,
            phone: phone,
            email: email,
            fax: fax,
            pAddr: pAddr
        }
*/

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$fax = $_POST['fax'];
$pAddr = $_POST['pAddr'];

// Set the SQL
$sql = "INSERT INTO Customers
        (
            name, 
            phone, 
            email, 
            fax,
            pAddress 
        ) VALUES (
            '$name',
            '$phone',
            '$email',
            '$fax',
            '$pAddr'
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