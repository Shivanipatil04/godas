<?php
// backend/utils/helpers.php
// Helper Utilities for JSON Responses, Input Sanitization, CSRF, and File Uploads

require_once __DIR__ . '/../config/config.php';

function jsonResponse(array $data, int $statusCode = 200): void {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();
}

function getJsonInput(): array {
    $raw = file_get_contents('php_input') ?: file_get_contents('php://input');
    if (!$raw) {
        return $_POST;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? array_merge($_POST, $decoded) : $_POST;
}

function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    if (is_string($data)) {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
    return $data;
}

function generateCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(?string $token): bool {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

function handleFileUpload(array $file, string $subFolder = 'products'): string {
    if (!isset($file['error']) || is_array($file['error'])) {
        throw new Exception('Invalid upload parameter format.');
    }

    switch ($file['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new Exception('No file was sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new Exception('Exceeded file size limit (Max 5MB).');
        default:
            throw new Exception('Unknown upload error.');
    }

    if ($file['size'] > MAX_UPLOAD_SIZE) {
        throw new Exception('Exceeded file size limit (Max 5MB).');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);

    if (!in_array($mimeType, ALLOWED_IMAGE_TYPES)) {
        throw new Exception('Invalid file format. Only JPEG, PNG, WEBP, and GIF are allowed.');
    }

    $extMap = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif'
    ];
    $ext = $extMap[$mimeType] ?? 'jpg';

    $subFolder = preg_replace('/[^a-zA-Z0-9_\-]/', '', $subFolder);
    $targetDir = UPLOAD_DIR . $subFolder . '/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    $filename = sprintf('%s_%s.%s', $subFolder, bin2hex(random_bytes(8)), $ext);
    $targetPath = $targetDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception('Failed to save uploaded file.');
    }

    return UPLOAD_URL . $subFolder . '/' . $filename;
}
