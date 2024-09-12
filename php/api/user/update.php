<?php
// api/user/update.php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"));

if (empty($data)){
    echo json_encode(["code" => http_response_code(400),
        "message" => "Empty request body or incomplete data"]);
    exit();
}

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
}

$username = $data->username;
$email = $data->email;

if (empty($username) || empty($email)){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Variables are empty or NULL."]);
    exit();
}

$user->setUsername($username);
$user->setEmail($email);

$stmt = $user->updateUserById();
if (!$stmt){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" =>  "Update failed"]);
    exit();
}

if ($stmt->rowCount() === 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No rows were updated. 
        Either the user does not exist or no changes were made."
    ]);
    exit();
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "User successfully updated."]);
exit();