<?php
// admin/company.php
$pageTitle = "Company Settings";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/../backend/config/database.php';

$pdo = Database::getConnection();
$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $name = trim($_POST['name'] ?? '');
        $shortName = trim($_POST['short_name'] ?? '');
        $tagline = trim($_POST['tagline'] ?? '');
        $established = trim($_POST['established'] ?? '');
        $yearsExp = trim($_POST['years_experience'] ?? '');
        $headquarters = trim($_POST['headquarters'] ?? '');
        $address = trim($_POST['address'] ?? '');
        $phoneSales = trim($_POST['phone_sales'] ?? '');
        $phoneTech = trim($_POST['phone_tech'] ?? '');
        $whatsapp = trim($_POST['whatsapp_number'] ?? '');
        $emailSales = trim($_POST['email_sales'] ?? '');
        $emailInfo = trim($_POST['email_info'] ?? '');
        $emailSupport = trim($_POST['email_support'] ?? '');

        $certArr = array_filter(array_map('trim', explode("\n", $_POST['certifications'] ?? '')));
        $highArr = array_filter(array_map('trim', explode("\n", $_POST['highlights'] ?? '')));

        $socialLinks = [
            'facebook' => trim($_POST['fb_link'] ?? ''),
            'instagram' => trim($_POST['insta_link'] ?? ''),
            'youtube' => trim($_POST['yt_link'] ?? ''),
            'linkedin' => trim($_POST['li_link'] ?? ''),
            'whatsapp' => trim($_POST['wa_link'] ?? '')
        ];

        $stmt = $pdo->prepare("
            UPDATE company_info SET
                name = :name, short_name = :short_name, tagline = :tagline,
                established = :established, years_experience = :years_experience,
                headquarters = :headquarters, address = :address,
                phone_sales = :phone_sales, phone_tech = :phone_tech,
                whatsapp_number = :whatsapp_number, email_sales = :email_sales,
                email_info = :email_info, email_support = :email_support,
                certifications = :certifications, highlights = :highlights,
                social_links = :social_links, updated_at = CURRENT_TIMESTAMP
            WHERE id = 1
        ");

        $stmt->execute([
            'name' => $name, 'short_name' => $shortName, 'tagline' => $tagline,
            'established' => $established, 'years_experience' => $yearsExp,
            'headquarters' => $headquarters, 'address' => $address,
            'phone_sales' => $phoneSales, 'phone_tech' => $phoneTech,
            'whatsapp_number' => $whatsapp, 'email_sales' => $emailSales,
            'email_info' => $emailInfo, 'email_support' => $emailSupport,
            'certifications' => json_encode(array_values($certArr)),
            'highlights' => json_encode(array_values($highArr)),
            'social_links' => json_encode($socialLinks)
        ]);

        $message = "Company settings updated successfully.";
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

$c = $pdo->query("SELECT * FROM company_info WHERE id = 1")->fetch();
$certs = json_decode($c['certifications'] ?: '[]', true);
$highlights = json_decode($c['highlights'] ?: '[]', true);
$socials = json_decode($c['social_links'] ?: '{}', true);
?>

<?php if ($message): ?>
  <div class="alert alert-success"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>
<?php if ($error): ?>
  <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<form method="POST">
  <div class="card">
    <div class="card-header">
      <h3>Company Profile & Identification</h3>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Company Legal Name *</label>
          <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($c['name']) ?>" required>
        </div>
        <div class="form-group">
          <label>Short Brand Name</label>
          <input type="text" name="short_name" class="form-control" value="<?= htmlspecialchars($c['short_name']) ?>">
        </div>
      </div>

      <div class="form-group">
        <label>Corporate Tagline</label>
        <input type="text" name="tagline" class="form-control" value="<?= htmlspecialchars($c['tagline']) ?>">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Established Year</label>
          <input type="text" name="established" class="form-control" value="<?= htmlspecialchars($c['established']) ?>">
        </div>
        <div class="form-group">
          <label>Years of Experience</label>
          <input type="text" name="years_experience" class="form-control" value="<?= htmlspecialchars($c['years_experience']) ?>">
        </div>
        <div class="form-group">
          <label>Headquarters City</label>
          <input type="text" name="headquarters" class="form-control" value="<?= htmlspecialchars($c['headquarters']) ?>">
        </div>
      </div>

      <div class="form-group">
        <label>Full Factory / Registered Address</label>
        <textarea name="address" class="form-control"><?= htmlspecialchars($c['address']) ?></textarea>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Contact Information</h3>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Sales Phone</label>
          <input type="text" name="phone_sales" class="form-control" value="<?= htmlspecialchars($c['phone_sales']) ?>">
        </div>
        <div class="form-group">
          <label>Technical Support Phone</label>
          <input type="text" name="phone_tech" class="form-control" value="<?= htmlspecialchars($c['phone_tech']) ?>">
        </div>
        <div class="form-group">
          <label>WhatsApp Number (Raw with country code)</label>
          <input type="text" name="whatsapp_number" class="form-control" value="<?= htmlspecialchars($c['whatsapp_number']) ?>">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Sales Email</label>
          <input type="email" name="email_sales" class="form-control" value="<?= htmlspecialchars($c['email_sales']) ?>">
        </div>
        <div class="form-group">
          <label>General Info Email</label>
          <input type="email" name="email_info" class="form-control" value="<?= htmlspecialchars($c['email_info']) ?>">
        </div>
        <div class="form-group">
          <label>Support Email</label>
          <input type="email" name="email_support" class="form-control" value="<?= htmlspecialchars($c['email_support']) ?>">
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Social Media Links</h3>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Facebook URL</label>
          <input type="text" name="fb_link" class="form-control" value="<?= htmlspecialchars($socials['facebook'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label>Instagram URL</label>
          <input type="text" name="insta_link" class="form-control" value="<?= htmlspecialchars($socials['instagram'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label>YouTube URL</label>
          <input type="text" name="yt_link" class="form-control" value="<?= htmlspecialchars($socials['youtube'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label>LinkedIn URL</label>
          <input type="text" name="li_link" class="form-control" value="<?= htmlspecialchars($socials['linkedin'] ?? '') ?>">
        </div>
      </div>
      <div class="form-group">
        <label>Direct WhatsApp Link</label>
        <input type="text" name="wa_link" class="form-control" value="<?= htmlspecialchars($socials['whatsapp'] ?? '') ?>">
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Certifications & Highlights (One per line)</h3>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Certifications</label>
          <textarea name="certifications" class="form-control" style="min-height: 100px;"><?= htmlspecialchars(implode("\n", $certs)) ?></textarea>
        </div>
        <div class="form-group">
          <label>Key Highlights</label>
          <textarea name="highlights" class="form-control" style="min-height: 100px;"><?= htmlspecialchars(implode("\n", $highlights)) ?></textarea>
        </div>
      </div>
    </div>
  </div>

  <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1rem;">💾 Save Company Settings</button>
</form>

<?php include __DIR__ . '/includes/footer.php'; ?>
