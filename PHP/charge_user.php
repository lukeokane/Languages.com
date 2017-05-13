
<?php

require_once('vendor/autoload.php');

\Stripe\Stripe::setApiKey("sk_test_vZspn15dmefbj02zeeJNyVQy");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
$token = $_POST['stripeToken'];
$amount = $_POST['amount'];
$description = $_POST['desc'];

// Charge the user's card:
$charge = \Stripe\Charge::create(array(
  "amount" => $amount,
  "currency" => "eur",
  "description" => $description,
  "source" => $token,
));

?>