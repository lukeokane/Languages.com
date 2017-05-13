<?php
require_once 'configuration.php';
require_once 'validate.php';


//Initialise an array to store error messages
$form_errors = array();

$required_fields = array('registerEmail', 'registerUsername', 'registerPassword');

$check1 = check_empty_fields($required_fields);
//Call the function to check empty field and merge the return data into form_error array
if (count($check1) != 0)
{
array_push($form_errors, $check1);
}

//Fields that need to be checked
$fields_to_check_length = array('registerUsername' => 6, 'registerPassword' => 8);

$check2 = check_min_length($fields_to_check_length);
//Call the function to check minimum required length and merge the return data into form_error array
if (count($check2) != 0)
{
array_push($form_errors, $check2);
}

$check3 = check_email(filter_input(INPUT_POST, "registerEmail", FILTER_SANITIZE_EMAIL));

if ((count($check3) != 0))
{
//email validation and merge the return data into form_error array
    array_push($form_errors, $check3);
}

$check4 = valid_password("registerPassword");
if ((count($check4) != 0))
{
    array_push($form_errors, $check4);
}


//array_push($form_errors, "hello");

if (empty($form_errors)) {

    $email = filter_input(INPUT_POST, "registerEmail", FILTER_SANITIZE_EMAIL);
    $username = filter_input(INPUT_POST, "registerUsername", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "registerPassword", FILTER_SANITIZE_STRING);

//Hash the password
    $options = [
        'cost' => 12,
        'salt' => mcrypt_create_iv(29, MCRYPT_DEV_URANDOM),
    ];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT, $options);


    $adminUpdateQuery = 'INSERT INTO users (email, username, password, join_date, u_permission) VALUES (:email, :username, :password, now(), 0)';
    $updateAdmin = $db->prepare($adminUpdateQuery);
    $updateAdmin->bindValue(':password', $hashed_password);
    $updateAdmin->bindValue(':email', $email);
    $updateAdmin->bindValue(':username', $username);
    $updateAdmin->execute();
    $admin = $updateAdmin->fetch();
    $updateAdmin->closeCursor();

    echo 'success';
    include('index.php');
} else {
    echo 'error';
    echo '<br>';
    echo $email;
        echo '<br>';
    echo $username;
        echo '<br>';
    echo $password;
        echo '<br>';
        }

?>
