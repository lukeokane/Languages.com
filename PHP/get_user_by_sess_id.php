<?php
require_once "configuration.php";
/* Perform query */
$sess_id = filter_input(INPUT_POST, "sess_id");
$query = "SELECT username, email, join_date from users WHERE user_id = (select user_id from active_users where sess_id = :sess_id)";
$statement = $db->prepare($query);
$statement->bindValue(':sess_id', $sess_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();