<?php
// backend/config/config.php
// Global Application Configuration

if (!ob_get_level()) {
    ob_start();
}

// Load .env if present
if (file_exists(__DIR__ . '/../../.env')) {
    $lines = file(__DIR__ . '/../../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv("{$name}={$value}");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Environment settings
define('APP_ENV', getenv('APP_ENV') ?: 'production');
define('APP_URL', getenv('APP_URL') ?: 'http://localhost:8000');
define('ADMIN_URL', getenv('ADMIN_URL') ?: 'http://localhost:8000/admin');

// Upload directory paths
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('UPLOAD_URL', getenv('UPLOAD_URL') ?: '/backend/uploads/');

// Allowed Upload MIME types & Max size (5MB)
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024); // 5 MB

// Session Configuration for Admin Panel
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        ini_set('session.cookie_secure', '1');
    }
    session_start();
}
