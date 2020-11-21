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

$id = $_POST["id"];
$cp = $_POST['cp'];
$phone = $_POST['phone'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$desc = $_POST['desc'];

// Set the SQL
$sql = "UPDATE Contacts
        SET
            Conatct_Person  = '$cp',
            phone = '$phone',
            mobile = '$mobile',
            Email = '$email',
            profile_desc = '$desc'
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