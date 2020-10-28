<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: id
            name: name,
            phone: phone,
            email: email,
            fax: fax,
            pAddr: pAddr
        }
*/

$id = $_POST["id"];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$fax = $_POST['fax'];
$pAddr = $_POST['pAddr'];

// Set the SQL
$sql = "UPDATE Customers
        SET
            name = '$name',
            phone = '$phone',
            email = '$email',
            fax = '$fax',
            pAddress = '$pAddr'
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