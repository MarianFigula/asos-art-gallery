<?php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Cart.php';
include_once '../../classes/Art.php';
include_once '../../classes/CartArt.php';
include_once "../../config/cors.php";


$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);
$art = new Art($db);
$cartArt = new CartArt($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST is permitted."
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$session_user_id = $data->user_id; // TODO ziskat cez session

if (empty($session_user_id) || empty($data->art_ids)){
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User or Art not found."
    ]);
    exit;
}

$user_id = $session_user_id;
$art_ids = $data->art_ids;

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

    if ($cartArt->clearCartArt($art_ids) && $art->deleteArtsByIds($art_ids)) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Arts successfully bought"
        ]);
    } else {
        throw new Exception("Failed to remove art from the cart.");
    }
} catch (Exception $e) {
}