<?php

 require_once 'session.php';
 require_once "configuration.php";
 require_once 'validate.php';
//array to hold errors
 $form_errors = array();
//validate
 $required_fields = array('loginUsername', 'loginPassword');
 $form_errors = array_merge($form_errors, check_empty_fields($required_fields));
 if (count($form_errors) > 0)
     {
     $query = "SELECT bought, sess_id from active_users where user_id = 0 order by id desc limit 1";
     $statement = $db->prepare($query);
     $statement->execute();
     $results = $statement->fetchAll(PDO::FETCH_ASSOC);
     $json = json_encode($results);
     echo $json;
     $statement->closeCursor();
     } else
     {
//collect form data
     $username = $_POST['loginUsername'];
     $password = $_POST['loginPassword'];

//check if user exist in the database
     $query = "SELECT * FROM users WHERE username = :username";
     $statement = $db->prepare($query);
     $statement->bindValue(':username', $username);
     $statement->execute();
     $row = $statement->fetch();
     $statement->closeCursor();

     $id = $row['user_id'];
     $u_perm = $row['u_permission'];

//Get hashed password.
     $hashed_password = $row['password'];
//Get username ((security feature))
     $username = $row['username'];

     $browser = $_SERVER['HTTP_USER_AGENT'];
     $ipaddr = $_SERVER['REMOTE_ADDR'];
     if (password_verify($password, $hashed_password))
         {
         

         
         
         session_start();
         $_SESSION['u_permission'] = $u_perm;
         $_SESSION['id'] = $id;
         $_SESSION['counter'] ++;
         $_SESSION['username'] = $username;
         $_SESSION['browser'] = $browser;
         $_SESSION['ipaddr'] = $ipaddr;

         $session_id = session_id();

         $query = "SELECT EXISTS(
         SELECT *
         FROM user_courses
         WHERE user_id =  :user_id) as result";
         $statement = $db->prepare($query);
         $statement->bindValue(':user_id', $id);
         $statement->execute();
         $result = $statement->fetch(PDO::FETCH_ASSOC);
         $statement->closeCursor();

//echo $result['result'];

         if ($result['result'] == "1")
             {
             $query = "INSERT INTO active_users (user_id, sess_id, bought) VALUES (:user_id, :sess_id, 1)";
             $statement = $db->prepare($query);
             $statement->bindValue(':user_id', $id);
             $statement->bindValue(':sess_id', $session_id);
             $statement->execute();
             $statement->closeCursor();

             $query = "SELECT bought, sess_id from active_users where user_id = :user_id order by id desc limit 1";
             $statement = $db->prepare($query);
             $statement->bindValue(':user_id', $id);
             $statement->execute();
             $results = $statement->fetchAll(PDO::FETCH_ASSOC);
             $json = json_encode($results);
             echo $json;
             $statement->closeCursor();
             } 
             else if ($result['result'] == "0")
             {
             $query = "INSERT INTO active_users (user_id, sess_id, bought, expiry) VALUES (:user_id, :sess_id, 0, DATE_ADD(NOW(), INTERVAL 30 MINUTE))";
             $statement = $db->prepare($query);
             $statement->bindValue(':user_id', $id);
             $statement->bindValue(':sess_id', $session_id);
             $statement->execute();
             $statement->closeCursor();

             $query = "SELECT bought, sess_id from active_users where user_id = :user_id order by id desc limit 1";
             $statement = $db->prepare($query);
             $statement->bindValue(':user_id', $id);
             $statement->execute();
             $results = $statement->fetchAll(PDO::FETCH_ASSOC);
             $json = json_encode($results);
             echo $json;
             $statement->closeCursor();
             }
         }
          else
         {
         $query = "SELECT bought, sess_id from active_users where user_id = 0 order by id desc limit 1";
         $statement = $db->prepare($query);
         $statement->execute();
         $results = $statement->fetchAll(PDO::FETCH_ASSOC);
         $json = json_encode($results);
         echo $json;
         $statement->closeCursor();
         }
   
     }