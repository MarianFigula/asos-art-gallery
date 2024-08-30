<?php
// api/user/create.php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password) ||
    empty($data->username) ||
    empty($data->security_question) || empty($data->security_answer)) {
    echo json_encode(["success" => false, "code" => http_response_code(400) ,
        "message" => "Incomplete data"]);
    exit();
}

$user->setEmail($data->email);
$user->setUsername($data->username);
$user->setPassword(password_hash($data->password, PASSWORD_BCRYPT));
$user->setSecurityQuestion($data->security_question);
$user->setSecurityAnswer($data->security_answer);

if (!$user->createUser()) {
    echo json_encode(["success" => false, "code" => http_response_code(400),
        "message" => "Unable to create User"]);
    exit();
}

echo json_encode(["success" => true,
    "code" => http_response_code(201),
    "message" => "User created successfully"]);
