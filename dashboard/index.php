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
    <link href="../assets/css/dashboard.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/css/jqPlot/jquery.jqplot.min.css" rel="stylesheet" type="text/css"/>
    <title>Open PPM | Dashboard</title>
</head>
<body>
    <?php
        include('./navbar/menu.php');
        navBar();
    ?>
    <main>
        <!-- <div class="project-selector-div">
            <select id="project_selector" class="project-selector"></select>
        </div> -->
        <div class="chart-frame">
            <div class="chart-row">
                <div class="chart-panel" id="chart_1">
                    <!-- 1 -->
                </div>
                <div class="chart-panel" id="chart_2">
                    <!-- 2 -->
                </div>
                <div class="chart-panel" id="chart_3">
                    <!-- 3 -->
                </div>
            </div>
            <div class="chart-row">
                <div class="chart-panel" id="chart_4">
                    <!-- 4 -->
                </div>
                <div class="chart-panel" id="chart_5">
                    <!-- 5 -->
                </div>
                <div class="chart-panel" id="chart_6">
                    <!-- 6 -->
                </div>
            </div>
        </div>
        
    </main>
</body>
<script src="../assets/js/jqPlot/jquery.min.js" type="text/javascript"></script>
<script src="../assets/js/jquery.alerts.js" type="text/javascript"></script>
<script type="text/javascript" src="../assets/js/jqPlot/jquery.jqplot.min.js"></script>

<script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.barRenderer.js"></script>
<!-- <script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.pieRenderer.min.js"></script> -->
<script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.categoryAxisRenderer.min.js"></script>
<script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.pointLabels.min.js"></script>
<script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>

<script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.canvasTextRenderer.js"></script>
  <script class="include" type="text/javascript" src="../assets/js/jqPlot/plugins/jqplot.canvasAxisLabelRenderer.js"></script>

<script type="text/javascript" src="../assets/js/dashboard.js"></script>

</html>