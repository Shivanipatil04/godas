<?php
// scripts/create_admin.php
// Secure Admin User Creation CLI Script

require_once __DIR__ . '/../backend/config/database.php';

$username = $argv[1] ?? 'admin';
$email = $argv[2] ?? 'admin@godasbusinesscorp.com';
$password = $argv[3] ?? 'GodasAdmin@2026';
$fullName = $argv[4] ?? 'System Administrator';

if (empty($username) || empty($password)) {
    echo "Usage: php scripts/create_admin.php <username> <email> <password> [full_name]\n";
    exit(1);
}

try {
    $pdo = Database::getConnection();
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = :u OR email = :e LIMIT 1");
    $stmt->execute(['u' => $username, 'e' => $email]);
    $existing = $stmt->fetch();

    if ($existing) {
        $update = $pdo->prepare("
            UPDATE admin_users SET
                username = :u, email = :e, password_hash = :p, full_name = :f, status = 1, updated_at = CURRENT_TIMESTAMP
            WHERE id = :id
        ");
        $update->execute(['u' => $username, 'e' => $email, 'p' => $hash, 'f' => $fullName, 'id' => $existing['id']]);
        echo "Admin user '{$username}' updated successfully.\n";
    } else {
        $insert = $pdo->prepare("
            INSERT INTO admin_users (username, email, password_hash, full_name, role, status, created_at)
            VALUES (:u, :e, :p, :f, 'admin', 1, CURRENT_TIMESTAMP)
        ");
        $insert->execute(['u' => $username, 'e' => $email, 'p' => $hash, 'f' => $fullName]);
        echo "Admin user '{$username}' created successfully.\n";
    }

    echo "----------------------------------------\n";
    echo "Username : {$username}\n";
    echo "Email    : {$email}\n";
    echo "Password : {$password}\n";
    echo "----------------------------------------\n";
} catch (Exception $e) {
    echo "Error creating admin user: " . $e->getMessage() . "\n";
    exit(1);
}
