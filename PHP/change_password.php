<?php

require_once 'configuration.php';
require_once 'validate.php';
//array to hold errors
    $form_errors = array();
//validate
    $required_fields = array('currentPassInput', 'newPass');
    $form_errors = array_merge($form_errors, check_empty_fields($required_fields));
//collect form data
$currentPassInput = $_POST['currentPassInput'];
$newPass = $_POST['newPass'];
$sess_id = $_POST['sess_id'];

//check if user exist in the database
$query = "SELECT user_id, password FROM users WHERE user_id = (select user_id from active_users where sess_id = :sess_id)";
$statement = $db->prepare($query);
$statement->bindValue(':sess_id', $sess_id);
$statement->execute();
$row = $statement->fetch();
$statement->closeCursor();

//Get hashed password.
$hashed_password = $row['password'];
//Get user id
$user_id = $row['user_id'];

if (password_verify($currentPassInput, $hashed_password)) {
//Hash the password
    $options = [
        'cost' => 12,
        'salt' => mcrypt_create_iv(29, MCRYPT_DEV_URANDOM),
    ];
    $newPass = password_hash($newPass, PASSWORD_BCRYPT, $options);
   $query = "UPDATE users SET password = :newPass where user_id = :user_id";
   $statement = $db->prepare($query);
    $statement->bindValue(':user_id', $user_id);
       $statement->bindValue(':newPass', $newPass);
$statement->execute();
$statement->closeCursor();
    echo 1;
   
} else {
    echo 0;
}
