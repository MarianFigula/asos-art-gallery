<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600"); // Cache the preflight response for 1 hour
header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

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

if (isset($data->id)){
    $user->setId($data->id);
    $stmt = $user->getUserById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row]);
    exit();
}

if (isset($data->email)){
    $user->setEmail($data->email);
    $stmt = $user->getUserByEmail();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row]);
    exit();
}

// TODO: iba admin moze vsetkych userov
$stmt = $user->getUsers();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode([
    "success" => true,
    "data" => $users]);

