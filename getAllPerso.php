<?php
include_once("co.php");
header("Access-Control-Allow-Origin: *");

$sql = $co->prepare("SELECT id, nom, url FROM versus");
$sql->execute();

$bdd_id = null;
$bdd_nom = null;
$bdd_img = null;

$sql->bind_result($bdd_id, $bdd_nom, $bdd_img);

$output = [];

while($sql->fetch()) {
  $output[] = [
    'id' => $bdd_id,
    'nom' => $bdd_nom,
    'url' => $bdd_img
  ];
}

echo json_encode($output);

$sql->close();
$co->close();
?>