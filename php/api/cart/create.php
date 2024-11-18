<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"));

if ($method == "GET"){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."]);
    exit();
}

if (!isset($data->user_id) || !isset($data->art_ids) || !is_array($data->art_ids)) {
    echo json_encode(["message" => "Invalid input. User ID and Art IDs are required."]);
    http_response_code(400);
    exit;
}

$cart->setUserId($data->user_id);

$artIds = $data->art_ids;

if ($cart->createCart($artIds)) {
    echo json_encode(array("message" => "Cart created successfully"));
} else {
    echo json_encode(array("message" => "Failed to create cart"));
}

http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "Cart successfully created."
]);

?>