<?php
include('../config/connection.php');
$conn = connection();

$id = $_POST["id"];
$data = array();
$sql = "SELECT Consultants.ID, CONCAT(name, ' (', email,')', ' - ', Designations.Designation) as title FROM Consultants JOIN Designations ON Consultants.designation=Designations.ID WHERE Consultants.ID IN (SELECT Resource_ID FROM Project_Resources WHERE Project_ID=$id)";
// echo $sql;
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