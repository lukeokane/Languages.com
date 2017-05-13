<?php
require_once "configuration.php";
/* Perform query */
$course_id = filter_input(INPUT_POST, "course_id");
$cName = filter_input(INPUT_POST, "cName");
$cSmallDesc = filter_input(INPUT_POST, "cSmallDesc");
$cFullDesc = filter_input(INPUT_POST, "cFullDesc");
$query = "UPDATE languages SET cName = :cName, cSmallDesc = :cSmallDesc, cFullDesc = :cFullDesc where cID = :course_id";
$statement = $db->prepare($query);
$statement->bindValue(':course_id', $course_id);
$statement->bindValue(':cName', $cName);
$statement->bindValue(':cSmallDesc', $cSmallDesc);
$statement->bindValue(':cFullDesc', $cFullDesc);
$statement->execute();
$statement->closeCursor();

echo 1;