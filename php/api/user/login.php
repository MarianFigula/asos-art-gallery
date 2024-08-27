<?php

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once '../../config/cors.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];


$user = new User($db);

if ($method == "GET"){
    echo json_encode(["code" => http_response_code(400),
        "message" => "Method not allowed."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)){
    echo json_encode([
        "success" => false,
        "code" => http_response_code(400),
        "message" => "Email and password are required."
    ]);
    exit();
}

$user->setEmail($data->email);
$stmt = $user->getUserByEmail();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row){
    echo json_encode([
        "success" => false,
        "code" => http_response_code(404),
        "message" => "User not found."
    ]);
    exit();
}

if (!password_verify($data->password, $row['password'])){
    echo json_encode([
        "success" => false,
        "code" => http_response_code(401),
        "message" => "Invalid email or password.",
    ]);
    exit();
}

echo json_encode([
    "success" => true,
    "code" => http_response_code(200),
    "message" => "Login successful.",
]);