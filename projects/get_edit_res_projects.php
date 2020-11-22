<?php
include('../config/connection.php');
$conn = connection();
/*
id: id
*/
$id = $_POST["id"];

$sql = "SELECT * FROM Project_Resources WHERE ID=$id LIMIT 1";
// echo $sql;
$result = mysqli_query($conn, $sql);
$json_data = array();
if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $json_data["success"] = TRUE;
        $json_data["data"] = array(
            "id"=> $row["ID"],
            "res"=> $row["Resource_ID"],
            "hrate"=> $row["Hourly_Rate"],
            "eseff"=> $row["Estimate_Effort"],
            "aceff"=> $row["Actual_Effort"],
            "rpc"=> $row["Relative_Percentage_completed"],
            "otall"=> $row["ot_allowed"],
            "otr"=> $row["ot_rate"],
            "role"=> $row["resource_role"],
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