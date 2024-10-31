<?php
// api/user/delete.php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->ids) || !is_array($data->ids)){
    echo json_encode(["success" => false, "message" => "No valid IDs provided"]);
    exit();
}

$ids = $data->ids;

if (!$user->deleteUsersByIds($ids)){
    http_response_code(400);
    echo json_encode(["success" => false,
        "message" => "Failed to delete users"]);
    exit();
}

http_response_code(200);

echo json_encode(["success" => false,
    "message" => "Users were successfully deleted"]);
exit();

