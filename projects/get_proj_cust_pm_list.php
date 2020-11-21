<?php
include('../config/connection.php');
$conn = connection();

$data_cust = array();
$sql = "SELECT ID, Name FROM Customers";
$result_cust = mysqli_query($conn, $sql);
if (mysqli_num_rows($result_cust) > 0) {
    while($row = mysqli_fetch_assoc($result_cust)){
        array_push($data_cust, array(
            "id" => $row["ID"],
            "title" => $row["Name"]
        ));
    }
}

$data_pm = array();
$sql = "SELECT ID, name FROM Consultants";
$result_pm = mysqli_query($conn, $sql);
if (mysqli_num_rows($result_pm) > 0) {
    while($row = mysqli_fetch_assoc($result_pm)){
        array_push($data_pm, array(
            "id" => $row["ID"],
            "title" => $row["name"]
        ));
    }
}

$json_data = array(
    "customer" => $data_cust,
    "pm" => $data_pm
);


header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>