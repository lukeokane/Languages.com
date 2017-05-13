<?php
require_once 'configuration.php';
$sess_id = $_POST['sess_id'];
$image_name = $_POST['image_name'];
$image_content = $_POST['image_content'];
if (isset($_POST['image_content']))
{
if (getimagesize($FILES['image']['tmp_name']) == FALSE)
{
 echo -1;
}
else
{
$image = addslashes($_FILES['image']['tmp_name']);
$name = addslahses($_FILES['image']['name']);
$image = file_get_contents($image);
$image = base64_encode($image);
}
function saveImage($name, $image)
{
$query = "UPDATE users SET image_name = :image_name, image_content = :image_content where user_id = (select user_id from active_users where sess_id = :sess_id)";
$statement = $db->prepare($query);
$statement->bindValue(':clubID', $clubID);
$statement->execute();
$statement->closeCursor();
}


}
?>