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
    <title>Open PPM | Technologies</title>

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
        
    
    .flexigrid div.fbutton .category
        {
            background: url("../assets/flexgrid/images/category.png") no-repeat center left;
        }

    .flexigrid div.fbutton .offer
    {
        background: url("../assets/flexgrid/images/offer.png") no-repeat center left;
    }

    .flexigrid div.fbutton .offer-settings
    {
        background: url("../assets/flexgrid/images/offer_settings.png") no-repeat center left;
    }

    .flexigrid div.fbutton .offer-filter
    {
        background: url("../assets/flexgrid/images/filter.png") no-repeat center left;
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
            Open PPM / Technologies
        </div>
        <div class="grid">
            <table class="flex-grid-div" id="tech_flex" style="display:none"></table>
        </div>
    </main>
    <div class="sidepanel hide" id="sidepanel_tech">
        <img src="../assets/images/close.png" class="sidepanel-close" onclick="close_sidepanel()"/>
        <div class="sidepanel-frame" id="sidepanel_tech_contents">
            <!-- Add the contents to this frame -->
        </div>
    </div>
</body>
<script src="../assets/js/jquery.js" type="text/javascript"></script>
<script src="../assets/js/jquery.alerts.js" type="text/javascript"></script>
<script src="../assets/js/technologies.js" type="text/javascript"></script>
<script type="text/javascript" src="../assets/flexgrid/flexigrid.js"></script>
<script type="text/javascript">
function close_sidepanel(){
    $('#sidepanel_tech').removeClass('show').addClass('hide');    
}
</script>

</html>