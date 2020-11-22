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
    <link href="../assets/css/jquery.alerts.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="../assets/flexgrid/flexigrid.css">
    <title>Open PPM | Projects</title>

    <style>
        
    .flexigrid div.fbutton .add
        {
            background: url("../assets/flexgrid/images/add.png") no-repeat center left;
        }	

    .flexigrid div.fbutton .delete
        {
            background: url("../assets/flexgrid/images/close.png") no-repeat center left;
        }
        
    .flexigrid div.fbutton .edit
        {
            background: url("../assets/flexgrid/images/edit.png") no-repeat center left;
        }
    .flexigrid div.fbutton .technology
    {
        background: url("../assets/images/Projects/cpu.png") no-repeat center left;
    }
    .flexigrid div.fbutton .resource
    {
        background: url("../assets/images/Projects/resource.png") no-repeat center left;
    }
    .flexigrid div.fbutton .transaction
    {
        background: url("../assets/images/Projects/transaction.png") no-repeat center left;
    }

</style>
</head>
<body>
    <?php
        include('../dashboard/navbar/menu.php');
        navBar();
    ?>
    <main>
        <div class="current-nav"> 
            Open PPM / Projects
        </div>
        <div class="grid">
            <table class="flex-grid-div" id="projects_flex" style="display:none"></table>
        </div>
    </main>
    <div class="sidepanel hide" id="sidepanel_projects">
        <img src="../assets/images/close.png" class="sidepanel-close" onclick="close_sidepanel()"/>
        <div class="sidepanel-frame" id="sidepanel_projects_contents">
            <!-- Add the contents to this frame -->
        </div>
    </div>

    <div class="sidepanel second hide" id="sidepanel_second_projects">
        <img src="../assets/images/close.png" class="sidepanel-close" onclick="close_sidepanel_second()"/>
        <div class="sidepanel-frame" id="sidepanel_projects_contents">
            <!-- Add the contents to this frame -->
        </div>
    </div>
</body>
<script src="../assets/js/jquery.js" type="text/javascript"></script>
<script src="../assets/js/jquery.alerts.js" type="text/javascript"></script>
<script src="../assets/js/projects.js" type="text/javascript"></script>
<script src="../assets/js/project_tech.js" type="text/javascript"></script>
<script src="../assets/js/project_res.js" type="text/javascript"></script>
<script type="text/javascript" src="../assets/flexgrid/flexigrid.js"></script>
<script type="text/javascript">
function close_sidepanel(){
    $('#sidepanel_projects').removeClass('show').addClass('hide');    
}

function close_sidepanel_second(){
    $('#sidepanel_second_projects').removeClass('show').addClass('hide');    
}
</script>

</html>