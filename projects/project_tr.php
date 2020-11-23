<?php

include("../config/connection.php");

$conn = connection();

/*
 {
  page: '1',
  rp: '15',
  sortname: 'complaintsID',
  sortorder: 'desc',
  query: '',
  qtype: 'complaintsID' }

*/
if (isset($_POST['id'])) {
    $id = $_POST['id'];
} else {
    $id = -1;
}
// echo $id;

if (isset($_POST['page'])) {
    $page = $_POST['page'];
} else {
    $page = 1;
}

if (isset($_POST['rp'])) {
    $rp = $_POST['rp'];
} else {
    $rp = 15;
}

if (isset($_POST['sortname'])) {
    $sortName = $_POST['sortname'];
} else {
    $sortName = 'ID';
}

if (isset($_POST['sortorder'])) {
    $sortOrder = $_POST['sortorder'];
} else {
    $sortOrder = 'asc';
}

if (isset($_POST['query']) || $_POST['query'] = "") {
    $query = $_POST['query'];
}

if (isset($_POST['qtype']) || $_POST['qtype'] = "") {
    $qtype = $_POST['qtype'];
}

if($query!=''){
    $where = "WHERE ".$qtype." LIKE '%".$query."%' AND Project_Transaction.ProjectID=".$id;
} else {
    $where ='WHERE Project_Transaction.ProjectID='.$id;
}

$sql = "SELECT Project_Transaction.ID, Resource_ID as resid, ProjectID as pid, name, email, Designations.Designation as desg, Entry_Date as ed, Effort_Spent as es, Percentage_Completed as pc FROM Project_Transaction JOIN Consultants ON Project_Transaction.Resource_ID=Consultants.ID JOIN Designations ON Consultants.designation=Designations.ID ".$where." ORDER BY ".$sortName." ".$sortOrder." LIMIT ". $page*$rp;
// echo $sql;
$sqlTot = "SELECT COUNT(*) AS total FROM Project_Transaction JOIN Consultants ON Project_Transaction.Resource_ID=Consultants.ID WHERE Project_Transaction.ProjectID=".$id;
$totalq = mysqli_query($conn, $sqlTot);
$total = mysqli_fetch_assoc($totalq);
$total = $total["total"];
$result = mysqli_query($conn, $sql);
$data = array();
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        array_push($data, array(
            "id"=> $row["ID"],
            "cell" => array($row["ID"], $row["resid"], $row["pid"], $row["name"], $row["email"], $row["desg"], $row["ed"], $row["es"], $row["pc"])
        ));
    }
}

$json_data = array(
    "page" => $page,
    "total" => intval($total),
    "rows" => $data
);

  // $queryRecords = mysqli_query($db, $sql);

// while( $row = mysqli_fetch_assoc($queryRecords) ) { 
//     $data[] = $row;
//     echo "<pre>";print_R($data);die;
// }
// $json_data = array(
//     "page"            => $page,   
//     "total"    => intval($qtot->num_rows),
//     "rows"            => $data   // total data array
// );

// return $json_data;





header("Content-Type: application/json");
echo json_encode($json_data);
mysqli_close($conn);
?>