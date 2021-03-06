<?php


$dsn = 'mysql:host=redacted;dbname=redacted';
$username = 'redacted';
$password = 'redacted';


try {

    //create an instance of the PDO class with the required parameters
    $db = new PDO($dsn, $username, $password);

    //set error mode to exception
    $db->setAttribute(PDO::ERRMODE_SILENT, PDO::ATTR_EMULATE_PREPARES);
    error_reporting(0);

} catch (PDOException $ex) {
    $error_message = $ex->getMessage();
    echo "An error occured while connecting to the database: $error_message";
}
?>
