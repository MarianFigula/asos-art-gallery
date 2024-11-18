<?php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];
$cart_id = isset($_GET['id']) ? $_GET['id'] : null;

if ($method !== "DELETE") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Use DELETE to delete cart data."
    ]);
    exit();
}

if ($cart_id == null || !is_numeric($cart_id)) {
    echo json_encode(["message" => "Cart ID is required and should be a number."]);
    http_response_code(400); // Bad Request
    exit;
}

$cart->setId($cart_id);
if ($cart->deleteCartById()) {
    echo json_encode([
        "success" => true,
        "message" => "Cart deleted successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete cart."
    ]);
    http_response_code(500);
}

?>
