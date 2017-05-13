<?php
require_once "configuration.php";
/* Perform query */
$sess_id = filter_input(INPUT_POST, "sess_id");
$query = "SELECT l.cID, l.cName, l.cPrice, l.cSmallDesc, l.cFullDesc, l.image FROM languages l, user_courses uc , active_users au where l.cID = uc.course_id AND uc.user_id = (select user_id from active_users where sess_id = :sess_id) group by l.cID";
$statement = $db->prepare($query);
$statement->bindValue(':sess_id', $sess_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();