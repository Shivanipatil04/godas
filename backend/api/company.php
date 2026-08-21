<?php
// backend/api/company.php
// Public Company Info, Features, Industries, Process, Stats API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

$pdo = Database::getConnection();

try {
    // 1. Company Info
    $stmtComp = $pdo->query("SELECT * FROM company_info LIMIT 1");
    $companyRaw = $stmtComp->fetch();
    $companyInfo = [];
    if ($companyRaw) {
        $companyInfo = [
            'name' => $companyRaw['name'],
            'shortName' => $companyRaw['short_name'],
            'tagline' => $companyRaw['tagline'],
            'established' => $companyRaw['established'],
            'yearsExperience' => $companyRaw['years_experience'],
            'headquarters' => $companyRaw['headquarters'],
            'address' => $companyRaw['address'],
            'phones' => [
                ['label' => 'Sales & Inquiries', 'number' => $companyRaw['phone_sales'], 'raw' => preg_replace('/[^0-9+]/', '', $companyRaw['phone_sales'])],
                ['label' => 'Technical Support', 'number' => $companyRaw['phone_tech'], 'raw' => preg_replace('/[^0-9+]/', '', $companyRaw['phone_tech'])],
            ],
            'whatsappNumber' => $companyRaw['whatsapp_number'],
            'emails' => [
                'sales' => $companyRaw['email_sales'],
                'info' => $companyRaw['email_info'],
                'support' => $companyRaw['email_support']
            ],
            'certifications' => json_decode($companyRaw['certifications'] ?: '[]', true),
            'highlights' => json_decode($companyRaw['highlights'] ?: '[]', true),
            'socialLinks' => json_decode($companyRaw['social_links'] ?: '{}', true)
        ];
    }

    // 2. Features
    $stmtFeat = $pdo->query("SELECT id, feature, advantage, icon FROM features WHERE status = 1 ORDER BY display_order ASC");
    $features = $stmtFeat->fetchAll();

    // 3. Industries
    $stmtInd = $pdo->query("SELECT id, title, icon, image, description, recommended_dryer as recommendedDryer FROM industries WHERE status = 1 ORDER BY display_order ASC");
    $industries = $stmtInd->fetchAll();
    foreach ($industries as &$ind) {
        $stmtBen = $pdo->prepare("SELECT benefit_text FROM industry_benefits WHERE industry_id = :id ORDER BY display_order ASC");
        $stmtBen->execute(['id' => $ind['id']]);
        $ind['benefits'] = $stmtBen->fetchAll(PDO::FETCH_COLUMN);
    }

    // 4. Process Steps
    $stmtProc = $pdo->query("SELECT step_number as step, title, subtitle, description, icon FROM process_steps WHERE status = 1 ORDER BY display_order ASC");
    $processSteps = $stmtProc->fetchAll();

    // 5. Stats
    $stmtStats = $pdo->query("SELECT id, label, value, suffix, display_text as display, description FROM stats WHERE status = 1 ORDER BY display_order ASC");
    $stats = $stmtStats->fetchAll();

    jsonResponse([
        'success' => true,
        'data' => [
            'companyInfo' => $companyInfo,
            'features' => $features,
            'industries' => $industries,
            'processSteps' => $processSteps,
            'companyStats' => $stats
        ]
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
