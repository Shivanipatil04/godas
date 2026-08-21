<?php
// admin/index.php
$pageTitle = "Dashboard";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/../backend/config/database.php';

$pdo = Database::getConnection();

$totalProducts = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$totalInquiries = $pdo->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
$newInquiries = $pdo->query("SELECT COUNT(*) FROM inquiries WHERE status = 'New Inquiry'")->fetchColumn();
$totalGallery = $pdo->query("SELECT COUNT(*) FROM gallery_items WHERE status = 1")->fetchColumn();

$recentInquiries = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5")->fetchAll();
?>

<div class="card-grid">
  <div class="stat-card">
    <div class="label">Total Products</div>
    <div class="value"><?= $totalProducts ?></div>
  </div>
  <div class="stat-card">
    <div class="label">New Inquiries</div>
    <div class="value" style="color: var(--accent);"><?= $newInquiries ?></div>
  </div>
  <div class="stat-card">
    <div class="label">Total Leads / Quotes</div>
    <div class="value"><?= $totalInquiries ?></div>
  </div>
  <div class="stat-card">
    <div class="label">Active Gallery Photos</div>
    <div class="value"><?= $totalGallery ?></div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <h3>Recent Customer Inquiries & Leads</h3>
    <a href="/admin/inquiries.php" class="btn btn-secondary btn-sm">View All Inquiries</a>
  </div>
  <div class="card-body" style="padding: 0;">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Phone / Email</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php if (empty($recentInquiries)): ?>
            <tr>
              <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No inquiries received yet.</td>
            </tr>
          <?php else: ?>
            <?php foreach ($recentInquiries as $inq): ?>
              <tr>
                <td><?= date('d M Y, h:i A', strtotime($inq['created_at'])) ?></td>
                <td><strong><?= htmlspecialchars($inq['full_name']) ?></strong></td>
                <td><?= htmlspecialchars($inq['phone']) ?><br><small style="color: var(--text-muted);"><?= htmlspecialchars($inq['email']) ?></small></td>
                <td><?= htmlspecialchars($inq['state_city'] ?: 'N/A') ?></td>
                <td>
                  <span class="badge badge-<?= strtolower(str_replace(' ', '-', $inq['status'])) ?>">
                    <?= htmlspecialchars($inq['status']) ?>
                  </span>
                </td>
                <td>
                  <a href="/admin/inquiries.php?id=<?= $inq['id'] ?>" class="btn btn-secondary btn-sm">View Lead</a>
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
