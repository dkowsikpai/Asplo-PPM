<!DOCTYPE html>
<?php
session_start();

// if (!isset($_SESSION["login"])){
//     header("Location: ../");
// }
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
<header class="menu">
        <span class="menu-title">
            Open PPM
        </span>
        <span class="menu-item">
            Dashboard
        </span>
        <a href="/ppm/consultants/"><span class="menu-item">
            Consultants
        </span></a>
        <span class="menu-item">
            Customers
        </span>
        <span class="menu-item">
            Projects
        </span>
        <div class="dropdown">
            <button class="dropbtn">
                <span class="menu-avatar">
                    <img src="../assets/images/avatar.svg" alt="Avatar"/>
                </span>
            </button>
            <div class="dropdown-content">
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="<?php session_destroy(); ?>">Logout</a>
            </div>
          </div>          
    </header>
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