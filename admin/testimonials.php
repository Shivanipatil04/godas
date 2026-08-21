<?php
// admin/testimonials.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/utils/helpers.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();
$message = '';
$error = '';

if (isset($_GET['toggle'])) {
    $id = (int)$_GET['toggle'];
    $pdo->prepare("UPDATE testimonials SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/testimonials.php');
    exit();
}

if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $pdo->prepare("DELETE FROM testimonials WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/testimonials.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = (int)($_POST['id'] ?? 0);
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $org = trim($_POST['organization'] ?? '');
        $loc = trim($_POST['location'] ?? '');
        $quote = trim($_POST['quote'] ?? '');
        $rating = (int)($_POST['rating'] ?? 5);
        $prodUsed = trim($_POST['product_used'] ?? '');
        $image = trim($_POST['image'] ?? '');
        $order = (int)($_POST['display_order'] ?? 0);
        $status = isset($_POST['status']) ? 1 : 0;

        if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
            $image = handleFileUpload($_FILES['image_file'], 'testimonials');
        }

        if (empty($name)) throw new Exception('Client name is required.');
        if (empty($quote)) throw new Exception('Quote text is required.');

        if ($id > 0) {
            $stmt = $pdo->prepare("
                UPDATE testimonials SET
                    name = :n, role = :r, organization = :o, location = :l,
                    image = :img, quote = :q, rating = :rat, product_used = :p,
                    display_order = :ord, status = :st
                WHERE id = :id
            ");
            $stmt->execute(['n' => $name, 'r' => $role, 'o' => $org, 'l' => $loc, 'img' => $image, 'q' => $quote, 'rat' => $rating, 'p' => $prodUsed, 'ord' => $order, 'st' => $status, 'id' => $id]);
            $message = "Testimonial updated successfully.";
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO testimonials (name, role, organization, location, image, quote, rating, product_used, display_order, status, created_at)
                VALUES (:n, :r, :o, :l, :img, :q, :rat, :p, :ord, :st, CURRENT_TIMESTAMP)
            ");
            $stmt->execute(['n' => $name, 'r' => $role, 'o' => $org, 'l' => $loc, 'img' => $image, 'q' => $quote, 'rat' => $rating, 'p' => $prodUsed, 'ord' => $order, 'st' => $status]);
            $message = "Testimonial added successfully.";
        }
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

$pageTitle = "Reviews & Testimonials";
require_once __DIR__ . '/includes/header.php';

$testimonials = $pdo->query("SELECT * FROM testimonials ORDER BY display_order ASC, id DESC")->fetchAll();
?>

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;">
  <div class="card">
    <div class="card-header">
      <h3 id="form-heading">Add / Edit Client Review</h3>
    </div>
    <div class="card-body">
      <?php if ($message): ?>
        <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
      <?php endif; ?>
      <?php if ($error): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="id" id="t_id" value="0">

        <div class="form-group">
          <label>Client Name *</label>
          <input type="text" name="name" id="t_name" class="form-control" required placeholder="e.g. Rajesh Patil">
        </div>

        <div class="form-group">
          <label>Role / Title</label>
          <input type="text" name="role" id="t_role" class="form-control" placeholder="e.g. Chairman">
        </div>

        <div class="form-group">
          <label>Organization / Farm / FPO</label>
          <input type="text" name="organization" id="t_org" class="form-control" placeholder="e.g. Sahyadri Agro Farmer Producer Co. Ltd.">
        </div>

        <div class="form-group">
          <label>Location</label>
          <input type="text" name="location" id="t_loc" class="form-control" placeholder="e.g. Nashik, Maharashtra">
        </div>

        <div class="form-group">
          <label>Product Purchased / Installed</label>
          <input type="text" name="product_used" id="t_prod" class="form-control" placeholder="e.g. Polycarbonate Solar Tunnel Dryer (2000 kg)">
        </div>

        <div class="form-group">
          <label>Rating (1 - 5 Stars)</label>
          <select name="rating" id="t_rating" class="form-control">
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Client Quote / Testimonial *</label>
          <textarea name="quote" id="t_quote" class="form-control" style="min-height: 100px;" required placeholder="Quote text"></textarea>
        </div>

        <div class="form-group">
          <label>Client Photo (URL or File Upload)</label>
          <input type="text" name="image" id="t_image" class="form-control" placeholder="Photo URL" style="margin-bottom: 0.5rem;">
          <input type="file" name="image_file" class="form-control" accept="image/*">
        </div>

        <div class="form-group">
          <label>Display Order</label>
          <input type="number" name="display_order" id="t_order" class="form-control" value="0">
        </div>

        <div class="form-group">
          <label><input type="checkbox" name="status" id="t_status" value="1" checked> Active / Published Status</label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">💾 Save Review</button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Client Testimonials (<?= count($testimonials) ?> Total)</h3>
    </div>
    <div class="card-body" style="padding: 0;">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Organization & Product</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($testimonials as $t): ?>
              <tr>
                <td>
                  <strong><?= htmlspecialchars($t['name']) ?></strong><br>
                  <small style="color: var(--text-muted);"><?= htmlspecialchars($t['role']) ?> - <?= htmlspecialchars($t['location']) ?></small>
                </td>
                <td>
                  <strong><?= htmlspecialchars($t['organization']) ?></strong><br>
                  <small style="color: var(--accent);"><?= htmlspecialchars($t['product_used']) ?></small>
                </td>
                <td><?= str_repeat('⭐', $t['rating']) ?></td>
                <td>
                  <a href="/admin/testimonials.php?toggle=<?= $t['id'] ?>">
                    <?php if ($t['status']): ?>
                      <span class="badge badge-active">Published</span>
                    <?php else: ?>
                      <span class="badge badge-inactive">Hidden</span>
                    <?php endif; ?>
                  </a>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick='editTestimonial(<?= json_encode($t) ?>)'>✏️ Edit</button>
                  <a href="/admin/testimonials.php?delete=<?= $t['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete review?');">🗑️ Delete</a>
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
function editTestimonial(t) {
  document.getElementById('form-heading').innerText = 'Edit Review #' + t.id;
  document.getElementById('t_id').value = t.id;
  document.getElementById('t_name').value = t.name;
  document.getElementById('t_role').value = t.role || '';
  document.getElementById('t_org').value = t.organization || '';
  document.getElementById('t_loc').value = t.location || '';
  document.getElementById('t_prod').value = t.product_used || '';
  document.getElementById('t_rating').value = t.rating;
  document.getElementById('t_quote').value = t.quote;
  document.getElementById('t_image').value = t.image || '';
  document.getElementById('t_order').value = t.display_order;
  document.getElementById('t_status').checked = t.status == 1;
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
