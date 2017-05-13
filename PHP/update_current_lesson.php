<?php
require_once "configuration.php";
/* Perform query */
$sess_id = $_POST['sess_id'];
$course_id= $_POST['course_id'];
$lesson_id = $_POST['lesson_id'];
$query = "UPDATE user_courses SET current_lesson = :lesson_id WHERE user_id = (SELECT user_id from active_users WHERE sess_id = :sess_id) AND course_id = :course_id";
$statement = $db->prepare($query);
$statement->bindValue(':lesson_id', $lesson_id);
             $statement->bindValue(':sess_id', $sess_id);
             $statement->bindValue(':course_id', $course_id);
$statement->execute();
$statement->closeCursor();