<?php
include('../config/connection.php');
$conn = connection();
/*
id: id
*/
$id = $_POST["id"];

$sql = "SELECT * FROM Consultants WHERE ID=$id LIMIT 1";
// echo $sql;
$result = mysqli_query($conn, $sql);
$json_data = array();
if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $json_data["success"] = TRUE;
        $json_data["data"] = array(
            "id"=> $row["ID"],
            "name"=> $row["name"],
            "phone"=> $row["phone"],
            "email"=> $row["email"],
            "presentAddress"=> $row["presentAddress"],
            "pAddress"=> $row["pAddress"],
            "experience"=> $row["experience"],
            "edu"=> $row["highest_edu"],
            "designation"=> $row["designation"]
        );
    }
} else {
    $json_data["success"] = FALSE;
    $json_data["message"] = mysqli_error($conn);
}
header("Content-Type: application/json");
echo json_encode($json_data);
/*
Send Format:

{
  "success": true,
  "data": {
    "id": "1",
    "name": "Petey Cruiser",
    "phone": "410763981007",
    "email": "peter@gmail.com",
    "presentAddress": "405 Fulton Court Attleboro, MA 02703",
    "pAddress": "405 Fulton Court Attleboro, MA 02703",
    "experience": "0",
    "edu": "BTech CSE",
    "designation": "1"
  }
}
*/
?>