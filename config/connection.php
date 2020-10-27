<?php
function connection(){
    $servername = "192.168.1.5";
    $username = "dinesh";
    $password = "a";
    $dbname = "ppm";

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
    // echo "Connected successfully";
    return $conn;


    // try {
    //     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    //     // set the PDO error mode to exception
    //     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //     // echo "Connected successfully";
    //     return $conn;
    //   } catch(PDOException $e) {
    //     echo "Connection failed: " . $e->getMessage();
    //   }
    
}
?>
