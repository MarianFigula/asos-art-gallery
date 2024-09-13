<?php

/**
 * @param $stmt
 * @return void
 */
function updateHandler($stmt): void
{
    if (!$stmt) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Update failed"]);
        exit();
    }

    if ($stmt->rowCount() === 0) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "No rows were updated. 
        Either the user does not exist or no changes were made."
        ]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "User successfully updated."]);
    exit();
}