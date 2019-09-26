<?php
header("Access-Control-Allow-Origin: *");
require "co.php";

$url = $_POST['url'];
$nom = $_POST['nom'];
$pv = $_POST['pv'];
$pa = $_POST['pa'];

if (!$url || !$nom || !$pv || !$pa) {
    echo "Il manque des informations";
    exit();
}

$req = $co -> prepare("INSERT INTO versus(nom, pv, pa, url) VALUES(?,?,?,?)");
$req -> bind_param("siis", $nom, $pv, $pa, $url);
$req -> execute();
echo "Le perso a été ajouté";

$req -> close();
$co -> close();
?>