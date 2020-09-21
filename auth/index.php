<?php

// include($_SERVER['DOCUMENT_ROOT'].'/ppm/config/encrypt.php');

$username = "dkowsikpai";
$password = "a";

function userAuthertication($uname, $pword, $conn) {
    // echo $GLOBALS['username']." - ".$pword;
    $enc_password = hash('sha512', $pword);
    // echo $enc_password;
    $sql = "SELECT ID FROM Users WHERE username='$uname' AND password='$enc_password' AND active=TRUE";
    $result = $conn->query($sql);
    // echo $result->error;
    if ($result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}

?>