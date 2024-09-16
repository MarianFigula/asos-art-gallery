<?php
// api/art/create.php

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$art = new Art($db);

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

$email = $data->email;
$img_url = $art->parseUrl($data->img_url);
$title = $data->title;
$description = $data->description;
$price = intval($data->price);

if (empty($email) || empty($img_url) ||
    empty($title) || empty($description)||
    $price < 0)
{

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Variables are empty or NULL."]);
    exit();
}

$user = new User($db);
$user->setEmail($email);

$stmt = $user->getUserByEmail();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User not found."]);
    exit();
}

$art->setUserId($row["id"]);
$art->setImgUrl($img_url);
$art->setTitle($title);
$art->setDescription($description);
$art->setPrice($price);

$stmt = $art->createArt();

if (!$stmt) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"]);
    exit();
}

http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "Art successfully created."]);
exit();
