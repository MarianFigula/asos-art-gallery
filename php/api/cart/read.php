<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Cart.php';

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method != "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Use GET to fetch cart data."
    ]);
    exit();
}

if (isset($_GET['id'])) {
    $cart->setId($_GET['id']);
    $stmt = $cart->getCartById();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Cart not found."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row
    ]);
    exit();

}

if (isset($_GET['user_id'])) {
    $cart->setUserId($_GET['user_id']);
    $stmt = $cart->getCartByUserId();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Cart not found."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row
    ]);
    exit();
}

?>
