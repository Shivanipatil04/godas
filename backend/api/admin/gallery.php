<?php
// backend/api/admin/gallery.php
// Admin Gallery REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

requireAdminAuth(true);

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'items';

try {
    if ($action === 'categories') {
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM gallery_categories ORDER BY display_order ASC");
            jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            $input = getJsonInput();
            $name = trim($input['name'] ?? '');
            $slug = trim($input['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
            $order = (int)($input['display_order'] ?? 0);
            $status = isset($input['status']) ? (int)$input['status'] : 1;

            if (empty($name)) jsonResponse(['success' => false, 'error' => 'Category name is required'], 400);

            if (isset($input['id']) && $input['id'] > 0) {
                $stmt = $pdo->prepare("UPDATE gallery_categories SET name = :n, slug = :s, display_order = :o, status = :st WHERE id = :id");
                $stmt->execute(['n' => $name, 's' => $slug, 'o' => $order, 'st' => $status, 'id' => $input['id']]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO gallery_categories (name, slug, display_order, status) VALUES (:n, :s, :o, :st)");
                $stmt->execute(['n' => $name, 's' => $slug, 'o' => $order, 'st' => $status]);
            }
            jsonResponse(['success' => true, 'message' => 'Gallery category saved successfully']);
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM gallery_categories WHERE id = :id");
            $stmt->execute(['id' => $id]);
            jsonResponse(['success' => true, 'message' => 'Category deleted successfully']);
        }
        exit();
    }

    if ($action === 'upload') {
        if (!isset($_FILES['image'])) {
            jsonResponse(['success' => false, 'error' => 'No image file uploaded.'], 400);
        }
        $imageUrl = handleFileUpload($_FILES['image'], 'gallery');
        jsonResponse(['success' => true, 'image_url' => $imageUrl]);
    }

    if ($method === 'GET') {
        $stmt = $pdo->query("
            SELECT g.*, c.name as category_name, c.slug as category_slug
            FROM gallery_items g
            LEFT JOIN gallery_categories c ON g.category_id = c.id
            ORDER BY g.display_order ASC, g.id DESC
        ");
        jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $id = isset($input['id']) ? (int)$input['id'] : 0;
        $title = trim($input['title'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 1);
        $location = trim($input['location'] ?? '');
        $image = trim($input['image'] ?? '');
        $order = (int)($input['display_order'] ?? 0);
        $status = isset($input['status']) ? (int)$input['status'] : 1;

        if (empty($title)) jsonResponse(['success' => false, 'error' => 'Gallery title is required'], 400);
        if (empty($image)) jsonResponse(['success' => false, 'error' => 'Gallery image URL is required'], 400);

        if ($id > 0) {
            $stmt = $pdo->prepare("
                UPDATE gallery_items SET
                    title = :title, category_id = :cat, location = :loc,
                    image = :img, display_order = :ord, status = :st
                WHERE id = :id
            ");
            $stmt->execute([
                'title' => $title, 'cat' => $categoryId, 'loc' => $location,
                'img' => $image, 'ord' => $order, 'st' => $status, 'id' => $id
            ]);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO gallery_items (title, category_id, location, image, display_order, status, created_at)
                VALUES (:title, :cat, :loc, :img, :ord, :st, CURRENT_TIMESTAMP)
            ");
            $stmt->execute([
                'title' => $title, 'cat' => $categoryId, 'loc' => $location,
                'img' => $image, 'ord' => $order, 'st' => $status
            ]);
        }
        jsonResponse(['success' => true, 'message' => 'Gallery item saved successfully']);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM gallery_items WHERE id = :id");
        $stmt->execute(['id' => $id]);
        jsonResponse(['success' => true, 'message' => 'Gallery item deleted successfully']);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
