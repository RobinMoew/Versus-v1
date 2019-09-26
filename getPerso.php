<?php
include_once("co.php");
header("Access-Control-Allow-Origin: *");

$idVersus = $_POST['idVersus'];
$idSelf = $_POST['idSelf'];

$sql = $co->prepare("SELECT * FROM versus WHERE id=? OR id=?");
$sql->bind_param('ii',$idVersus,$idSelf);
$sql->execute();

$bdd_id = null;
$bdd_nom = null;
$bdd_pv = null;
$bdd_pa = null;
$bdd_img = null;
$sql->bind_result($bdd_id, $bdd_nom, $bdd_pv, $bdd_pa, $bdd_img);

$output = [];
while($sql->fetch()) {
  $output[] = [
    'id' => $bdd_id,
    'nom' => $bdd_nom,
    'pv' => $bdd_pv,
    'pa' => $bdd_pa,
    'url' => $bdd_img
  ];
}
echo json_encode($output);
$sql->close();
$co->close();
?>