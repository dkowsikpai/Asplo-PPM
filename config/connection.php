<?php
function connection(){
    $servername = "localhost";
    $username = "root";
    $password = "a";
    $dbname = "ppm";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // echo "here";
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // echo "Connected successfully";
    return $conn;
    
}
?>