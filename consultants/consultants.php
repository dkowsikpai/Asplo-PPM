<?php

include("../config/connection.php");

$db = connection();





header("Content-Type: application/json");
echo json_encode("here");
?>