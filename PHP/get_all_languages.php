<?php
header("content-type: none");
require_once "configuration.php";
/* Perform query */
$query = "SELECT * FROM languages limit 10";
$statement = $db->prepare($query);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();