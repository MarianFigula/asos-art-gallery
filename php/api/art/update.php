<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600"); // Cache the preflight response for 1 hour
header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once "../../config/cors.php";
include_once "../../utility/updateHandler.php";

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

if (isset($data->id)){
    $art->setId($data->id);
    $stmt = $art->getArtById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Art not found."]);
        exit();
    }
}

$title = $data->title;
$description = $data->description;
$price = $data->price;

if (empty($title) || empty($description) || empty($price)){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Variables are empty or NULL."]);
    exit();
}

$art->setTitle($title);
$art->setDescription($description);
$art->setPrice($price);

$stmt = $art->updateArtById();
updateHandler($stmt);