<?php

$username = $_POST["username"];
$password = $_POST["password"];

if ($username == "dkowsikpai" && $password == "a") {
    header("Location: menu.html");
} else {
    echo "Username or Password is incorrect";
}

?>