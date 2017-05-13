<?php
require_once 'configuration.php';
$sess_id = $_POST['sess_id'];
$course_id= $_POST['course_id'];

$query = "INSERT INTO user_courses (user_id, course_id, current_lesson) VALUES ((select user_id from active_users where sess_id = :sess_id), :course_id, 0)";

$statement = $db->prepare($query);
             $statement->bindValue(':sess_id', $sess_id);
             $statement->bindValue(':course_id', $course_id);
             $statement->execute();
             $statement->closeCursor();

session_start();
    $_SESSION['u_permission'] = $u_perm;
    $_SESSION['id'] = $id;
    $_SESSION['counter']++;
    $_SESSION['username'] = $username;
    $_SESSION['browser'] = $browser;
    $_SESSION['ipaddr'] = $ipaddr;
    
    $session_id = session_id();
    
    $query = "INSERT INTO active_users (user_id, sess_id, bought) VALUES (:user_id, :sess_id, 1)";
$statement = $db->prepare($query);
$statement->bindValue(':user_id', $id);
$statement->bindValue(':sess_id', $session_id);
$statement->execute();
$statement->closeCursor();


?>