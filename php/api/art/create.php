<?php
// api/art/create.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600"); // Cache the preflight response for 1 hour
header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

// TODO: mozno sa to bude posielat cez URL (GET)
if ($method == "GET"){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."]);
    exit();
}

$email = $_POST['email'];
$title = $_POST['title'];
$description = $_POST['description'];
$price = intval($_POST['price']);

// Check if file is uploaded
if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No file uploaded."
    ]);
    exit();
}

// Store image in 'public/art/' directory
$targetDir = '/var/www/html/public/arts/';;
$targetFile = $targetDir . basename($_FILES["file"]["name"]);
$img_url = "/arts/" . basename($_FILES["file"]["name"]);

$target_dir = '/var/www/html/public/arts/';
$target_file = $target_dir . basename($_FILES["file"]["name"]);

// Move the file to the public directory
if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    // File upload successful
    // Insert the art record into the database

    $user = new User($db);
    $user->setEmail($email);

    $stmt = $user->getUserByEmail();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);
        exit();
    }

    // Set the Art properties
    $art->setUserId($row["id"]);
    $art->setImgUrl($img_url);
    $art->setTitle($title);
    $art->setDescription($description);
    $art->setPrice($price);

    // Insert the art
    $stmt = $art->createArt();

    if (!$stmt) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Failed to create art."
        ]);
        exit();

    }
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Art successfully created."
    ]);

} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to upload image."
    ]);
}