<?php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriParts = explode('/', $uri);


if ($method == "POST"){
    echo json_encode(["code" => http_response_code(400),
        "message" => "Method not allowed."]);
    exit();
}

// GET /user/{id} - Fetch user by ID
if (isset($uriParts[2]) && is_numeric($uriParts[2])) {
    $user->setId($uriParts[2]);
    $stmt = $user->getUserById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        echo json_encode(["success" => true,
            "code" => http_response_code(200),
            "data" => $row]);
        exit();
    }
    echo json_encode(["success" => false,
        "code" => http_response_code(404),
        "message" => "User not found."]);

} elseif (isset($uriParts[2]) && filter_var($uriParts[2], FILTER_VALIDATE_EMAIL)) {
    // GET /user/{email} - Fetch user by Email, TODO: filter_validate_email asi vymazat
    $user->setEmail($uriParts[2]);
    $stmt = $user->getUserByEmail();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        echo json_encode(["success" => true,
            "code" => http_response_code(200),
            "data" => $row]);
        exit();
    }
    echo json_encode(["success" => false,
        "code" => http_response_code(404),
        "message" => "User not found."]);
} else {
    // GET /user - Fetch all users
    $stmt = $user->getUsers();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true,
        "code" => http_response_code(200),
        "data" => $users]);
}
