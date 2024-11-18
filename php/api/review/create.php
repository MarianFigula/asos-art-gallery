<?php
/**
 * Description:
 * This endpoint allows creating a new review by specifying user email, art ID, review text, and rating.
 * The user email and art ID are required to identify the user and artwork, and review text and rating are required for the review itself.
 * 
 * Method: POST
 * URL: /api/review/create.php
 * 
 * Request Body:
 * {
 *   "email": "user@example.com", // Required: The email of the user creating the review (string).
 *   "art_id": 1,                 // Required: The ID of the artwork being reviewed (integer).
 *   "review_text": "Great art!", // Required: The text of the review (string).
 *   "rating": 5                  // Required: The rating for the artwork (integer between 1 and 5).
 * }
 * 
 * Response Codes:
 * - 201 Created: Review successfully created.
 * - 400 Bad Request: Missing required parameters or invalid data.
 * - 404 Not Found: User or artwork with the specified identifiers does not exist.
 * - 405 Method Not Allowed: Invalid request method used (only POST is allowed).
 * - 500 Internal Server Error: Failed to create the review due to server error.
 */

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Review.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$review = new Review($db);

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

// Validate required parameters
if (empty($data->email) ||
    empty($data->art_id) ||
    empty($data->review_text) ||
    empty($data->rating))
{
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "All fields (email, art_id, review_text, rating) are required."
    ]);
    exit;
}

$email = $data->email;
$art_id = $data->art_id;
$review_text = $data->review_text;
$rating = $data->rating;

// Validate user existence

try {
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

    // Validate artwork existence
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

    $reviewer_user_id = $row["id"];

    $review->setUserId($reviewer_user_id);
    $review->setArtId($art_id);
    $review->setReviewText($review_text);
    $review->setRating($rating);

    if ($review->createReview()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Review successfully created."
        ]);
    } else {
        throw new Exception("Failed to create review.");
    }
    
} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
