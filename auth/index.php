<?php

// include($_SERVER['DOCUMENT_ROOT'].'/ppm/config/encrypt.php');

$username = "dkowsikpai";
$password = "a";

function userAuthertication($uname, $pword, $conn) {
    // echo $GLOBALS['username']." - ".$pword;
    $enc_password = hash('sha512', $pword);
    // echo $enc_password;
    $sql = "SELECT ID FROM Users WHERE username='$uname' AND password='$enc_password' AND active=TRUE";
    $q = mysqli_query($conn, $sql);
    if (mysqli_num_rows($q) > 0) {
        return true;
    } else {
        return false;
    }
}

?>