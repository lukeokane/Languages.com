<?php
require_once 'configuration.php';
$sess_id = $_POST['sess_id'];
$course_id= $_POST['course_id'];

$query = "INSERT INTO user_courses (user_id, course_id) VALUES ((select user_id from active_users where sess_id = :sess_id), :course_id)";

$statement = $db->prepare($query);
             $statement->bindValue(':sess_id', $sess_id);
             $statement->bindValue(':course_id', $course_id);
             $statement->execute();
             $statement->closeCursor();
?>