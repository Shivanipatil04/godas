<?php
// backend/api/categories.php
// Public Categories REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();
$type = $_GET['type'] ?? 'all';

try {
    $response = [];

    if ($type === 'all' || $type === 'products') {
        $stmt = $pdo->query("SELECT * FROM product_categories WHERE status = 1 ORDER BY display_order ASC");
        $response['productCategories'] = $stmt->fetchAll();
    }

    if ($type === 'all' || $type === 'gallery') {
        $stmt = $pdo->query("SELECT * FROM gallery_categories WHERE status = 1 ORDER BY display_order ASC");
        $response['galleryCategories'] = $stmt->fetchAll();
    }

    if ($type === 'all' || $type === 'faqs') {
        $stmt = $pdo->query("SELECT * FROM faq_categories WHERE status = 1 ORDER BY display_order ASC");
        $response['faqCategories'] = $stmt->fetchAll();
    }

    jsonResponse(['success' => true, 'data' => $response]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
