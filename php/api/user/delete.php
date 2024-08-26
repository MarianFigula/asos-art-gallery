<?php
// api/user/delete.php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (empty($data->id)){
    echo json_encode(["code" => http_response_code(400),
        "message" => "Incorrect on incomplete data"]);
    exit();
}

$user->setId($data->id);

if ($user->deleteUserById()) {
    echo json_encode(["code" => http_response_code(200),
        "message" => "User was deleted successfully."]);
    exit();
}
