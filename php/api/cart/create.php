<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);
$user = new User($db);
$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"));

if ($method != "POST"){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."]);
    exit();
}

if (!isset($data->user_id)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. User ID are required."]);
    exit;
}

try {
    $cart->setUserId($data->user_id);
    $stmt = $cart->createCart();

    if ($art->createArt()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Art successfully created."
        ]);
    } else {
        throw new Exception("Failed to create art.");
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>