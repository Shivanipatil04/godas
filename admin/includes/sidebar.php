<?php
// admin/includes/sidebar.php
$currentScript = basename($_SERVER['SCRIPT_NAME']);
?>
<aside class="sidebar">
  <div class="sidebar-header">
    <h2>GBC Admin Panel</h2>
  </div>
  <ul class="sidebar-menu">
    <li><a href="/admin/index.php" class="<?= $currentScript === 'index.php' ? 'active' : '' ?>">📊 Dashboard</a></li>
    <li><a href="/admin/products.php" class="<?= in_array($currentScript, ['products.php', 'product-edit.php']) ? 'active' : '' ?>">📦 Products</a></li>
    <li><a href="/admin/product-categories.php" class="<?= $currentScript === 'product-categories.php' ? 'active' : '' ?>">📂 Product Categories</a></li>
    <li><a href="/admin/gallery.php" class="<?= $currentScript === 'gallery.php' ? 'active' : '' ?>">🖼️ Gallery</a></li>
    <li><a href="/admin/gallery-categories.php" class="<?= $currentScript === 'gallery-categories.php' ? 'active' : '' ?>">📁 Gallery Categories</a></li>
    <li><a href="/admin/faqs.php" class="<?= $currentScript === 'faqs.php' ? 'active' : '' ?>">❓ FAQs</a></li>
    <li><a href="/admin/faq-categories.php" class="<?= $currentScript === 'faq-categories.php' ? 'active' : '' ?>">📁 FAQ Categories</a></li>
    <li><a href="/admin/testimonials.php" class="<?= $currentScript === 'testimonials.php' ? 'active' : '' ?>">⭐ Reviews & Testimonials</a></li>
    <li><a href="/admin/inquiries.php" class="<?= $currentScript === 'inquiries.php' ? 'active' : '' ?>">📩 Inquiries & Leads</a></li>
    <li><a href="/admin/company.php" class="<?= $currentScript === 'company.php' ? 'active' : '' ?>">🏢 Company Settings</a></li>
  </ul>
</aside>
