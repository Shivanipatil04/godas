<?php
// backend/middleware/auth.php
// Admin Session Authentication Middleware

require_once __DIR__ . '/../config/config.php';

function requireAdminAuth($isApi = true) {
    if (!isset($_SESSION['admin_user_id']) || empty($_SESSION['admin_user_id'])) {
        if ($isApi) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'error' => 'Unauthorized access. Admin authentication required.']);
            exit();
        } else {
            header('Location: /admin/login.php');
            exit();
        }
    }
}
