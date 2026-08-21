<?php
// admin/product-categories.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();
$message = '';

if (isset($_GET['delete'])) {
    $delId = (int)$_GET['delete'];
    $pdo->prepare("DELETE FROM product_categories WHERE id = :id")->execute(['id' => $delId]);
    header('Location: /admin/product-categories.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $slug = trim($_POST['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
    $desc = trim($_POST['description'] ?? '');
    $order = (int)($_POST['display_order'] ?? 0);
    $status = isset($_POST['status']) ? 1 : 0;

    if (!empty($name)) {
        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE product_categories SET name = :n, slug = :s, description = :d, display_order = :o, status = :st WHERE id = :id");
            $stmt->execute(['n' => $name, 's' => $slug, 'd' => $desc, 'o' => $order, 'st' => $status, 'id' => $id]);
            $message = "Category updated successfully.";
        } else {
            $stmt = $pdo->prepare("INSERT INTO product_categories (name, slug, description, display_order, status) VALUES (:n, :s, :d, :o, :st)");
            $stmt->execute(['n' => $name, 's' => $slug, 'd' => $desc, 'o' => $order, 'st' => $status]);
            $message = "Category created successfully.";
        }
    }
}

$pageTitle = "Product Categories";
require_once __DIR__ . '/includes/header.php';

$categories = $pdo->query("SELECT * FROM product_categories ORDER BY display_order ASC")->fetchAll();
?>

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;">
  <div class="card">
    <div class="card-header">
      <h3>Add / Edit Category</h3>
    </div>
    <div class="card-body">
      <?php if ($message): ?>
        <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
      <?php endif; ?>

      <form method="POST">
        <input type="hidden" name="id" id="cat_id" value="0">

        <div class="form-group">
          <label>Category Name *</label>
          <input type="text" name="name" id="cat_name" class="form-control" required placeholder="e.g. Solar Dryers">
        </div>

        <div class="form-group">
          <label>Slug</label>
          <input type="text" name="slug" id="cat_slug" class="form-control" placeholder="e.g. solar-dryers">
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea name="description" id="cat_desc" class="form-control" placeholder="Short description"></textarea>
        </div>

        <div class="form-group">
          <label>Display Order</label>
          <input type="number" name="display_order" id="cat_order" class="form-control" value="0">
        </div>

        <div class="form-group">
          <label><input type="checkbox" name="status" id="cat_status" value="1" checked> Active Status</label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">💾 Save Category</button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Existing Product Categories</h3>
    </div>
    <div class="card-body" style="padding: 0;">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($categories as $c): ?>
              <tr>
                <td><?= $c['id'] ?></td>
                <td><strong><?= htmlspecialchars($c['name']) ?></strong></td>
                <td><code><?= htmlspecialchars($c['slug']) ?></code></td>
                <td><?= $c['display_order'] ?></td>
                <td>
                  <?php if ($c['status']): ?>
                    <span class="badge badge-active">Active</span>
                  <?php else: ?>
                    <span class="badge badge-inactive">Inactive</span>
                  <?php endif; ?>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick='editCategory(<?= json_encode($c) ?>)'>✏️ Edit</button>
                  <a href="/admin/product-categories.php?delete=<?= $c['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete this category?');">🗑️ Delete</a>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<script>
function editCategory(c) {
  document.getElementById('cat_id').value = c.id;
  document.getElementById('cat_name').value = c.name;
  document.getElementById('cat_slug').value = c.slug;
  document.getElementById('cat_desc').value = c.description || '';
  document.getElementById('cat_order').value = c.display_order;
  document.getElementById('cat_status').checked = c.status == 1;
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
