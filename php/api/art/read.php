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

if (isset($_GET['id'])) {
    $art->setId($_GET['id']);
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

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $row
    ]);
    exit();
}

if (isset($_GET['user_id'])) {
    $art->setUserId($_GET['user_id']);
    $stmt = $art->getArtsByUserId();
    $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($arts)) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "No artworks found for the specified user."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => $arts
    ]);
    exit();
}

// REVIEW - SHOULD WORK, COMMENTED FOR DEBUGGING PURPOSES 
/*
if ($_SESSION['role'] !== 'A') {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "message" => "Access denied. Admin privileges required to view all users."
    ]);
    exit();
}*/

$stmt = $art->getArtWithReviewsAndUser();
$arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode([
    "success" => true,
    "data" => $arts
]);
exit();