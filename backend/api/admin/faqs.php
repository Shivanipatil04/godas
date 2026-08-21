<?php
// backend/api/admin/faqs.php
// Admin FAQs & Categories REST API

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
            $stmt = $pdo->query("SELECT * FROM faq_categories ORDER BY display_order ASC");
            jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            $input = getJsonInput();
            $name = trim($input['name'] ?? '');
            $slug = trim($input['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
            $order = (int)($input['display_order'] ?? 0);
            $status = isset($input['status']) ? (int)$input['status'] : 1;

            if (empty($name)) jsonResponse(['success' => false, 'error' => 'Category name is required'], 400);

            if (isset($input['id']) && $input['id'] > 0) {
                $stmt = $pdo->prepare("UPDATE faq_categories SET name = :n, slug = :s, display_order = :o, status = :st WHERE id = :id");
                $stmt->execute(['n' => $name, 's' => $slug, 'o' => $order, 'st' => $status, 'id' => $input['id']]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO faq_categories (name, slug, display_order, status) VALUES (:n, :s, :o, :st)");
                $stmt->execute(['n' => $name, 's' => $slug, 'o' => $order, 'st' => $status]);
            }
            jsonResponse(['success' => true, 'message' => 'FAQ category saved successfully']);
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM faq_categories WHERE id = :id");
            $stmt->execute(['id' => $id]);
            jsonResponse(['success' => true, 'message' => 'Category deleted successfully']);
        }
        exit();
    }

    if ($method === 'GET') {
        $stmt = $pdo->query("
            SELECT f.*, c.name as category_name, c.slug as category_slug
            FROM faqs f
            LEFT JOIN faq_categories c ON f.category_id = c.id
            ORDER BY f.display_order ASC, f.id ASC
        ");
        jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $id = isset($input['id']) ? (int)$input['id'] : 0;
        $categoryId = (int)($input['category_id'] ?? 1);
        $question = trim($input['question'] ?? '');
        $answer = trim($input['answer'] ?? '');
        $order = (int)($input['display_order'] ?? 0);
        $status = isset($input['status']) ? (int)$input['status'] : 1;

        if (empty($question)) jsonResponse(['success' => false, 'error' => 'Question is required'], 400);
        if (empty($answer)) jsonResponse(['success' => false, 'error' => 'Answer is required'], 400);

        if ($id > 0) {
            $stmt = $pdo->prepare("
                UPDATE faqs SET
                    category_id = :cat, question = :q, answer = :a,
                    display_order = :ord, status = :st
                WHERE id = :id
            ");
            $stmt->execute([
                'cat' => $categoryId, 'q' => $question, 'a' => $answer,
                'ord' => $order, 'st' => $status, 'id' => $id
            ]);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO faqs (category_id, question, answer, display_order, status, created_at)
                VALUES (:cat, :q, :a, :ord, :st, CURRENT_TIMESTAMP)
            ");
            $stmt->execute([
                'cat' => $categoryId, 'q' => $question, 'a' => $answer,
                'ord' => $order, 'st' => $status
            ]);
        }
        jsonResponse(['success' => true, 'message' => 'FAQ saved successfully']);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM faqs WHERE id = :id");
        $stmt->execute(['id' => $id]);
        jsonResponse(['success' => true, 'message' => 'FAQ deleted successfully']);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
