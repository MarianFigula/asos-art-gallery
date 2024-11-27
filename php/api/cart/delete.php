<?php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "DELETE") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Use DELETE to delete cart data."
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->cart_id)) {
    http_response_code(400);
    echo json_encode(["message" => "Cart ID is required and should be a number."]);
    exit;
}

$cart->setId($data->cart_id);

// TODO: if user will be deleted, uncomment code below

//if ($cart->deleteCartById()) {
//    echo json_encode([
//        "success" => true,
//        "message" => "Cart deleted successfully."
//    ]);
//} else {
//    echo json_encode([
//        "success" => false,
//        "message" => "Failed to delete cart."
//    ]);
//    http_response_code(500);
//}

?>
