<?php
require_once "configuration.php";
/* Perform query */
$query = "DELETE FROM active_users WHERE bought = 0 && expiry < NOW()";
$statement = $db->prepare($query);
$statement->execute();
$statement->closeCursor();