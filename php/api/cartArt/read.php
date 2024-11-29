<?php


header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/CartArt.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$cart = new Cart($db);
$cartArt = new CartArt($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only GET is permitted."
    ]);
    exit();
}

// zo session alebo z autentizacie treba zobrat
if (isset($_GET["user_id"])){
    $cart->setUserId($_GET["user_id"]);

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

    $cartArt->setCartId($row["cart_id"]);

    $stmt = $cartArt->getCartArtsByCartId();
    $cartArts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $cartArts
    ]);
}