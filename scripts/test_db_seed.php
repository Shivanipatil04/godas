<?php
// Test database creation and seeding using SQLite via PDO

$dbFile = __DIR__ . '/test_db.sqlite';
if (file_exists($dbFile)) {
    unlink($dbFile);
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $schema = file_get_contents(__DIR__ . '/../database/schema.sql');
    // Convert MySQL specific DDL to SQLite compatible
    $schema = str_replace('ON UPDATE CURRENT_TIMESTAMP', '', $schema);
    $schema = str_replace('INT AUTO_INCREMENT PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
    $schema = str_replace('INTEGER AUTO_INCREMENT PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
    $schema = preg_replace('/ENGINE=InnoDB.*?;/i', ';', $schema);
    $schema = preg_replace('/ENUM\((.*?)\)/i', 'TEXT', $schema);

    $pdo->exec($schema);
    echo "Schema created successfully.\n";

    $seed = file_get_contents(__DIR__ . '/../database/seed.sql');
    $pdo->exec($seed);
    echo "Seed data inserted successfully.\n";

    $tables = ['company_info', 'product_categories', 'products', 'product_images', 'product_features', 'product_specifications', 'product_suitable_for', 'product_drying_comparison', 'gallery_categories', 'gallery_items', 'faq_categories', 'faqs', 'testimonials', 'features', 'industries', 'industry_benefits', 'process_steps', 'stats'];

    foreach ($tables as $table) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM $table");
        $count = $stmt->fetchColumn();
        echo "Table $table count: $count\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
