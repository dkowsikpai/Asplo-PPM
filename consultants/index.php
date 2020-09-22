<?php
session_start();
if (!isset($_SESSION["login"])){
    header("Location: ../");
}
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../assets/css/menu.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/css/jsGrid/jsgrid.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/css/jsGrid/jsgrid-theme.css" rel="stylesheet" type="text/css"/>
    <title>Open PPM | Consultants</title>
</head>
<body>
    <?php
        include('../dashboard/navbar/menu.php');
        navBar();
    ?>
    <main>
        <div class="current-nav">
            Open PPM / Consultants
        </div>
        <div class="grid">
            <div id="jsGrid"></div>
        </div>
    </main>
</body>
<script src="../assets/js/jquery-3.5.1.min.js" type="text/javascript"></script>
<script src="../assets/js/jsGrid/jsgrid.js" type="text/javascript"></script>
<script src="../assets/js/consultants.js" type="text/javascript"></script>
</html>