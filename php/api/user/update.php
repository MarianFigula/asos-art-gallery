<?php
/**
 * TODO: allows more attributes to be edited?
 * Description:
 * This endpoint allows partial updates to a user's information.
 * The user ID is required to identify the user, and at least one of 
 * the following parameters must be provided to update either the 
 * username or the email.
 * 
 * Method: PUT
 * URL: /api/user/update.php
 * 
 * Request Body:
 * {
 *   "id": 1,                     // Required: The unique ID of the user to update (integer).
 *   "username": "newUsername",   // Optional: The new username for the user (string).
 *   "email": "newemail@example.com" // Optional: The new email address for the user (string).
 * }
 * 
 * Response Codes:
 * - 200 OK: User successfully updated.
 * - 400 Bad Request: Missing required parameters (id) or invalid data.
 * - 404 Not Found: User with the specified ID does not exist.
 * - 405 Method Not Allowed: Invalid request method used (only PUT is allowed).
 * - 500 Internal Server Error: Failed to update the user due to server error.
 * 
 * Notes:
 * - The user ID is mandatory, and at least one of 'username' or 'email' must be provided for an update.
 */

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once "../../config/cors.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Ensure the request method is PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !filter_var($data->id, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Valid user ID is required to update user information."
    ]);
    exit;
}

// Check for at least one parameter to update
$username = isset($data->username) ? $data->username : null;
$email = isset($data->email) ? $data->email : null;

if (empty($username) && empty($email)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "At least one parameter ('username' or 'email') is required to update the user."
    ]);
    exit;
}

// Set the user ID
$user->setId($data->id);

// Check if the user exists
$stmt = $user->getUserById();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);
    exit();
}

try {
    if (!empty($username)) {
        $user->setUsername($username);
    }
    if (!empty($email)) {
        $user->setEmail($email);
    }

    if ($user->updateUserById()) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "User successfully updated."
        ]);
    } else {
        throw new Exception("Failed to update user.");
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
