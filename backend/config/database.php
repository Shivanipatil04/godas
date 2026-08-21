<?php
// backend/config/database.php
require_once __DIR__ . '/config.php';

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $driver = getenv('DB_DRIVER') ?: 'mysql';
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $dbname = getenv('DB_NAME') ?: 'godas_db';
            $username = getenv('DB_USER') ?: 'root';
            $password = getenv('DB_PASS') ?: '';
            $sqlitePath = getenv('DB_SQLITE_PATH') ?: __DIR__ . '/../../database/database.sqlite';

            try {
                if ($driver === 'sqlite' || (file_exists($sqlitePath) && !getenv('DB_HOST'))) {
                    self::$instance = new PDO("sqlite:" . $sqlitePath);
                } else {
                    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
                    self::$instance = new PDO($dsn, $username, $password, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]);
                }
            } catch (PDOException $e) {
                // If MySQL connection fails, fallback to SQLite for local development
                $sqliteDir = dirname($sqlitePath);
                if (!is_dir($sqliteDir)) {
                    mkdir($sqliteDir, 0755, true);
                }
                $needsInit = !file_exists($sqlitePath);
                self::$instance = new PDO("sqlite:" . $sqlitePath);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

                if ($needsInit) {
                    $schemaFile = __DIR__ . '/../../database/schema.sql';
                    $seedFile = __DIR__ . '/../../database/seed.sql';
                    if (file_exists($schemaFile)) {
                        $schema = file_get_contents($schemaFile);
                        $schema = str_replace('ON UPDATE CURRENT_TIMESTAMP', '', $schema);
                        $schema = str_replace('INT AUTO_INCREMENT PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
                        $schema = str_replace('INTEGER AUTO_INCREMENT PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
                        $schema = preg_replace('/ENGINE=InnoDB.*?;/i', ';', $schema);
                        $schema = preg_replace('/ENUM\((.*?)\)/i', 'TEXT', $schema);
                        self::$instance->exec($schema);
                    }
                    if (file_exists($seedFile)) {
                        $seed = file_get_contents($seedFile);
                        self::$instance->exec($seed);
                    }
                }
            }
        }
        return self::$instance;
    }
}
