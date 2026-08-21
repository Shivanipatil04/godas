<?php
// backend/api/gallery.php
// Public Gallery REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();
$categorySlug = $_GET['category'] ?? null;

try {
    $sql = "
        SELECT g.*, c.name as category, c.slug as category_slug
        FROM gallery_items g
        JOIN gallery_categories c ON g.category_id = c.id
        WHERE g.status = 1
    ";
    $params = [];

    if ($categorySlug && $categorySlug !== 'all') {
        $sql .= " AND c.slug = :category_slug";
        $params['category_slug'] = $categorySlug;
    }

    $sql .= " ORDER BY g.display_order ASC, g.id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $items = $stmt->fetchAll();

    jsonResponse(['success' => true, 'data' => $items]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
