<?php
include('../config/connection.php');
$conn = connection();

$data = array();
$sql = "SELECT ID, CONCAT(Technology, ' (', Version,')') as title FROM Technology";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($data, array(
            "id" => $row["ID"],
            "title" => $row["title"]
        ));
    }
}

header("Content-Type: application/json");
echo json_encode($data);
mysqli_close($conn);
?>