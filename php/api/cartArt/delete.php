<?php

/**
 * Cart Art delete
 */

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Cart.php';
include_once '../../classes/Art.php';
include_once '../../classes/CartArt.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);
$cartArt = new CartArt($db);
$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));


$session_user_id = $data->user_id; // TODO ziskat cez session

if (empty($session_user_id) || empty($data->art_id)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "User id or Art id not provided."
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

    $cart_id = $row["id"];
    $cartArt->setCartId($cart_id);


    $cartArt->setArtId($art_id);
    if ($cartArt->deleteCartArtByArtId()) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Art successfully removed from the cart."
        ]);
    } else {
        throw new Exception("Failed to remove art from the cart.");
    }

    // TODO volanie moze byt aj ine napr api/buy a tam sa zavola ta funkcia a na delete bude iba z kosika a mozno to dat do ls len
    // aby sa nemuselo refreshovat - alebo na button click sa odstrani


} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}