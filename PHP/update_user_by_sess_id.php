<?php
require_once "configuration.php";
/* Perform query */
$user_email = filter_input(INPUT_POST, "email");
$sess_id = filter_input(INPUT_POST, "sess_id");
$query = "UPDATE users SET email = :email WHERE user_id = (select user_id from active_users where sess_id = :sess_id)";
$statement = $db->prepare($query);
$statement->bindValue(':email', $user_email);
$statement->bindValue(':sess_id', $sess_id);
$statement->execute();
$statement->closeCursor();