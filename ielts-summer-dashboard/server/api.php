<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$jsonString = file_get_contents(__DIR__ . '/data.json');
echo $jsonString;
?>
