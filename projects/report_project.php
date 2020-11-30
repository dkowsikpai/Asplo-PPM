<?php
include("../config/connection.php");

$conn = connection();
require('../plugins/fpdf.php');

$id = $_GET["id"];

class PDF extends FPDF {
    function Header() {
        global $title;

        // Arial bold 15
        $this->SetFont('Arial','B',15);
        // Calculate width of title and position
        $w = $this->GetStringWidth($title)+6;
        $this->SetX((210-$w)/2);
        // Colors of frame, background and text
        $this->SetDrawColor(255,255,255);
        $this->SetFillColor(255,255,255);
        $this->SetTextColor(0,0,0);
        // Thickness of frame (1 mm)
        $this->SetLineWidth(1);
        // Title
        $this->Cell($w,9,$title,1,1,'C',true);
        // Line break
        $this->Ln(10);
    }

    // function BasicTable($header, $data) {
    //     // Header
    //     foreach($header as $col)
    //         $this->Cell(40,7,$col,1);
    //     $this->Ln();
    //     // Data
    //     foreach($data as $row)
    //     {
    //         foreach($row as $col)
    //             $this->Cell(40,6,$col,1);
    //         $this->Ln();
    //     }
    // }


    function Footer() {
        // Position at 1.5 cm from bottom
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','',8);
        // Text color in gray
        $this->SetTextColor(0, 0, 0);
        // Page number
        $this->Cell(0,10,''.$this->PageNo(),0,0,'C');
    }
}
$pdf = new PDF();
// $pdf->AddPage();

$sql = "SELECT Projects.ID as pid, Title as title, Description as decr, CustomerID as cid, PM as pm, project_status(status) as stat, estimated_effort as est_eff, estimated_cost as est_cost, pCompleted as per, Start_Date as st_date, Finish_Date as fi_date, Customers.Name as c_name, Consultants.name as pm_name, Customers.phone as c_phone, Customers.email as c_email, Consultants.phone as pm_phone, Consultants.email as pm_email FROM Projects JOIN Consultants ON Projects.PM=Consultants.ID JOIN Customers ON Projects.CustomerID=Customers.ID WHERE Projects.ID=$id LIMIT 1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $title = 'Open-PPM Project Report: '.$row["title"];
        $pdf->SetMargins(25.4, 25.4, 25.4);
        $pdf->SetTitle($title);
        $pdf->AddPage();
        // ----------------------------------
        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Project Description:')+6;
        $pdf->Cell($w1,5,"Project Description:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["decr"])+6;
        $pdf->MultiCell(0,5, $row["decr"]);
        $pdf->Ln(10);
        // ----------------------------------
        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Percentage Completed:')+6;
        $pdf->Cell($w1,5,"Percentage Completed:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["per"]."%")+6;
        $pdf->Cell($w1,5, $row["per"]."%",0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Status:')+6;
        $pdf->Cell($w1,5,"Status:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["stat"])+6;
        $pdf->Cell($w1,5, $row["stat"],0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------


        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Estimated Cost:')+6;
        $pdf->Cell($w1,5,"Estimated Cost:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["est_cost"]." INR")+6;
        $pdf->Cell($w1,5, $row["est_cost"]." INR",0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Estimated Effort:')+6;
        $pdf->Cell($w1,5,"Estimated Effort:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["est_eff"]." Hours")+6;
        $pdf->Cell($w1,5, $row["est_eff"]." Hours",0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Start Date:')+6;
        $pdf->Cell($w1,5,"Start Date:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["st_date"])+6;
        $pdf->Cell($w1,5, $row["st_date"],0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Finish Date:')+6;
        $pdf->Cell($w1,5,"Finish Date:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["fi_date"])+6;
        $pdf->Cell($w1,5, $row["fi_date"],0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Customer Name:')+6;
        $pdf->Cell($w1,5,"Customer Name:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["c_name"])+6;
        $pdf->Cell($w1,5, $row["c_name"],0,0,'L',false);

        $pdf->Ln(10);
        // ----------------------------------
        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Customer Email:')+6;
        $pdf->Cell($w1,5,"Customer Email:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["c_email"])+6;
        $pdf->Cell($w1,5, $row["c_email"],0,0,'L',false);
        $pdf->Ln(10);
        // ----------------------------------
        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Customer Phone:')+6;
        $pdf->Cell($w1,5,"Customer Phone:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["c_phone"])+6;
        $pdf->Cell($w1,5, $row["c_phone"],0,0,'L',false);
        $pdf->Ln(10);
        // ----------------------------------
        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('Project Manager:')+6;
        $pdf->Cell($w1,5,"Project Manager:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["pm_name"])+6;
        $pdf->Cell($w1,5, $row["pm_name"],0,0,'L',false);
        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('PM Email:')+6;
        $pdf->Cell($w1,5,"PM Email:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["pm_email"])+6;
        $pdf->Cell($w1,5, $row["pm_email"],0,0,'L',false);
        $pdf->Ln(10);
        // ----------------------------------

        $pdf->SetFont('Arial','',12);
        $w1 = $pdf->GetStringWidth('PM Phone:')+6;
        $pdf->Cell($w1,5,"PM Phone:");

        $x=$pdf->GetX();
        $y=$pdf->GetY();
        $pdf->SetXY($x,$y);

        $pdf->SetFont('Arial','B',12);
        $w1 = $pdf->GetStringWidth($row["pm_phone"])+6;
        $pdf->Cell($w1,5, $row["pm_phone"],0,0,'L',false);
        $pdf->Ln(10);
        // ----------------------------------
    }
}



$pdf->Output();
mysqli_close($conn);
?>