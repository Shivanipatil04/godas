<?php
// admin/login.php
require_once __DIR__ . '/../backend/config/database.php';
require_once __DIR__ . '/../backend/utils/helpers.php';

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $_SESSION = array();
    session_destroy();
    header('Location: /admin/login.php');
    exit();
}

if (isset($_SESSION['admin_user_id'])) {
    header('Location: /admin/index.php');
    exit();
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE (username = :u OR email = :e) AND status = 1 LIMIT 1");
        $stmt->execute(['u' => $username, 'e' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_full_name'] = $user['full_name'];
            $_SESSION['admin_role'] = $user['role'];
            header('Location: /admin/index.php');
            exit();
        } else {
            $error = 'Invalid username or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login - Godas Business Corporation</title>
  <link rel="stylesheet" href="/admin/assets/style.css">
</head>
<body class="login-page">
  <div class="login-card">
    <div class="login-header">
      <h1>Godas Admin Panel</h1>
      <p>Sign in to manage client products, leads & site content</p>
    </div>

    <?php if (!empty($error)): ?>
      <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="/admin/login.php">
      <div class="form-group">
        <label>Username or Email</label>
        <input type="text" name="username" class="form-control" placeholder="Enter username" required autofocus value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">
      </div>

      <div class="form-group">
        <label>Password</label>
        <div style="position: relative;">
          <input type="password" name="password" id="adminPasswordInput" class="form-control" placeholder="Enter password" required style="padding-right: 2.75rem;">
          <button type="button" id="togglePasswordBtn" onclick="togglePasswordVisibility()" style="position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #64748b; font-size: 1.1rem; padding: 0.2rem 0.4rem; border-radius: 4px;" title="Show/Hide Password">
            👁️
          </button>
        </div>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; font-weight: 600; font-size: 0.8rem; color: #64748b; cursor: pointer; user-select: none;">
          <input type="checkbox" id="showPasswordCheckbox" onchange="togglePasswordVisibility()">
          Show password
        </label>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem; margin-top: 0.5rem;">
        Sign In to Dashboard
      </button>
    </form>
  </div>

  <script>
    function togglePasswordVisibility() {
      const passwordInput = document.getElementById('adminPasswordInput');
      const checkbox = document.getElementById('showPasswordCheckbox');
      const btn = document.getElementById('togglePasswordBtn');
      
      const show = passwordInput.type === 'password';
      passwordInput.type = show ? 'text' : 'password';
      checkbox.checked = show;
      btn.innerHTML = show ? '🙈' : '👁️';
    }
  </script>
</body>
</html>
