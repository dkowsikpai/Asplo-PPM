<?php
include('../config/connection.php');
$conn = connection();
/*
id: id
*/
$id = $_POST["id"];

$sql = "SELECT * FROM Customers WHERE ID=$id LIMIT 1";
// echo $sql;
$result = mysqli_query($conn, $sql);
$json_data = array();
if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $json_data["success"] = TRUE;
        $json_data["data"] = array(
            "id"=> $row["ID"],
            "name"=> $row["Name"],
            "phone"=> $row["phone"],
            "email"=> $row["email"],
            "fax"=> $row["fax"],
            "pAddress"=> $row["pAddress"]
        );
    }
} else {
    $json_data["success"] = FALSE;
    $json_data["message"] = mysqli_error($conn);
}
header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>