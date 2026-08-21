<?php
// admin/gallery.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/utils/helpers.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();
$message = '';
$error = '';

if (isset($_GET['toggle'])) {
    $id = (int)$_GET['toggle'];
    $pdo->prepare("UPDATE gallery_items SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/gallery.php');
    exit();
}

if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $pdo->prepare("DELETE FROM gallery_items WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/gallery.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = (int)($_POST['id'] ?? 0);
        $title = trim($_POST['title'] ?? '');
        $categoryId = (int)($_POST['category_id'] ?? 1);
        $location = trim($_POST['location'] ?? '');
        $image = trim($_POST['image'] ?? '');
        $order = (int)($_POST['display_order'] ?? 0);
        $status = isset($_POST['status']) ? 1 : 0;

        if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
            $image = handleFileUpload($_FILES['image_file'], 'gallery');
        }

        if (empty($title)) throw new Exception('Title is required.');
        if (empty($image)) throw new Exception('Image is required.');

        if ($id > 0) {
            $stmt = $pdo->prepare("
                UPDATE gallery_items SET
                    title = :title, category_id = :cat, location = :loc,
                    image = :img, display_order = :ord, status = :st
                WHERE id = :id
            ");
            $stmt->execute(['title' => $title, 'cat' => $categoryId, 'loc' => $location, 'img' => $image, 'ord' => $order, 'st' => $status, 'id' => $id]);
            $message = "Gallery photo updated successfully.";
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO gallery_items (title, category_id, location, image, display_order, status, created_at)
                VALUES (:title, :cat, :loc, :img, :ord, :st, CURRENT_TIMESTAMP)
            ");
            $stmt->execute(['title' => $title, 'cat' => $categoryId, 'loc' => $location, 'img' => $image, 'ord' => $order, 'st' => $status]);
            $message = "New gallery photo added successfully.";
        }
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

$pageTitle = "Gallery Management";
require_once __DIR__ . '/includes/header.php';

$categories = $pdo->query("SELECT * FROM gallery_categories WHERE status = 1 ORDER BY display_order ASC")->fetchAll();
$items = $pdo->query("
    SELECT g.*, c.name as category_name
    FROM gallery_items g
    LEFT JOIN gallery_categories c ON g.category_id = c.id
    ORDER BY g.display_order ASC, g.id DESC
")->fetchAll();
?>

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;">
  <div class="card">
    <div class="card-header">
      <h3 id="form-heading">Upload / Add Gallery Photo</h3>
    </div>
    <div class="card-body">
      <?php if ($message): ?>
        <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
      <?php endif; ?>
      <?php if ($error): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="id" id="item_id" value="0">

        <div class="form-group">
          <label>Title / Description *</label>
          <input type="text" name="title" id="item_title" class="form-control" required placeholder="e.g. Polycarbonate Solar Tunnel Dryer Site">
        </div>

        <div class="form-group">
          <label>Gallery Category *</label>
          <select name="category_id" id="item_category_id" class="form-control">
            <?php foreach ($categories as $cat): ?>
              <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['name']) ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="form-group">
          <label>Installation Location / Client Hub</label>
          <input type="text" name="location" id="item_location" class="form-control" placeholder="e.g. Nashik, Maharashtra">
        </div>

        <div class="form-group">
          <label>Image Upload or Image URL *</label>
          <input type="text" name="image" id="item_image" class="form-control" placeholder="Image URL path" style="margin-bottom: 0.5rem;">
          <input type="file" name="image_file" class="form-control" accept="image/*">
        </div>

        <div class="form-group">
          <label>Display Order</label>
          <input type="number" name="display_order" id="item_order" class="form-control" value="0">
        </div>

        <div class="form-group">
          <label><input type="checkbox" name="status" id="item_status" value="1" checked> Active / Published Status</label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">📤 Upload & Save Gallery Item</button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
      <h3>Gallery Photos (<?= count($items) ?> Total)</h3>
      <a href="/admin/gallery-categories.php" class="btn btn-secondary btn-sm">📁 Manage Categories</a>
    </div>
    <div class="card-body" style="padding: 0;">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title & Location</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($items as $g): ?>
              <tr>
                <td>
                  <img src="<?= htmlspecialchars($g['image']) ?>" alt="Gallery" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
                </td>
                <td>
                  <strong><?= htmlspecialchars($g['title']) ?></strong><br>
                  <small style="color: var(--text-muted);">📍 <?= htmlspecialchars($g['location'] ?: 'N/A') ?></small>
                </td>
                <td><?= htmlspecialchars($g['category_name'] ?: 'Uncategorized') ?></td>
                <td>
                  <a href="/admin/gallery.php?toggle=<?= $g['id'] ?>">
                    <?php if ($g['status']): ?>
                      <span class="badge badge-active">Active</span>
                    <?php else: ?>
                      <span class="badge badge-inactive">Inactive</span>
                    <?php endif; ?>
                  </a>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick='editItem(<?= json_encode($g) ?>)'>✏️ Edit</button>
                  <a href="/admin/gallery.php?delete=<?= $g['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete this gallery photo?');">🗑️ Delete</a>
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
function editItem(g) {
  document.getElementById('form-heading').innerText = 'Edit Gallery Item #' + g.id;
  document.getElementById('item_id').value = g.id;
  document.getElementById('item_title').value = g.title;
  document.getElementById('item_category_id').value = g.category_id;
  document.getElementById('item_location').value = g.location || '';
  document.getElementById('item_image').value = g.image;
  document.getElementById('item_order').value = g.display_order;
  document.getElementById('item_status').checked = g.status == 1;
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
