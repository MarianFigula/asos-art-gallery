<?php
/**
 * Description:
 * This endpoint allows retrieving review information by specifying the review ID, user ID, user email, or art ID as query parameters.
 * If neither is provided, all reviews are returned (admin only).
 * 
 * Method: GET
 * URL: /api/review/read.php
 * 
 * Query Parameters:
 * - id (optional): int - The unique ID of the review to retrieve.
 * - user_id (optional): int - The ID of the user whose reviews are to be retrieved.
 * - user_email (optional): string - The email address of the user whose reviews are to be retrieved.
 * - art_id (optional): int - The ID of the art whose reviews are to be retrieved.
 * 
 * Response Codes:
 * - 200 OK: Review(s) successfully retrieved.
 * - 403 Forbidden: Admin privileges are required to view all reviews.
 * - 404 Not Found: Review with the specified criteria does not exist.
 * - 405 Method Not Allowed: Invalid request method used (only GET is allowed).
 * 
 * Notes:
 * - If none of the query parameters are provided, all reviews are returned, which requires admin privileges.
 */



header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/Review.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

//echo json_encode("String");
//exit;

$database = new Database();
$db = $database->getConnection();

$review = new Review($db);
$user = new User($db);
$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit();
}

if (isset($_GET['id'])) {
    $review->setId($_GET['id']);
    $stmt = $review->getReviewById();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Review not found."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row
    ]);
    exit();
}

if (isset($_GET['user_id'])) {
    $user->setId($_GET['user_id']);
    $userStmt = $user->getUserById();
    $userRow = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$userRow) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);
        exit();
    }

    $review->setUserId($_GET['user_id']);
    $stmt = $review->getReviewsByUserId();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($reviews)) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "No reviews found for the specified user ID."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $reviews
    ]);
    exit();
}

if (isset($_GET['user_email'])) {
    try {
        $user->setEmail($_GET['user_email']);
    } catch (InvalidArgumentException $e) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
        exit();
    }

    $stmt = $user->getUserByEmail();
    $userRow = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$userRow) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);
        exit();
    }

    $user_id = $userRow['id'];
    $review->setUserId($user_id);
    $stmt = $review->getReviewsByUserId();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($reviews)) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "No reviews found for the specified user email."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $reviews
    ]);
    exit();
}

if (isset($_GET['art_id'])) {
    $art->setId($_GET['art_id']);
    $artStmt = $art->getArtById();
    $artRow = $artStmt->fetch(PDO::FETCH_ASSOC);

    if (!$artRow) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Art not found."
        ]);
        exit();
    }

    $review->setArtId($_GET['art_id']);
    $stmt = $review->getReviewsByArtId();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($reviews)) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "No reviews found for the specified art ID."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $reviews
    ]);
    exit();
}

// TODO: Uncomment this section if admin privileges are implemented
/*
if ($_SESSION['role'] !== 'A') {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "message" => "Access denied. Admin privileges required to view all reviews."
    ]);
    exit();
}
*/

$stmt = $review->getAllReviews();
$reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode([
    "success" => true,
    "data" => $reviews
]);
