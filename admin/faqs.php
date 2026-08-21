<?php
// admin/faqs.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();
$message = '';
$error = '';

if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $pdo->prepare("DELETE FROM faqs WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/faqs.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = (int)($_POST['id'] ?? 0);
        $categoryId = (int)($_POST['category_id'] ?? 1);
        $question = trim($_POST['question'] ?? '');
        $answer = trim($_POST['answer'] ?? '');
        $order = (int)($_POST['display_order'] ?? 0);
        $status = isset($_POST['status']) ? 1 : 0;

        if (empty($question)) throw new Exception('Question is required.');
        if (empty($answer)) throw new Exception('Answer is required.');

        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE faqs SET category_id = :cat, question = :q, answer = :a, display_order = :ord, status = :st WHERE id = :id");
            $stmt->execute(['cat' => $categoryId, 'q' => $question, 'a' => $answer, 'ord' => $order, 'st' => $status, 'id' => $id]);
            $message = "FAQ updated successfully.";
        } else {
            $stmt = $pdo->prepare("INSERT INTO faqs (category_id, question, answer, display_order, status, created_at) VALUES (:cat, :q, :a, :ord, :st, CURRENT_TIMESTAMP)");
            $stmt->execute(['cat' => $categoryId, 'q' => $question, 'a' => $answer, 'ord' => $order, 'st' => $status]);
            $message = "FAQ created successfully.";
        }
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

$pageTitle = "FAQ Management";
require_once __DIR__ . '/includes/header.php';

$categories = $pdo->query("SELECT * FROM faq_categories WHERE status = 1 ORDER BY display_order ASC")->fetchAll();
$faqs = $pdo->query("
    SELECT f.*, c.name as category_name
    FROM faqs f
    LEFT JOIN faq_categories c ON f.category_id = c.id
    ORDER BY c.display_order ASC, f.display_order ASC, f.id ASC
")->fetchAll();
?>

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;">
  <div class="card">
    <div class="card-header">
      <h3 id="form-title">Add / Edit FAQ</h3>
    </div>
    <div class="card-body">
      <?php if ($message): ?>
        <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
      <?php endif; ?>
      <?php if ($error): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="POST">
        <input type="hidden" name="id" id="faq_id" value="0">

        <div class="form-group">
          <label>Category *</label>
          <select name="category_id" id="faq_category_id" class="form-control">
            <?php foreach ($categories as $cat): ?>
              <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['name']) ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="form-group">
          <label>Question *</label>
          <textarea name="question" id="faq_question" class="form-control" required placeholder="Question text"></textarea>
        </div>

        <div class="form-group">
          <label>Answer *</label>
          <textarea name="answer" id="faq_answer" class="form-control" style="min-height: 120px;" required placeholder="Answer text"></textarea>
        </div>

        <div class="form-group">
          <label>Display Order</label>
          <input type="number" name="display_order" id="faq_order" class="form-control" value="0">
        </div>

        <div class="form-group">
          <label><input type="checkbox" name="status" id="faq_status" value="1" checked> Active Status</label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">💾 Save FAQ</button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
      <h3>All FAQs (<?= count($faqs) ?> Total)</h3>
      <a href="/admin/faq-categories.php" class="btn btn-secondary btn-sm">📁 Manage FAQ Categories</a>
    </div>
    <div class="card-body" style="padding: 0;">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Question & Answer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($faqs as $f): ?>
              <tr>
                <td><span class="badge badge-new"><?= htmlspecialchars($f['category_name'] ?: 'General') ?></span></td>
                <td>
                  <strong><?= htmlspecialchars($f['question']) ?></strong><br>
                  <small style="color: var(--text-muted); display: block; max-width: 450px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <?= htmlspecialchars($f['answer']) ?>
                  </small>
                </td>
                <td>
                  <?php if ($f['status']): ?>
                    <span class="badge badge-active">Active</span>
                  <?php else: ?>
                    <span class="badge badge-inactive">Inactive</span>
                  <?php endif; ?>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick='editFaq(<?= json_encode($f) ?>)'>✏️ Edit</button>
                  <a href="/admin/faqs.php?delete=<?= $f['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete this FAQ?');">🗑️ Delete</a>
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
function editFaq(f) {
  document.getElementById('form-title').innerText = 'Edit FAQ #' + f.id;
  document.getElementById('faq_id').value = f.id;
  document.getElementById('faq_category_id').value = f.category_id;
  document.getElementById('faq_question').value = f.question;
  document.getElementById('faq_answer').value = f.answer;
  document.getElementById('faq_order').value = f.display_order;
  document.getElementById('faq_status').checked = f.status == 1;
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
