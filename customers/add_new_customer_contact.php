<?php
include('../config/connection.php');
$conn = connection();
/*
{
            id: custID,
            cp: cp,
            phone: phone,
            mobile: mobile,
            email: email,
            desc: desc
                }
*/

$id = $_POST['id'];
$cp = $_POST['cp'];
$phone = $_POST['phone'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$desc = $_POST['desc'];

// Set the SQL
$sql = "INSERT INTO Contacts
        (
            Conatct_Person, 
            phone,
            mobile,
            Email,
            profile_desc,
            CustomerID 	 
        ) VALUES (
            '$cp',
            '$phone',
            '$mobile',
            '$email',
            '$desc',
            $id
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