<?php
require_once "configuration.php";
/* Perform query */
$query = "UPDATE user_courses SET current_user_sess_id = NULL, expiry = NULL where expiry < NOW()";
$statement = $db->prepare($query);
$statement->execute();
$statement->closeCursor();
?>