<?php

include("../config/connection.php");

$conn = connection();

$sql = "SELECT Consultants.ID, name, phone, email, presentAddress, pAddress, Designations.designation, highest_edu, experience FROM Consultants JOIN Designations ON Consultants.designation = Designations.ID ORDER BY name ASC";
$result = mysqli_query($conn, $sql);
$colheader = '';
$colheader .= "Consultant ID" ."\t"."Name" ."\t"."Phone" ."\t"."Email" ."\t"."Designation"."\t"."Present Address" ."\t"."Permanant Address" ."\t"."Highest Education Qualification" ."\t"."Experience";
$setData = '';
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $setData .= $row["ID"]."\t".
                    $row["name"]."\t".
                    $row["phone"]."\t".
                    $row["email"]."\t".
                    $row["designation"]."\t".
                    str_replace("\n", " ", $row["presentAddress"])."\t".
                    str_replace("\n", " ", $row["pAddress"])."\t".
                    $row["experience"]."\t".
                    $row["highest_edu"]."\n";
    }
}

// echo $setData;

header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename=Consultants.xls");  
header("Pragma: no-cache");  
header("Expires: 0");  

echo ucwords($colheader) . "\n" . $setData . "\n";
mysqli_close($conn);
?>