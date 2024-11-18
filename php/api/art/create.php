<?php
/**
 * Description:
 * This endpoint allows creating a new art entry with details like title, description, price, and image.
 * The art data must be provided via a POST request, and an image file must be uploaded as well.
 *
 * Method: POST
 * URL: /api/art/create.php
 * 
 * Example CURL request that suceeded:
 * curl -X POST http://localhost/api/art/create.php -F "email=alicebobova@gmail.com" -F "title=My Artwork" -F "description=This is a test description" -F "price=100" -F "file=@C:/Resources/R.jpg"
 * the file path is going to be different and contain the image.
 * As far as I know, POSTMAN can't really post image in this way.
 *
 * Request Body (Form Data):
 * - "email": "user@example.com"          (string, required)
 * - "title": "Artwork Title"             (string, required)
 * - "description": "Artwork description" (string, required)
 * - "price": 100                         (integer, optional)
 * - "file": (file, required) - Image of the artwork
 *
 * Response Codes:
 * - 201 Created: Art was successfully created.
 * - 400 Bad Request: Invalid input provided or missing required fields.
 * - 404 Not Found: User not found.
 * - 500 Internal Server Error: Failed to create art due to server error.
 */

// IDEA: Consider ideas for checking image duplication

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/Art.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$art = new Art($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->title) || empty($data->description) || empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit();
}

$email = $data->email;
$title = $data->title;
$description = $data->description;
$price = isset($data->price) ? intval($data->price) : null;

// Store image in 'public/art/' directory
$targetDir = '/var/www/html/public/arts/';
$targetFile = $targetDir . basename($_FILES["file"]["name"]);
$img_url = "/arts/" . basename($_FILES["file"]["name"]);

// Move the file to the public directory
if (!move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to upload image."
    ]);
    exit();
}

try {
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
    if ($art->createArt()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Art successfully created."
        ]);
    } else {
        throw new Exception("Failed to create art.");
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>