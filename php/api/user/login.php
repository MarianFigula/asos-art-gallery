<?php

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once '../../config/cors.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];


$user = new User($db);

if ($method == "GET"){
    http_response_code(405);
    echo json_encode(["success" => false,
        "message" => "Method not allowed."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password)){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit();
}

$user->setEmail($data->email);
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

if (!password_verify($data->password, $row['password'])){
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password.",
    ]);
    exit();
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Login successful.",
]);