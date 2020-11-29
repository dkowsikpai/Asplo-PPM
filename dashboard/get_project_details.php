<?php
include('../config/connection.php');
$conn = connection();

// $id = $_POST["id"];
$customer_name = array();
$customer_proj = array();

$resource_name = array();
$resource_proj = array();

$technology_name = array();
$technology_proj = array();

$technology_name_con = array();
$technology_con = array();

$project_name = array();
$project_est_cost = array();
$project_act_cost = array();

$resource_name_eff = array();
$resource_est_effort = array();
$resource_act_effort = array();

$sql = "SELECT Customers.Name as name, count(Projects.ID) as proj FROM Projects JOIN Customers ON Projects.CustomerID=Customers.ID GROUP BY Customers.ID";
// echo $sql;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($customer_name, explode(" ", $row["name"])[0]);
        array_push($customer_proj, (int)$row["proj"]);
    }
}

$sql = "SELECT Consultants.name as name, count(Projects.ID) as proj FROM Projects JOIN Project_Resources ON Projects.ID=Project_Resources.Project_ID JOIN Consultants ON Project_Resources.Resource_ID = Consultants.ID GROUP BY Consultants.ID";
// echo $sql;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($resource_name, explode(" ", $row["name"])[0]);
        array_push($resource_proj, (int)$row["proj"]);
    }
}

$sql = "SELECT Technology.Technology as name, COUNT(Projects.ID) as proj FROM Projects JOIN Project_Technologies ON Projects.ID=Project_Technologies.ProjectID JOIN Technology ON Project_Technologies.TechID = Technology.ID GROUP BY Technology.Technology";
// echo $sql;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($technology_name, explode(" ", $row["name"])[0]);
        array_push($technology_proj, (int)$row["proj"]);
    }
}

$sql = "SELECT Technology.Technology as name, COUNT(Consultants.ID) as cons FROM Consultant_Technologies JOIN Consultants ON Consultant_Technologies.ConsultantID=Consultants.ID JOIN Technology ON Technology.ID = Consultant_Technologies.TechID GROUP BY Technology.ID";
// echo $sql;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($technology_name_con, explode(" ", $row["name"])[0]);
        array_push($technology_con, (int)$row["cons"]);
    }
}

$sql = "CREATE TEMPORARY TABLE Dashboard_Project_Cost ( ID INT, Title VARCHAR(300), Est_cost DECIMAL(10, 2), Act_cost DECIMAL(10, 2) DEFAULT 0.0 );";
// echo $sql;
$result = mysqli_query($conn, $sql);
$sql = "INSERT INTO Dashboard_Project_Cost(ID, Title, Est_cost) SELECT ID, Title, estimated_cost FROM Projects;";
$result = mysqli_query($conn, $sql);
$sql = "SELECT PR.Project_ID as ID, SUM(getDailyCost(PT.Effort_Spent, PR.Hourly_Rate, PR.ot_rate, PR.ot_allowed)) as act_cost FROM Project_Resources AS PR JOIN Project_Transaction AS PT ON PR.Project_ID = PT.ProjectID AND PR.Resource_ID = PT.Resource_ID GROUP BY PR.Project_ID";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        $s1 = "UPDATE Dashboard_Project_Cost SET Act_cost=".$row['act_cost']." WHERE ID=".$row["ID"];
        mysqli_query($conn, $s1);
    }
}
$sql = "SELECT * FROM Dashboard_Project_Cost";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($project_name, explode(" ", $row["Title"])[0]);
        array_push($project_act_cost, (double)$row["Act_cost"]); 
        array_push($project_est_cost, (double)$row["Est_cost"]); 
    }
}

$sql = "SELECT Consultants.name as name, SUM(Project_Resources.Estimate_Effort) as est_effort, SUM(Project_Resources.Actual_Effort) as act_effort FROM Project_Resources JOIN Consultants ON Project_Resources.Resource_ID = Consultants.ID GROUP BY Consultants.ID";
// echo $sql;
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        array_push($resource_name_eff, explode(" ", $row["name"])[0]);
        array_push($resource_est_effort, (int)$row["est_effort"]);
        array_push($resource_act_effort, (int)$row["act_effort"]);
    }
}

$data = array(
    "customer_name"=>$customer_name,
    "customer_proj"=>$customer_proj,
    "resource_name"=>$resource_name,
    "resource_proj"=>$resource_proj,
    "technology_name"=>$technology_name,
    "technology_proj"=>$technology_proj,
    "technology_name_con"=>$technology_name_con,
    "technology_con"=>$technology_con,
    "project_est_cost"=>$project_est_cost,
    "project_act_cost"=>$project_act_cost,
    "project_name"=>$project_name,
    "resource_name_eff"=>$resource_name_eff,
    "resource_est_effort"=>$resource_est_effort,
    "resource_act_effort"=>$resource_act_effort

);

header("Content-Type: application/json");
echo json_encode($data);
mysqli_close($conn);
?>