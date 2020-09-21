<!DOCTYPE html>
<?php
session_start();
if (isset($_SESSION["login"])){
    header("Location: ./dashboard");
}
?>

<?php 
if (isset($_POST['login'])) {
  include('./auth/index.php');
  include('./config/connection.php');
  $conn = connection();
  if (userAuthertication($_POST['username'], $_POST['password'], $conn)) {
      $_SESSION["userType"] = "superUser";
      $_SESSION["login"] = true;
      $_SESSION["username"] = $_POST['username'];
      $_SESSION["password"] = $_POST['password'];
    //   $_SESSION["UserID"] = $superuserData['SuperUserID'];
    //   $_SESSION["name"] = $superuserData['name'];
      header("Location: ./dashboard");

  }else{
    echo "Their is no user";
  }
  
}

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./assets/css/login.css" rel="stylesheet" type="text/css"/>
    <title>Open PPM | Login</title>
</head>
<body>   
    <div class="main">
        <form method="POST" action="" class="login">
            <div class="title">
                <h1>Open PPM</h1>
            </div>
            <label for="username_inp">Username</label>
            <input type="text" placeholder="Username" name="username" id="username_inp" maxlength="200"/>
            <label for="username_inp">Password</label>
            <input type="password" placeholder="Password" name="password" id="password_inp" maxlength="200"/>
            <small>Enter your password secretly</small>
            <input type="submit" name="login" class="login-btn" value="Login"/>
        </form>
        <div class="side-img">
            <img src="./assets/images/login.jpg" alt=""/>
        </div>
    </div>
</body>
</html>