<?php

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Review.php';
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

if (isset($data->id)){
    $review->setId($data->id);
    $stmt = $review->getReviewById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Review not found."]);
        exit();
    }
}

$review_text = $data->review_text;
$rating = $data->rating;

if (empty($review_text) || empty($rating)){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Variables are empty or NULL."]);
    exit();
}

$review->setReviewText($review_text);
$review->setRating($rating);

$stmt = $review->updateReviewById();
updateHandler($stmt);