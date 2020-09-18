<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./css/login.css" rel="stylesheet" type="text/css"/>
    <title>Open PPM | Login</title>
</head>
<body>
    <div class="main">
        <form method="POST" action="login.php" class="login">
            <div class="title">
                <h1>Open PPM</h1>
            </div>
            <input type="text" placeholder="Username" name="username" maxlength="200"/>
            <input type="password" placeholder="Password" name="password" maxlength="200"/>
            <button type="submit" class="login-btn">Login</button>
        </form>
    </div>
</body>
</html>