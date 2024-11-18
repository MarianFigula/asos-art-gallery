<?php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];

$cart_id = isset($_GET['id']) ? $_GET['id'] : null;

if ($method !== "PUT" && $method !== "PATCH") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Use PUT or PATCH to update cart data."
    ]);
    exit();
}

if ($cart_id == null || !is_numeric($cart_id)) {
    echo json_encode(["message" => "Cart ID is required and should be a number."]);
    http_response_code(400);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->art_ids) || !is_array($data->art_ids)) {
    echo json_encode(["message" => "Art IDs are required and should be an array."]);
    http_response_code(400);
    exit;
}

$cart->setId($cart_id);

$newArtIds = $data->art_ids;

if ($cart->updateCartById($newArtIds)) {
    echo json_encode([
        "success" => true,
        "message" => "Cart updated successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update cart."
    ]);
    http_response_code(500);
}

?>
