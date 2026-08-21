<?php
// backend/api/testimonials.php
// Public Testimonials / Reviews REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();

try {
    $stmt = $pdo->query("
        SELECT id, name, role, organization, location, image, quote, rating, product_used as productUsed
        FROM testimonials
        WHERE status = 1
        ORDER BY display_order ASC, id ASC
    ");
    $testimonials = $stmt->fetchAll();

    jsonResponse(['success' => true, 'data' => $testimonials]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
