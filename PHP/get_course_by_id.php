<?php
require_once "configuration.php";
/* Perform query */
$course_id = filter_input(INPUT_POST, "course_id");
$query = "SELECT cID, cName, cPrice, cSmallDesc, cFullDesc, image FROM languages l where l.cID = :course_id";
$statement = $db->prepare($query);
$statement->bindValue(':course_id', $course_id);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();