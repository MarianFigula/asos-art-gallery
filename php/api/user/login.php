<?php
/**
 * Description:
 * This endpoint allows a user to log in by providing their email and password.
 * If the credentials are correct, a session is started.
 * 
 * Method: POST
 * URL: /api/user/login.php
 * 
 * Request Body:
 * {
 *   "email": "user@example.com",   // Required: (string)
 *   "password": "password123"      // Required: (string)
 * }
 * 
 * Response Codes:
 * - 200 OK: Login successful.
 * - 400 Bad Request: Missing required fields (email or password).
 * - 401 Unauthorized: Invalid email or password.
 * - 404 Not Found: User with the specified email does not exist.
 * - 405 Method Not Allowed: Invalid request method used (only POST is allowed).
 * 
 * Notes:
 * - Upon successful login, session variables are set to maintain the user's session.
 */

header("Content-Type: application/json");

include_once '../../config/Database.php';
include_once '../../classes/User.php';
include_once '../../config/cors.php';

session_start(); // Start the session

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];


$user = new User($db);

if ($method !== "POST") {
    http_response_code(405); 
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password)){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit();
}

if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email format."
    ]);
    exit();
}

$user->setEmail($data->email);
$stmt = $user->getUserByEmail();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row){
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);
    exit();
}

if (!$user->verifyPassword($data->password, $row['password'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Invalid password."
    ]);
    exit();
}

$_SESSION['email'] = $row['email'];
$_SESSION['role'] = $row['role'];
$_SESSION['logged_in'] = true;

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Login successful."
]);