<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];
$cart_id = isset($_GET['id']) ? $_GET['id'] : null;

if ($method == "POST" || $method == "PUT" || $method == "DELETE") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Use GET to fetch cart data."
    ]);
    exit();
}

if ($cart_id == null || !is_numeric($cart_id)) {
    echo json_encode(["message" => "Cart ID is required and should be a number."]);
    http_response_code(400);
    exit;
}

$cart->setId($cart_id);
$stmt = $cart->getCartById();
$num = $stmt->rowCount();

if ($num > 0) {
    $cart_data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $cart_data[] = $row;
    }

    echo json_encode([
        "success" => true,
        "cart" => $cart_data
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Cart not found."
    ]);
    http_response_code(404);
}

?>
