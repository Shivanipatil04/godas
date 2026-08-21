<?php
// admin/product-edit.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/utils/helpers.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();
$message = '';
$error = '';

$id = $_GET['id'] ?? null;
$pageTitle = $id ? "Edit Product: " . htmlspecialchars($id) : "Create New Product";

$categories = $pdo->query("SELECT * FROM product_categories WHERE status = 1 ORDER BY display_order ASC")->fetchAll();

$product = [
    'id' => '', 'slug' => '', 'name' => '', 'tagline' => '', 'category_id' => $categories[0]['id'] ?? 1,
    'featured' => 1, 'capacity_range' => '', 'efficiency' => '', 'temperature_range' => '',
    'payback_period' => '', 'image' => '/backend/uploads/products/product-1.jpeg',
    'short_description' => '', 'full_description' => '', 'brochure_url' => '#quote-modal',
    'display_order' => 0, 'status' => 1, 'keyFeatures' => [], 'specifications' => [],
    'suitableFor' => [], 'dryingComparison' => [], 'secondaryImages' => []
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $name = trim($_POST['name'] ?? '');
        $prodId = trim($_POST['id'] ?? '');
        if (empty($prodId)) {
            $prodId = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
        }
        $slug = trim($_POST['slug'] ?? '') ?: $prodId;
        $tagline = trim($_POST['tagline'] ?? '');
        $categoryId = (int)($_POST['category_id'] ?? 1);
        $featured = isset($_POST['featured']) ? 1 : 0;
        $capacityRange = trim($_POST['capacity_range'] ?? '');
        $efficiency = trim($_POST['efficiency'] ?? '');
        $tempRange = trim($_POST['temperature_range'] ?? '');
        $payback = trim($_POST['payback_period'] ?? '');
        $shortDesc = trim($_POST['short_description'] ?? '');
        $fullDesc = trim($_POST['full_description'] ?? '');
        $brochureUrl = trim($_POST['brochure_url'] ?? '#quote-modal');
        $order = (int)($_POST['display_order'] ?? 0);
        $status = isset($_POST['status']) ? 1 : 0;
        $image = trim($_POST['image'] ?? '');

        // Handle Image Upload if provided
        if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
            $image = handleFileUpload($_FILES['image_file'], 'products');
        }

        if (empty($name)) throw new Exception('Product name is required.');
        if (empty($image)) $image = '/backend/uploads/products/product-1.jpeg';

        $pdo->beginTransaction();

        $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE id = :id");
        $checkStmt->execute(['id' => $prodId]);
        $exists = $checkStmt->fetchColumn() > 0;

        if ($exists) {
            $stmt = $pdo->prepare("
                UPDATE products SET
                    slug = :slug, name = :name, tagline = :tagline, category_id = :cat,
                    featured = :feat, capacity_range = :cap, efficiency = :eff,
                    temperature_range = :temp, payback_period = :pay, image = :img,
                    short_description = :short, full_description = :full, brochure_url = :bro,
                    display_order = :ord, status = :st, updated_at = CURRENT_TIMESTAMP
                WHERE id = :id
            ");
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO products (
                    id, slug, name, tagline, category_id, featured, capacity_range, efficiency,
                    temperature_range, payback_period, image, short_description, full_description,
                    brochure_url, display_order, status, created_at
                ) VALUES (
                    :id, :slug, :name, :tagline, :cat, :feat, :cap, :eff,
                    :temp, :pay, :img, :short, :full, :bro, :ord, :st, CURRENT_TIMESTAMP
                )
            ");
        }

        $stmt->execute([
            'id' => $prodId, 'slug' => $slug, 'name' => $name, 'tagline' => $tagline, 'cat' => $categoryId,
            'feat' => $featured, 'cap' => $capacityRange, 'eff' => $efficiency, 'temp' => $tempRange,
            'pay' => $payback, 'img' => $image, 'short' => $shortDesc, 'full' => $fullDesc,
            'bro' => $brochureUrl, 'ord' => $order, 'st' => $status
        ]);

        // Key Features
        $pdo->prepare("DELETE FROM product_features WHERE product_id = :id")->execute(['id' => $prodId]);
        if (!empty($_POST['key_features'])) {
            $lines = explode("\n", $_POST['key_features']);
            $featStmt = $pdo->prepare("INSERT INTO product_features (product_id, feature_text, display_order) VALUES (:id, :txt, :ord)");
            $ord = 1;
            foreach ($lines as $line) {
                if (!empty(trim($line))) {
                    $featStmt->execute(['id' => $prodId, 'txt' => trim($line), 'ord' => $ord++]);
                }
            }
        }

        // Suitable For
        $pdo->prepare("DELETE FROM product_suitable_for WHERE product_id = :id")->execute(['id' => $prodId]);
        if (!empty($_POST['suitable_for'])) {
            $lines = explode("\n", $_POST['suitable_for']);
            $suitStmt = $pdo->prepare("INSERT INTO product_suitable_for (product_id, item_text, display_order) VALUES (:id, :txt, :ord)");
            $ord = 1;
            foreach ($lines as $line) {
                if (!empty(trim($line))) {
                    $suitStmt->execute(['id' => $prodId, 'txt' => trim($line), 'ord' => $ord++]);
                }
            }
        }

        // Specifications
        $pdo->prepare("DELETE FROM product_specifications WHERE product_id = :id")->execute(['id' => $prodId]);
        if (!empty($_POST['spec_keys']) && is_array($_POST['spec_keys'])) {
            $specStmt = $pdo->prepare("INSERT INTO product_specifications (product_id, spec_key, spec_value, display_order) VALUES (:id, :k, :v, :ord)");
            foreach ($_POST['spec_keys'] as $idx => $k) {
                $v = $_POST['spec_values'][$idx] ?? '';
                if (!empty(trim($k))) {
                    $specStmt->execute(['id' => $prodId, 'k' => trim($k), 'v' => trim($v), 'ord' => $idx + 1]);
                }
            }
        }

        $pdo->commit();
        header("Location: /admin/product-edit.php?id=" . urlencode($prodId) . "&saved=1");
        exit();
    } catch (Exception $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        $error = $e->getMessage();
    }
}

if ($id) {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $existing = $stmt->fetch();
    if ($existing) {
        $product = array_merge($product, $existing);

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
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
  <h2><?= $id ? 'Edit Product: ' . htmlspecialchars($product['name']) : 'Create New Product' ?></h2>
  <a href="/admin/products.php" class="btn btn-secondary">⬅️ Back to Products</a>
</div>

<?php if (isset($_GET['saved'])): ?>
  <div class="alert alert-success">Product saved successfully.</div>
<?php endif; ?>
<?php if ($error): ?>
  <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<form method="POST" enctype="multipart/form-data">
  <div class="card">
    <div class="card-header">
      <h3>Basic Information</h3>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Product ID (Unique Slug Key)</label>
          <input type="text" name="id" class="form-control" value="<?= htmlspecialchars($product['id']) ?>" placeholder="e.g. polycarbonate-solar-tunnel-dryer" <?= $id ? 'readonly' : '' ?>>
        </div>
        <div class="form-group">
          <label>URL Slug</label>
          <input type="text" name="slug" class="form-control" value="<?= htmlspecialchars($product['slug']) ?>" placeholder="e.g. solar-tunnel-dryer-fruits-vegetables">
        </div>
      </div>

      <div class="form-group">
        <label>Product Name *</label>
        <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($product['name']) ?>" required>
      </div>

      <div class="form-group">
        <label>Tagline</label>
        <input type="text" name="tagline" class="form-control" value="<?= htmlspecialchars($product['tagline']) ?>">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Category *</label>
          <select name="category_id" class="form-control">
            <?php foreach ($categories as $cat): ?>
              <option value="<?= $cat['id'] ?>" <?= $cat['id'] == $product['category_id'] ? 'selected' : '' ?>>
                <?= htmlspecialchars($cat['name']) ?>
              </option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="form-group">
          <label>Capacity Range</label>
          <input type="text" name="capacity_range" class="form-control" value="<?= htmlspecialchars($product['capacity_range']) ?>" placeholder="e.g. 100 kg to 5,000 kg / batch">
        </div>

        <div class="form-group">
          <label>Thermal Efficiency</label>
          <input type="text" name="efficiency" class="form-control" value="<?= htmlspecialchars($product['efficiency']) ?>" placeholder="e.g. 85% Solar Thermal Absorption">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Temperature Range</label>
          <input type="text" name="temperature_range" class="form-control" value="<?= htmlspecialchars($product['temperature_range']) ?>" placeholder="e.g. 45°C - 70°C">
        </div>

        <div class="form-group">
          <label>ROI Payback Period</label>
          <input type="text" name="payback_period" class="form-control" value="<?= htmlspecialchars($product['payback_period']) ?>" placeholder="e.g. 12 - 18 Months">
        </div>

        <div class="form-group">
          <label>Brochure Link / Modal Target</label>
          <input type="text" name="brochure_url" class="form-control" value="<?= htmlspecialchars($product['brochure_url']) ?>">
        </div>
      </div>

      <div class="form-group">
        <label>Main Product Image URL or File Upload</label>
        <input type="text" name="image" class="form-control" value="<?= htmlspecialchars($product['image']) ?>" style="margin-bottom: 0.5rem;">
        <input type="file" name="image_file" class="form-control" accept="image/*">
        <?php if (!empty($product['image'])): ?>
          <div style="margin-top: 0.5rem;">
            <img src="<?= htmlspecialchars($product['image']) ?>" style="height: 80px; border-radius: 6px;">
          </div>
        <?php endif; ?>
      </div>

      <div class="form-group">
        <label>Short Description (Overview Card)</label>
        <textarea name="short_description" class="form-control"><?= htmlspecialchars($product['short_description']) ?></textarea>
      </div>

      <div class="form-group">
        <label>Full Description (Detail Page)</label>
        <textarea name="full_description" class="form-control" style="min-height: 140px;"><?= htmlspecialchars($product['full_description']) ?></textarea>
      </div>

      <div style="display: flex; gap: 2rem; align-items: center; margin-top: 1rem;">
        <label><input type="checkbox" name="featured" value="1" <?= $product['featured'] ? 'checked' : '' ?>> Featured Product ⭐</label>
        <label><input type="checkbox" name="status" value="1" <?= $product['status'] ? 'checked' : '' ?>> Active Status</label>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Key Features (One feature per line)</h3>
    </div>
    <div class="card-body">
      <textarea name="key_features" class="form-control" style="min-height: 120px;"><?= htmlspecialchars(implode("\n", $product['keyFeatures'])) ?></textarea>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Suitable Crops & Uses (One item per line)</h3>
    </div>
    <div class="card-body">
      <textarea name="suitable_for" class="form-control" style="min-height: 100px;"><?= htmlspecialchars(implode("\n", $product['suitableFor'])) ?></textarea>
    </div>
  </div>

  <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1rem;">💾 Save Product</button>
</form>

<?php include __DIR__ . '/includes/footer.php'; ?>
