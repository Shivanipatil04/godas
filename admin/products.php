<?php
// admin/products.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();

// Action: Toggle Status
if (isset($_GET['action']) && $_GET['action'] === 'toggle_status') {
    $id = $_GET['id'] ?? '';
    $pdo->prepare("UPDATE products SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/products.php');
    exit();
}

// Action: Delete
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $id = $_GET['id'] ?? '';
    $pdo->prepare("DELETE FROM products WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/products.php?msg=deleted');
    exit();
}

$pageTitle = "Products Management";
require_once __DIR__ . '/includes/header.php';

$products = $pdo->query("
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.id
    ORDER BY p.display_order ASC, p.created_at DESC
")->fetchAll();
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
  <h2>All Equipment & Dryer Models</h2>
  <a href="/admin/product-edit.php" class="btn btn-primary">➕ Add New Product</a>
</div>

<?php if (isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
  <div class="alert alert-success">Product deleted successfully.</div>
<?php endif; ?>

<div class="card">
  <div class="card-body" style="padding: 0;">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Capacity</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($products as $p): ?>
            <tr>
              <td>
                <img src="<?= htmlspecialchars($p['image']) ?>" alt="Product" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
              </td>
              <td>
                <strong><?= htmlspecialchars($p['name']) ?></strong><br>
                <small style="color: var(--text-muted);"><?= htmlspecialchars($p['tagline']) ?></small>
              </td>
              <td><?= htmlspecialchars($p['category_name'] ?: 'Uncategorized') ?></td>
              <td><?= htmlspecialchars($p['capacity_range']) ?></td>
              <td>
                <?php if ($p['featured']): ?>
                  <span class="badge badge-active">Featured ⭐</span>
                <?php else: ?>
                  <span style="color: var(--text-muted);">Standard</span>
                <?php endif; ?>
              </td>
              <td>
                <a href="/admin/products.php?action=toggle_status&id=<?= urlencode($p['id']) ?>">
                  <?php if ($p['status']): ?>
                    <span class="badge badge-active">Active</span>
                  <?php else: ?>
                    <span class="badge badge-inactive">Inactive</span>
                  <?php endif; ?>
                </a>
              </td>
              <td>
                <a href="/admin/product-edit.php?id=<?= urlencode($p['id']) ?>" class="btn btn-secondary btn-sm">✏️ Edit</a>
                <a href="/admin/products.php?action=delete&id=<?= urlencode($p['id']) ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this product?');">🗑️ Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
