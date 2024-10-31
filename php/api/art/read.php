<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600"); // Cache the preflight response for 1 hour
header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"));

// TODO: mozno sa to bude posielat cez URL (GET)
if ($method == "GET"){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."]);
    exit();
}

if (isset($data->user_id)){
    $art->setUserId($data->user_id);
    $stmt = $art->getArtsByUserId();
    $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $arts]);
    exit();
}

if (!empty($data->user_email)) {
    $user = new User($db);
    $user->setEmail($data->user_email);

    $stmt = $user->getUserByEmail();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."]);
        exit();
    }

    $user_id = $row["id"];

    $user->setId($user_id);
    $art->setUserId($user_id);

    $stmt = $art->getArtsByUserId();

    $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $arts]);
    exit();
}


if (isset($data->id)){
    $art->setId($data->id);
    $stmt = $art->getArtById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Art not found."]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row]);
    exit();
}

$stmt = $art->getArtWithReviewsAndUser();
$arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode([
    "message" => "jotjo",
    "success" => true,
    "data" => $arts]);
exit();