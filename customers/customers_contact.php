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
    $where = "WHERE ".$qtype." LIKE '%".$query."%' AND Contacts.CustomerID =".$id;
} else {
    $where ='WHERE Contacts.CustomerID='.$id;
}

$sql = "SELECT ID, Conatct_Person as cp, phone, mobile, Email, profile_desc FROM Contacts ".$where." ORDER BY ".$sortName." ".$sortOrder." LIMIT ". $page*$rp;
// echo $sql;
$sqlTot = "SELECT COUNT(*) AS total FROM Contacts WHERE Contacts.CustomerID =".$id;
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
            "cell" => array($row["ID"], $row["cp"], $row["phone"], $row["mobile"], $row["Email"], $row["profile_desc"])
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