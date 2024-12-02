<?php
/**
 * Description:
 * This endpoint allows retrieving art information by specifying the art ID or user ID as query parameters.
 * If neither is provided, all art records are returned.
 * 
 * Method: GET
 * URL: /api/art/read.php
 * 
 * Query Parameters:
 * - id (optional): int - The unique ID of the art to retrieve.
 * - user_id (optional): int - The user ID to retrieve artworks created by the specified user.
 * 
 * Response Codes:
 * - 200 OK: Art(s) successfully retrieved.
 * - 404 Not Found: Art with the specified ID or user ID does not exist.
 * - 405 Method Not Allowed: Invalid request method used (only GET is allowed).
 * 
 */

header("Content-Type: application/json");
include_once '../../config/Database.php';
include_once '../../classes/Art.php';
// NOTE: don't think this import is necessary
include_once '../../classes/User.php';
include_once "../../config/cors.php";
include_once '../../config/auth.php';

$database = new Database();
$db = $database->getConnection();

$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only GET is permitted."
    ]);
    exit();
}
try {
    // Fetch art by ID
    if (isset($_GET['id'])) {
        $art_id = intval($_GET['id']);
        $art->setId($art_id);
        $stmt = $art->getArtById();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(404); // Not Found
            echo json_encode([
                "success" => false,
                "message" => "Art not found."
            ]);
            exit();
        }

        http_response_code(200); // Success
        echo json_encode([
            "success" => true,
            "data" => $row
        ]);
        exit();
    }

    // Fetch arts by authenticated user's ID
    if (isset($_GET['user_id'])) {
        $user_id = intval($_GET['user_id']);
        $art->setUserId($user_id);
        $stmt = $art->getArtsByUserId();
        $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($arts)) {
            http_response_code(404); // Not Found
            echo json_encode([
                "success" => false,
                "message" => "No artworks found for the specified user."
            ]);
            exit();
        }

        http_response_code(200); // Success
        echo json_encode([
            "success" => true,
            "data" => $arts
        ]);
        exit();
    }

    // Fetch all arts with reviews and user details
    if ($decoded->role !== 'A') { // Ensure only admins can fetch all data
        http_response_code(403); // Forbidden
        echo json_encode([
            "success" => false,
            "message" => "Access denied. Admin privileges required."
        ]);
        exit();
    }

    $stmt = $art->getArtWithReviewsAndUser();
    $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200); // Success
    echo json_encode([
        "success" => true,
        "data" => $arts
    ]);
} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
    exit();
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}