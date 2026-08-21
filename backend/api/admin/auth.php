<?php
// backend/api/admin/auth.php
// Admin Authentication REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

$pdo = Database::getConnection();
$action = $_GET['action'] ?? $_POST['action'] ?? 'check';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = getJsonInput();
    $action = $input['action'] ?? $action;
}

try {
    switch ($action) {
        case 'login':
            $input = getJsonInput();
            $username = trim($input['username'] ?? '');
            $password = trim($input['password'] ?? '');

            if (empty($username) || empty($password)) {
                jsonResponse(['success' => false, 'error' => 'Username and password are required.'], 400);
            }

            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE (username = :u OR email = :e) AND status = 1 LIMIT 1");
            $stmt->execute(['u' => $username, 'e' => $username]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password_hash'])) {
                jsonResponse(['success' => false, 'error' => 'Invalid username or password.'], 401);
            }

            // Regenerate session id for security
            session_regenerate_id(true);
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_full_name'] = $user['full_name'];
            $_SESSION['admin_role'] = $user['role'];

            jsonResponse([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'fullName' => $user['full_name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);
            break;

        case 'logout':
            $_SESSION = array();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
            jsonResponse(['success' => true, 'message' => 'Logged out successfully']);
            break;

        case 'check':
        default:
            if (isset($_SESSION['admin_user_id'])) {
                jsonResponse([
                    'success' => true,
                    'authenticated' => true,
                    'user' => [
                        'id' => $_SESSION['admin_user_id'],
                        'username' => $_SESSION['admin_username'],
                        'fullName' => $_SESSION['admin_full_name'],
                        'role' => $_SESSION['admin_role']
                    ]
                ]);
            } else {
                jsonResponse(['success' => true, 'authenticated' => false]);
            }
            break;
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
