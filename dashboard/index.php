<?php
    session_start();

    if (!isset($_SESSION["login"])){
        header("Location: ../");
    }

    // include('../config/connection.php');
    // connection();
    // session_register("userType");
    $_SESSION["userType"] = "sss";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../assets/css/menu.css" rel="stylesheet" type="text/css"/>
    <title>Open PPM | Dashboard</title>
</head>
<body>
    <?php
        include('./navbar/menu.php');
        navBar();
    ?>
    <main>
        Hi 
        <?php
            echo $_SESSION["userType"];
        ?>
    </main>
</body>
</html>