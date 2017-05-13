<?php
require_once "configuration.php";
/* Perform query */
$ID = filter_input(INPUT_POST, "ID");
$query = "SELECT * FROM languages where cID = :ID";
$statement = $db->prepare($query);
$statement->bindValue(':search_input', $ID);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();