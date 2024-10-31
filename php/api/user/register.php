<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600"); // Cache the preflight response for 1 hour
header("Content-Type: application/json");

// TODO: same code as login.php
include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once '../../config/cors.php';

session_start(); // Start the session

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if ($method == "GET"){
    http_response_code(405);
    echo json_encode(["success" => false,
        "message" => "Method not allowed."]);
    exit();
}

if (empty($data->email) || empty($data->password) ||
    empty($data->username) ||
    empty($data->repeatedPassword) ||
    empty($data->selectedSecurityQuestion) ||
    empty($data->securityAnswer)) {
    http_response_code(400);
    echo json_encode(["success" => false,
        "message" => "Incomplete data"]);
    exit();
}

$user->setEmail($data->email);
$user->setPassword(password_hash($data->password, PASSWORD_BCRYPT));
$user->setSecurityQuestion($data->security_question);
$user->setSecurityAnswer($data->security_answer);

if (!$user->createUser()) {
    http_response_code(400);
    echo json_encode(["success" => false,
        "message" => "Unable to create User"]);
    exit();
}

$_SESSION['email'] = $user->getEmail();
$_SESSION['logged_in'] = true;


http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "User created successfully"]);
