<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/CartArt.php';
include_once '../../classes/Cart.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();


$cartArt = new CartArt($db);
$cart = new Cart($db);
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));


$session_user_id = 8; // TODO ziskat cez session

if (empty($session_user_id) || empty($data->art_id)){
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User or Art not found."
    ]);
    exit;
}

$user_id = $session_user_id;
$art_id = $data->art_id;


try {
    $cart->setUserId($user_id);
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

    $cartArt->setCartId($row["id"]);
    $cartArt->setArtId($art_id);

    if ($cartArt->createCartArt()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "CartArt successfully created."
        ]);
    } else {
        throw new Exception("Failed to create CartArt.");
    }


}catch (Exception $e){
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete reviews: " . $e->getMessage()
    ]);
}

