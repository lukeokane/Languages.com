<?php
require_once "configuration.php";
/* Perform query */
$sess_id = $_POST['sess_id'];
$course_id = $_POST['course_id'];
$query = "SELECT IF(current_user_sess_id IS NULL, 0, 1) as result, current_user_sess_id as sess_id 
from user_courses WHERE user_id = (select user_id from active_users where sess_id = :sess_id ) AND course_id = :course_id";
$statement = $db->prepare($query);
             $statement->bindValue(':sess_id', $sess_id);
             $statement->bindValue(':course_id', $course_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
$statement->closeCursor();