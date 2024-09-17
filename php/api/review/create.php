<?php
// api/review/create.php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Review.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";
include_once "../../utility/updateHandler.php";

$database = new Database();
$db = $database->getConnection();

$review = new Review($db);

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

if (empty($data->email) ||
    empty($data->art_id) ||
    empty($data->review_text) ||
    empty($data->rating))
{
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Variables are empty or NULL."]);
    exit();
}

$email = $data->email;
$art_id = $data->art_id;
$review_text = $data->review_text;
$rating = $data->rating;

$user = new User($db);
$user->setEmail($email);

$stmt = $user->getUserByEmail();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Art not found."
    ]);
    exit();
}

$reviewer_user_id = $row["id"];


$art = new Art($db);

$art->setId($art_id);

$stmt = $art->getArtById();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Art not found."
    ]);
    exit();
}

$review->setUserId($reviewer_user_id);
$review->setArtId($art_id);
$review->setReviewText($review_text);
$review->setRating($rating);

$stmt = $review->createReview();

if (!$stmt) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Failed to create review."
    ]);
    exit();
}

http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "Art successfully created."
]);