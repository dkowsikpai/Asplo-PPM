<?php

// include($_SERVER['DOCUMENT_ROOT'].'/ppm/config/encrypt.php');

$username = "dkowsikpai";
$password = "a";

function userAuthertication($uname, $pword, $conn) {
    // echo $GLOBALS['username']." - ".$pword;
    $enc_password = hash('sha512', $pword);
    // echo $enc_password;
    $sql = "SELECT ID FROM Users WHERE username='$uname' AND password='$enc_password' AND active=TRUE";
    $q = $conn->query($sql);
    $result = $q->fetch();
    // echo $result->error;
    if ($result) {
        return true;
    } else {
        return false;
    }
}

?>