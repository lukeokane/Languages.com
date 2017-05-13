<?php
require_once "configuration.php";
/* Perform query */
$sess_id = filter_input(INPUT_POST, "sess_id");
$course_id = filter_input(INPUT_POST, "course_id");
$query = "SELECT l.lesson_id, l.lesson_desc, uc.current_lesson from lessons l, user_courses uc WHERE l.course_id = uc.course_id AND l.course_id = :course_id AND uc.user_id = (select user_id from active_users where sess_id = :sess_id)   order by l.lesson_id asc ";
$statement = $db->prepare($query);
$statement->bindValue(':course_id', $course_id);
$statement->bindValue(':sess_id', $sess_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();