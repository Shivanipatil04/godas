<?php
// backend/api/admin/company.php
// Admin Company Settings REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

requireAdminAuth(true);

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $data = $stmt->fetch();
        jsonResponse(['success' => true, 'data' => $data]);
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $name = trim($input['name'] ?? 'Godas Business Corporation');
        $shortName = trim($input['short_name'] ?? 'GBC Industrial');
        $tagline = trim($input['tagline'] ?? '');
        $established = trim($input['established'] ?? '2004');
        $yearsExp = trim($input['years_experience'] ?? '20+');
        $headquarters = trim($input['headquarters'] ?? '');
        $address = trim($input['address'] ?? '');
        $phoneSales = trim($input['phone_sales'] ?? '');
        $phoneTech = trim($input['phone_tech'] ?? '');
        $whatsapp = trim($input['whatsapp_number'] ?? '');
        $emailSales = trim($input['email_sales'] ?? '');
        $emailInfo = trim($input['email_info'] ?? '');
        $emailSupport = trim($input['email_support'] ?? '');

        $certifications = is_array($input['certifications'] ?? null) ? json_encode($input['certifications']) : ($input['certifications'] ?? '[]');
        $highlights = is_array($input['highlights'] ?? null) ? json_encode($input['highlights']) : ($input['highlights'] ?? '[]');
        $socialLinks = is_array($input['social_links'] ?? null) ? json_encode($input['social_links']) : ($input['social_links'] ?? '{}');

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
            'certifications' => $certifications, 'highlights' => $highlights,
            'social_links' => $socialLinks
        ]);

        jsonResponse(['success' => true, 'message' => 'Company settings updated successfully']);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
