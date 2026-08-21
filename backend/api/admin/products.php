<?php
// backend/api/admin/products.php
// Admin Products & Categories REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

requireAdminAuth(true);

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

try {
    if ($action === 'categories') {
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM product_categories ORDER BY display_order ASC");
            jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            $input = getJsonInput();
            $name = trim($input['name'] ?? '');
            $slug = trim($input['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
            $desc = trim($input['description'] ?? '');
            $order = (int)($input['display_order'] ?? 0);
            $status = isset($input['status']) ? (int)$input['status'] : 1;

            if (empty($name)) jsonResponse(['success' => false, 'error' => 'Category name is required'], 400);

            if (isset($input['id']) && $input['id'] > 0) {
                $stmt = $pdo->prepare("UPDATE product_categories SET name = :n, slug = :s, description = :d, display_order = :o, status = :st WHERE id = :id");
                $stmt->execute(['n' => $name, 's' => $slug, 'd' => $desc, 'o' => $order, 'st' => $status, 'id' => $input['id']]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO product_categories (name, slug, description, display_order, status) VALUES (:n, :s, :d, :o, :st)");
                $stmt->execute(['n' => $name, 's' => $slug, 'd' => $desc, 'o' => $order, 'st' => $status]);
            }
            jsonResponse(['success' => true, 'message' => 'Category saved successfully']);
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM product_categories WHERE id = :id");
            $stmt->execute(['id' => $id]);
            jsonResponse(['success' => true, 'message' => 'Category deleted successfully']);
        }
        exit();
    }

    if ($action === 'upload') {
        if (!isset($_FILES['image'])) {
            jsonResponse(['success' => false, 'error' => 'No image file uploaded.'], 400);
        }
        $imageUrl = handleFileUpload($_FILES['image'], 'products');
        jsonResponse(['success' => true, 'image_url' => $imageUrl]);
    }

    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $product = $stmt->fetch();
            if (!$product) jsonResponse(['success' => false, 'error' => 'Product not found'], 404);

            $stmtFeat = $pdo->prepare("SELECT feature_text FROM product_features WHERE product_id = :id ORDER BY display_order ASC");
            $stmtFeat->execute(['id' => $id]);
            $product['keyFeatures'] = $stmtFeat->fetchAll(PDO::FETCH_COLUMN);

            $stmtSpec = $pdo->prepare("SELECT spec_key, spec_value FROM product_specifications WHERE product_id = :id ORDER BY display_order ASC");
            $stmtSpec->execute(['id' => $id]);
            $product['specifications'] = $stmtSpec->fetchAll();

            $stmtSuit = $pdo->prepare("SELECT item_text FROM product_suitable_for WHERE product_id = :id ORDER BY display_order ASC");
            $stmtSuit->execute(['id' => $id]);
            $product['suitableFor'] = $stmtSuit->fetchAll(PDO::FETCH_COLUMN);

            $stmtComp = $pdo->prepare("SELECT crop_name, open_sun_time, solar_tunnel_time FROM product_drying_comparison WHERE product_id = :id ORDER BY display_order ASC");
            $stmtComp->execute(['id' => $id]);
            $product['dryingComparison'] = $stmtComp->fetchAll();

            $stmtImg = $pdo->prepare("SELECT image_path FROM product_images WHERE product_id = :id ORDER BY display_order ASC");
            $stmtImg->execute(['id' => $id]);
            $product['secondaryImages'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);

            jsonResponse(['success' => true, 'data' => $product]);
        } else {
            $stmt = $pdo->query("
                SELECT p.*, c.name as category_name
                FROM products p
                LEFT JOIN product_categories c ON p.category_id = c.id
                ORDER BY p.display_order ASC, p.created_at DESC
            ");
            jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
        }
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $id = trim($input['id'] ?? '');
        if (empty($id)) {
            $id = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $input['name'] ?? ''), '-'));
        }
        $name = trim($input['name'] ?? '');
        $slug = trim($input['slug'] ?? '') ?: $id;
        $tagline = trim($input['tagline'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 1);
        $featured = isset($input['featured']) ? (int)$input['featured'] : 0;
        $capacityRange = trim($input['capacity_range'] ?? '');
        $efficiency = trim($input['efficiency'] ?? '');
        $temperatureRange = trim($input['temperature_range'] ?? '');
        $paybackPeriod = trim($input['payback_period'] ?? '');
        $image = trim($input['image'] ?? '/backend/uploads/products/product-1.jpeg');
        $shortDesc = trim($input['short_description'] ?? '');
        $fullDesc = trim($input['full_description'] ?? '');
        $brochureUrl = trim($input['brochure_url'] ?? '#quote-modal');
        $order = (int)($input['display_order'] ?? 0);
        $status = isset($input['status']) ? (int)$input['status'] : 1;

        if (empty($name)) jsonResponse(['success' => false, 'error' => 'Product name is required'], 400);

        $pdo->beginTransaction();

        $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE id = :id");
        $checkStmt->execute(['id' => $id]);
        $exists = $checkStmt->fetchColumn() > 0;

        if ($exists) {
            $stmt = $pdo->prepare("
                UPDATE products SET
                    slug = :slug, name = :name, tagline = :tagline, category_id = :category_id,
                    featured = :featured, capacity_range = :capacity_range, efficiency = :efficiency,
                    temperature_range = :temperature_range, payback_period = :payback_period,
                    image = :image, short_description = :short_description, full_description = :full_description,
                    brochure_url = :brochure_url, display_order = :display_order, status = :status, updated_at = CURRENT_TIMESTAMP
                WHERE id = :id
            ");
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO products (
                    id, slug, name, tagline, category_id, featured, capacity_range, efficiency,
                    temperature_range, payback_period, image, short_description, full_description,
                    brochure_url, display_order, status, created_at
                ) VALUES (
                    :id, :slug, :name, :tagline, :category_id, :featured, :capacity_range, :efficiency,
                    :temperature_range, :payback_period, :image, :short_description, :full_description,
                    :brochure_url, :display_order, :status, CURRENT_TIMESTAMP
                )
            ");
        }

        $stmt->execute([
            'id' => $id, 'slug' => $slug, 'name' => $name, 'tagline' => $tagline, 'category_id' => $categoryId,
            'featured' => $featured, 'capacity_range' => $capacityRange, 'efficiency' => $efficiency,
            'temperature_range' => $temperatureRange, 'payback_period' => $paybackPeriod, 'image' => $image,
            'short_description' => $shortDesc, 'full_description' => $fullDesc, 'brochure_url' => $brochureUrl,
            'display_order' => $order, 'status' => $status
        ]);

        // Key Features
        if (isset($input['keyFeatures']) && is_array($input['keyFeatures'])) {
            $pdo->prepare("DELETE FROM product_features WHERE product_id = :id")->execute(['id' => $id]);
            $featStmt = $pdo->prepare("INSERT INTO product_features (product_id, feature_text, display_order) VALUES (:id, :txt, :ord)");
            foreach ($input['keyFeatures'] as $idx => $ft) {
                if (!empty(trim($ft))) {
                    $featStmt->execute(['id' => $id, 'txt' => trim($ft), 'ord' => $idx + 1]);
                }
            }
        }

        // Suitable for
        if (isset($input['suitableFor']) && is_array($input['suitableFor'])) {
            $pdo->prepare("DELETE FROM product_suitable_for WHERE product_id = :id")->execute(['id' => $id]);
            $suitStmt = $pdo->prepare("INSERT INTO product_suitable_for (product_id, item_text, display_order) VALUES (:id, :txt, :ord)");
            foreach ($input['suitableFor'] as $idx => $st) {
                if (!empty(trim($st))) {
                    $suitStmt->execute(['id' => $id, 'txt' => trim($st), 'ord' => $idx + 1]);
                }
            }
        }

        // Specifications
        if (isset($input['specifications']) && is_array($input['specifications'])) {
            $pdo->prepare("DELETE FROM product_specifications WHERE product_id = :id")->execute(['id' => $id]);
            $specStmt = $pdo->prepare("INSERT INTO product_specifications (product_id, spec_key, spec_value, display_order) VALUES (:id, :k, :v, :ord)");
            $ord = 1;
            foreach ($input['specifications'] as $k => $v) {
                if (is_array($v) && isset($v['spec_key'])) {
                    $k = $v['spec_key'];
                    $v = $v['spec_value'] ?? '';
                }
                if (!empty(trim($k))) {
                    $specStmt->execute(['id' => $id, 'k' => trim($k), 'v' => trim($v), 'ord' => $ord++]);
                }
            }
        }

        // Secondary images
        if (isset($input['secondaryImages']) && is_array($input['secondaryImages'])) {
            $pdo->prepare("DELETE FROM product_images WHERE product_id = :id")->execute(['id' => $id]);
            $imgStmt = $pdo->prepare("INSERT INTO product_images (product_id, image_path, display_order) VALUES (:id, :img, :ord)");
            foreach ($input['secondaryImages'] as $idx => $img) {
                if (!empty(trim($img))) {
                    $imgStmt->execute(['id' => $id, 'img' => trim($img), 'ord' => $idx + 1]);
                }
            }
        }

        $pdo->commit();
        jsonResponse(['success' => true, 'message' => 'Product saved successfully', 'id' => $id]);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        if (empty($id)) jsonResponse(['success' => false, 'error' => 'Product ID is required'], 400);

        $stmt = $pdo->prepare("DELETE FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);
        jsonResponse(['success' => true, 'message' => 'Product deleted successfully']);
    }
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
