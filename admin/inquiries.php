<?php
// admin/inquiries.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/middleware/auth.php';

requireAdminAuth(false);

$pdo = Database::getConnection();

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)($_POST['id'] ?? 0);
    $status = trim($_POST['status'] ?? 'New Inquiry');
    $notes = trim($_POST['notes'] ?? '');

    if ($id > 0) {
        $stmt = $pdo->prepare("UPDATE inquiries SET status = :s, notes = :n, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
        $stmt->execute(['s' => $status, 'n' => $notes, 'id' => $id]);
        $message = "Lead updated successfully.";
    }
}

if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $pdo->prepare("DELETE FROM inquiries WHERE id = :id")->execute(['id' => $id]);
    header('Location: /admin/inquiries.php');
    exit();
}

$pageTitle = "Inquiries & Leads";
require_once __DIR__ . '/includes/header.php';

$statusFilter = $_GET['status'] ?? 'all';
$searchQuery = trim($_GET['search'] ?? '');

$sql = "SELECT * FROM inquiries WHERE 1=1";
$params = [];

if ($statusFilter !== 'all') {
    $sql .= " AND status = :st";
    $params['st'] = $statusFilter;
}

if (!empty($searchQuery)) {
    $sql .= " AND (full_name LIKE :s OR email LIKE :s OR phone LIKE :s OR state_city LIKE :s OR crop_type LIKE :s)";
    $params['s'] = '%' . $searchQuery . '%';
}

$sql .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$inquiries = $stmt->fetchAll();

// Counts for filter pills
$allCounts = $pdo->query("SELECT status, COUNT(*) as cnt FROM inquiries GROUP BY status")->fetchAll();
$counts = ['all' => 0, 'New Inquiry' => 0, 'DPR Sent' => 0, 'Quote Sent' => 0, 'Site Survey Done' => 0, 'Completed' => 0];
foreach ($allCounts as $c) {
    $counts[$c['status']] = (int)$c['cnt'];
    $counts['all'] += (int)$c['cnt'];
}

$selectedId = (int)($_GET['id'] ?? 0);
$selectedLead = null;
if ($selectedId > 0) {
    $stmtLead = $pdo->prepare("SELECT * FROM inquiries WHERE id = :id");
    $stmtLead->execute(['id' => $selectedId]);
    $selectedLead = $stmtLead->fetch();
}
?>

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <a href="/admin/inquiries.php?status=all" class="btn <?= $statusFilter === 'all' ? 'btn-primary' : 'btn-secondary' ?>">
    All Leads (<?= $counts['all'] ?>)
  </a>
  <a href="/admin/inquiries.php?status=New Inquiry" class="btn <?= $statusFilter === 'New Inquiry' ? 'btn-primary' : 'btn-secondary' ?>">
    🆕 New Inquiry (<?= $counts['New Inquiry'] ?>)
  </a>
  <a href="/admin/inquiries.php?status=DPR Sent" class="btn <?= $statusFilter === 'DPR Sent' ? 'btn-primary' : 'btn-secondary' ?>">
    📄 DPR Sent (<?= $counts['DPR Sent'] ?>)
  </a>
  <a href="/admin/inquiries.php?status=Quote Sent" class="btn <?= $statusFilter === 'Quote Sent' ? 'btn-primary' : 'btn-secondary' ?>">
    💰 Quote Sent (<?= $counts['Quote Sent'] ?>)
  </a>
  <a href="/admin/inquiries.php?status=Site Survey Done" class="btn <?= $statusFilter === 'Site Survey Done' ? 'btn-primary' : 'btn-secondary' ?>">
    📍 Site Survey Done (<?= $counts['Site Survey Done'] ?>)
  </a>
  <a href="/admin/inquiries.php?status=Completed" class="btn <?= $statusFilter === 'Completed' ? 'btn-primary' : 'btn-secondary' ?>">
    ✅ Completed (<?= $counts['Completed'] ?>)
  </a>
</div>

<?php if ($message): ?>
  <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<?php if ($selectedLead): ?>
  <div class="card" style="border: 2px solid var(--accent);">
    <div class="card-header" style="background: #0f172a; display: flex; justify-content: space-between; align-items: center;">
      <h3>Lead Details #<?= $selectedLead['id'] ?>: <?= htmlspecialchars($selectedLead['full_name']) ?></h3>
      <a href="/admin/inquiries.php" class="btn btn-secondary btn-sm">Close Inspector ✖️</a>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
        <div>
          <p><strong>Name:</strong> <?= htmlspecialchars($selectedLead['full_name']) ?></p>
          <p><strong>Phone:</strong> <a href="tel:<?= htmlspecialchars($selectedLead['phone']) ?>" style="color: var(--accent);"><?= htmlspecialchars($selectedLead['phone']) ?></a></p>
          <p><strong>Email:</strong> <a href="mailto:<?= htmlspecialchars($selectedLead['email']) ?>" style="color: var(--accent);"><?= htmlspecialchars($selectedLead['email']) ?></a></p>
          <p><strong>Location:</strong> <?= htmlspecialchars($selectedLead['state_city'] ?: 'Not specified') ?></p>
          <p><strong>Product Interest:</strong> <?= htmlspecialchars($selectedLead['product_id'] ?: 'General Inquiry') ?></p>
          <p><strong>Crop / Material:</strong> <?= htmlspecialchars($selectedLead['crop_type'] ?: 'N/A') ?></p>
          <p><strong>Capacity / Quantity:</strong> <?= htmlspecialchars($selectedLead['quantity_capacity'] ?: 'N/A') ?></p>
          <p><strong>Drying Purpose:</strong> <?= htmlspecialchars($selectedLead['drying_purpose'] ?: 'N/A') ?></p>
          <p><strong>Timeline:</strong> <?= htmlspecialchars($selectedLead['timeline'] ?: 'N/A') ?></p>
          <p><strong>Source:</strong> <?= htmlspecialchars($selectedLead['source']) ?></p>
          <p><strong>Date Received:</strong> <?= date('F j, Y, g:i a', strtotime($selectedLead['created_at'])) ?></p>
          <div style="margin-top: 1rem; padding: 1rem; background: #0f172a; border-radius: 6px;">
            <strong>Customer Message:</strong><br>
            <?= nl2br(htmlspecialchars($selectedLead['message'] ?: 'No message provided.')) ?>
          </div>
        </div>

        <form method="POST" style="background: #0f172a; padding: 1rem; border-radius: 6px;">
          <input type="hidden" name="id" value="<?= $selectedLead['id'] ?>">

          <div class="form-group">
            <label>Update Pipeline Stage</label>
            <select name="status" class="form-control">
              <option value="New Inquiry" <?= $selectedLead['status'] === 'New Inquiry' ? 'selected' : '' ?>>🆕 New Inquiry</option>
              <option value="DPR Sent" <?= $selectedLead['status'] === 'DPR Sent' ? 'selected' : '' ?>>📄 DPR Sent</option>
              <option value="Quote Sent" <?= $selectedLead['status'] === 'Quote Sent' ? 'selected' : '' ?>>💰 Quote Sent</option>
              <option value="Site Survey Done" <?= $selectedLead['status'] === 'Site Survey Done' ? 'selected' : '' ?>>📍 Site Survey Done</option>
              <option value="Completed" <?= $selectedLead['status'] === 'Completed' ? 'selected' : '' ?>>✅ Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label>Internal Admin Notes</label>
            <textarea name="notes" class="form-control" style="min-height: 120px;" placeholder="Add notes for team..."><?= htmlspecialchars($selectedLead['notes'] ?: '') ?></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">💾 Save Lead Status & Notes</button>
        </form>
      </div>
    </div>
  </div>
<?php endif; ?>

<div class="card">
  <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
    <h3>Inquiry Records</h3>
    <form method="GET" style="display: flex; gap: 0.5rem;">
      <input type="hidden" name="status" value="<?= htmlspecialchars($statusFilter) ?>">
      <input type="text" name="search" class="form-control" placeholder="Search by name, email, phone..." value="<?= htmlspecialchars($searchQuery) ?>" style="width: 250px;">
      <button type="submit" class="btn btn-secondary">Search</button>
    </form>
  </div>
  <div class="card-body" style="padding: 0;">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name & Contact</th>
            <th>Location</th>
            <th>Crop / Product</th>
            <th>Status Pipeline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php if (empty($inquiries)): ?>
            <tr>
              <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No inquiries found matching criteria.</td>
            </tr>
          <?php else: ?>
            <?php foreach ($inquiries as $inq): ?>
              <tr>
                <td><?= date('d M Y', strtotime($inq['created_at'])) ?><br><small style="color: var(--text-muted);"><?= date('h:i A', strtotime($inq['created_at'])) ?></small></td>
                <td>
                  <strong><?= htmlspecialchars($inq['full_name']) ?></strong><br>
                  <small>📞 <?= htmlspecialchars($inq['phone']) ?></small><br>
                  <small style="color: var(--text-muted);"><?= htmlspecialchars($inq['email']) ?></small>
                </td>
                <td><?= htmlspecialchars($inq['state_city'] ?: 'N/A') ?></td>
                <td>
                  <strong><?= htmlspecialchars($inq['crop_type'] ?: $inq['product_id'] ?: 'General') ?></strong>
                  <?php if ($inq['quantity_capacity']): ?>
                    <br><small style="color: var(--text-muted);"><?= htmlspecialchars($inq['quantity_capacity']) ?></small>
                  <?php endif; ?>
                </td>
                <td>
                  <span class="badge badge-<?= strtolower(str_replace(' ', '-', $inq['status'])) ?>">
                    <?= htmlspecialchars($inq['status']) ?>
                  </span>
                </td>
                <td>
                  <a href="/admin/inquiries.php?id=<?= $inq['id'] ?>" class="btn btn-primary btn-sm">🔍 Inspect Lead</a>
                  <a href="/admin/inquiries.php?delete=<?= $inq['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete lead record?');">🗑️</a>
                </td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
