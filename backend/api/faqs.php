<?php
// backend/api/faqs.php
// Public FAQs REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();
$categorySlug = $_GET['category'] ?? null;

try {
    $sql = "
        SELECT f.*, c.name as category, c.slug as category_slug
        FROM faqs f
        JOIN faq_categories c ON f.category_id = c.id
        WHERE f.status = 1 AND c.status = 1
    ";
    $params = [];

    if ($categorySlug && $categorySlug !== 'all') {
        $sql .= " AND c.slug = :category_slug";
        $params['category_slug'] = $categorySlug;
    }

    $sql .= " ORDER BY c.display_order ASC, f.display_order ASC, f.id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $faqs = $stmt->fetchAll();

    jsonResponse(['success' => true, 'data' => $faqs]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
