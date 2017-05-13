<?php
require_once "configuration.php";
/* Perform query */
$sess_id = filter_input(INPUT_POST, "sess_id");
$course_id = filter_input(INPUT_POST, "course_id");
$query = "UPDATE user_courses SET current_user_sess_id = NULL WHERE user_id = (select user_id from active_users where sess_id = :sess_id) AND course_id = :course_id";
$statement = $db->prepare($query);
$statement->bindValue(':sess_id', $sess_id);
$statement->bindValue(':course_id', $course_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();