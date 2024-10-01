<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";
include_once "../../utility/updateHandler.php";

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

if (empty($data->email) || empty($data->password ||
    empty($data->repeated_password))){

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit();
}

$user->setEmail($data->email);
// TODO: checknut ci security answer je rovnaka
$stmt = $user->getUserByEmail();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row){
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);
    exit();
}


$id = $row["id"];
$password = password_hash($data->password, PASSWORD_BCRYPT);

$user->setId($id);
$user->setPassword($password);

$stmt = $user->renewUserPassword();
updateHandler($stmt);
