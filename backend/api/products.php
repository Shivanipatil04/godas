<?php
// backend/api/products.php
// Public Products REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();

$id = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;

try {
    if ($id || $slug) {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            JOIN product_categories c ON p.category_id = c.id
            WHERE (p.id = :id OR p.slug = :slug) AND p.status = 1
        ");
        $stmt->execute(['id' => $id ?: '', 'slug' => $slug ?: '']);
        $product = $stmt->fetch();

        if (!$product) {
            jsonResponse(['success' => false, 'error' => 'Product not found'], 404);
        }

        // Fetch features
        $stmtFeat = $pdo->prepare("SELECT feature_text FROM product_features WHERE product_id = :id ORDER BY display_order ASC");
        $stmtFeat->execute(['id' => $product['id']]);
        $product['keyFeatures'] = $stmtFeat->fetchAll(PDO::FETCH_COLUMN);

        // Fetch specs
        $stmtSpec = $pdo->prepare("SELECT spec_key, spec_value FROM product_specifications WHERE product_id = :id ORDER BY display_order ASC");
        $stmtSpec->execute(['id' => $product['id']]);
        $specs = $stmtSpec->fetchAll();
        $specObj = [];
        foreach ($specs as $sp) {
            $specObj[$sp['spec_key']] = $sp['spec_value'];
        }
        $product['specifications'] = $specObj;

        // Fetch suitable for
        $stmtSuit = $pdo->prepare("SELECT item_text FROM product_suitable_for WHERE product_id = :id ORDER BY display_order ASC");
        $stmtSuit->execute(['id' => $product['id']]);
        $product['suitableFor'] = $stmtSuit->fetchAll(PDO::FETCH_COLUMN);

        // Fetch drying comparison
        $stmtComp = $pdo->prepare("SELECT crop_name as product, open_sun_time as openSun, solar_tunnel_time as solarTunnel FROM product_drying_comparison WHERE product_id = :id ORDER BY display_order ASC");
        $stmtComp->execute(['id' => $product['id']]);
        $product['dryingTimeComparison'] = $stmtComp->fetchAll();

        // Fetch secondary images
        $stmtImg = $pdo->prepare("SELECT image_path FROM product_images WHERE product_id = :id ORDER BY display_order ASC");
        $stmtImg->execute(['id' => $product['id']]);
        $product['secondaryImages'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);

        // Alias fields for React compatibility
        $product['category'] = $product['category_name'];
        $product['shortDescription'] = $product['short_description'];
        $product['fullDescription'] = $product['full_description'];
        $product['capacityRange'] = $product['capacity_range'];
        $product['temperatureRange'] = $product['temperature_range'];
        $product['paybackPeriod'] = $product['payback_period'];
        $product['brochureUrl'] = $product['brochure_url'];
        $product['featured'] = (bool)$product['featured'];

        jsonResponse(['success' => true, 'data' => $product]);
    } else {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            JOIN product_categories c ON p.category_id = c.id
            WHERE p.status = 1
            ORDER BY p.display_order ASC, p.created_at DESC
        ");
        $stmt->execute();
        $products = $stmt->fetchAll();

        foreach ($products as &$p) {
            // Fetch features
            $stmtFeat = $pdo->prepare("SELECT feature_text FROM product_features WHERE product_id = :id ORDER BY display_order ASC");
            $stmtFeat->execute(['id' => $p['id']]);
            $p['keyFeatures'] = $stmtFeat->fetchAll(PDO::FETCH_COLUMN);

            // Fetch specs
            $stmtSpec = $pdo->prepare("SELECT spec_key, spec_value FROM product_specifications WHERE product_id = :id ORDER BY display_order ASC");
            $stmtSpec->execute(['id' => $p['id']]);
            $specs = $stmtSpec->fetchAll();
            $specObj = [];
            foreach ($specs as $sp) {
                $specObj[$sp['spec_key']] = $sp['spec_value'];
            }
            $p['specifications'] = $specObj;

            // Fetch suitable for
            $stmtSuit = $pdo->prepare("SELECT item_text FROM product_suitable_for WHERE product_id = :id ORDER BY display_order ASC");
            $stmtSuit->execute(['id' => $p['id']]);
            $p['suitableFor'] = $stmtSuit->fetchAll(PDO::FETCH_COLUMN);

            // Fetch drying comparison
            $stmtComp = $pdo->prepare("SELECT crop_name as product, open_sun_time as openSun, solar_tunnel_time as solarTunnel FROM product_drying_comparison WHERE product_id = :id ORDER BY display_order ASC");
            $stmtComp->execute(['id' => $p['id']]);
            $p['dryingTimeComparison'] = $stmtComp->fetchAll();

            // Fetch secondary images
            $stmtImg = $pdo->prepare("SELECT image_path FROM product_images WHERE product_id = :id ORDER BY display_order ASC");
            $stmtImg->execute(['id' => $p['id']]);
            $p['secondaryImages'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);

            // Format field names
            $p['category'] = $p['category_name'];
            $p['shortDescription'] = $p['short_description'];
            $p['fullDescription'] = $p['full_description'];
            $p['capacityRange'] = $p['capacity_range'];
            $p['temperatureRange'] = $p['temperature_range'];
            $p['paybackPeriod'] = $p['payback_period'];
            $p['brochureUrl'] = $p['brochure_url'];
            $p['featured'] = (bool)$p['featured'];
        }

        jsonResponse(['success' => true, 'data' => $products]);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
