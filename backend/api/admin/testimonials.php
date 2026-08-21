<?php
// backend/api/admin/testimonials.php
// Admin Testimonials / Reviews REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

requireAdminAuth(true);

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'items';

try {
    if ($action === 'upload') {
        if (!isset($_FILES['image'])) {
            jsonResponse(['success' => false, 'error' => 'No image file uploaded.'], 400);
        }
        $imageUrl = handleFileUpload($_FILES['image'], 'testimonials');
        jsonResponse(['success' => true, 'image_url' => $imageUrl]);
    }

    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY display_order ASC, id DESC");
        jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $id = isset($input['id']) ? (int)$input['id'] : 0;
        $name = trim($input['name'] ?? '');
        $role = trim($input['role'] ?? '');
        $org = trim($input['organization'] ?? '');
        $loc = trim($input['location'] ?? '');
        $image = trim($input['image'] ?? '');
        $quote = trim($input['quote'] ?? '');
        $rating = (int)($input['rating'] ?? 5);
        $productUsed = trim($input['product_used'] ?? '');
        $order = (int)($input['display_order'] ?? 0);
        $status = isset($input['status']) ? (int)$input['status'] : 1;

        if (empty($name)) jsonResponse(['success' => false, 'error' => 'Name is required'], 400);
        if (empty($quote)) jsonResponse(['success' => false, 'error' => 'Quote is required'], 400);

        if ($id > 0) {
            $stmt = $pdo->prepare("
                UPDATE testimonials SET
                    name = :name, role = :role, organization = :org, location = :loc,
                    image = :img, quote = :quote, rating = :rating, product_used = :prod,
                    display_order = :ord, status = :st
                WHERE id = :id
            ");
            $stmt->execute([
                'name' => $name, 'role' => $role, 'org' => $org, 'loc' => $loc,
                'img' => $image, 'quote' => $quote, 'rating' => $rating, 'prod' => $productUsed,
                'ord' => $order, 'st' => $status, 'id' => $id
            ]);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO testimonials (name, role, organization, location, image, quote, rating, product_used, display_order, status, created_at)
                VALUES (:name, :role, :org, :loc, :img, :quote, :rating, :prod, :ord, :st, CURRENT_TIMESTAMP)
            ");
            $stmt->execute([
                'name' => $name, 'role' => $role, 'org' => $org, 'loc' => $loc,
                'img' => $image, 'quote' => $quote, 'rating' => $rating, 'prod' => $productUsed,
                'ord' => $order, 'st' => $status
            ]);
        }
        jsonResponse(['success' => true, 'message' => 'Review saved successfully']);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = :id");
        $stmt->execute(['id' => $id]);
        jsonResponse(['success' => true, 'message' => 'Review deleted successfully']);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
