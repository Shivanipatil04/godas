<?php
// backend/api/inquiry.php
// Public Inquiry / Lead Submission REST API

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use POST.'], 405);
}

$input = getJsonInput();

$fullName = sanitizeInput($input['fullName'] ?? $input['name'] ?? '');
$email = sanitizeInput($input['email'] ?? '');
$phone = sanitizeInput($input['phone'] ?? '');
$stateCity = sanitizeInput($input['stateCity'] ?? $input['location'] ?? $input['state'] ?? '');
$productId = sanitizeInput($input['productId'] ?? $input['product'] ?? '');
$cropType = sanitizeInput($input['cropType'] ?? $input['crop'] ?? '');
$quantityCapacity = sanitizeInput($input['quantityCapacity'] ?? $input['capacity'] ?? '');
$dryingPurpose = sanitizeInput($input['dryingPurpose'] ?? $input['purpose'] ?? '');
$timeline = sanitizeInput($input['timeline'] ?? '');
$message = sanitizeInput($input['message'] ?? '');
$source = sanitizeInput($input['source'] ?? 'Website Inquiry');

// Basic Validation
if (empty($fullName)) {
    jsonResponse(['success' => false, 'error' => 'Full Name is required.'], 400);
}
if (empty($phone)) {
    jsonResponse(['success' => false, 'error' => 'Phone number is required.'], 400);
}

try {
    $pdo = Database::getConnection();

    $stmt = $pdo->prepare("
        INSERT INTO inquiries (
            full_name, email, phone, state_city, product_id, crop_type,
            quantity_capacity, drying_purpose, timeline, message, source,
            status, ip_address, created_at
        ) VALUES (
            :full_name, :email, :phone, :state_city, :product_id, :crop_type,
            :quantity_capacity, :drying_purpose, :timeline, :message, :source,
            'New Inquiry', :ip_address, CURRENT_TIMESTAMP
        )
    ");

    $stmt->execute([
        'full_name' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'state_city' => $stateCity,
        'product_id' => $productId,
        'crop_type' => $cropType,
        'quantity_capacity' => $quantityCapacity,
        'drying_purpose' => $dryingPurpose,
        'timeline' => $timeline,
        'message' => $message,
        'source' => $source,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
    ]);

    $inquiryId = $pdo->lastInsertId();

    // 1. Send Email Notification to sales@godasbusinesscorporation.com
    $to = 'sales@godasbusinesscorporation.com';
    $subject = "New Website Inquiry #{$inquiryId} from {$fullName} - Godas Business Corp";
    $emailBody = "New Website Inquiry Received:\n\n" .
                 "Lead ID: #{$inquiryId}\n" .
                 "Name: {$fullName}\n" .
                 "Phone: {$phone}\n" .
                 "Email: " . ($email ?: 'N/A') . "\n" .
                 "Location: " . ($stateCity ?: 'N/A') . "\n" .
                 "Product Interest: " . ($productId ?: 'General Inquiry') . "\n" .
                 "Crop / Material: " . ($cropType ?: 'N/A') . "\n" .
                 "Capacity / Quantity: " . ($quantityCapacity ?: 'N/A') . "\n" .
                 "Drying Purpose: " . ($dryingPurpose ?: 'N/A') . "\n" .
                 "Timeline: " . ($timeline ?: 'N/A') . "\n" .
                 "Customer Message: " . ($message ?: 'N/A') . "\n\n" .
                 "Source: {$source}\n" .
                 "Date: " . date('Y-m-d H:i:s') . "\n";

    $headers = "From: sales@godasbusinesscorporation.com\r\n" .
               "Reply-To: " . ($email ?: 'sales@godasbusinesscorporation.com') . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    @mail($to, $subject, $emailBody, $headers);

    // 2. Generate WhatsApp notification link to +91 90287 71799
    $waText = "*New Inquiry #{$inquiryId}*\n\n" .
              "👤 *Name:* {$fullName}\n" .
              "📞 *Phone:* {$phone}\n" .
              "✉️ *Email:* " . ($email ?: 'N/A') . "\n" .
              "📍 *Location:* " . ($stateCity ?: 'N/A') . "\n" .
              "📦 *Product:* " . ($productId ?: 'General Inquiry') . "\n" .
              "🌱 *Crop:* " . ($cropType ?: 'N/A') . "\n" .
              "⚖️ *Capacity:* " . ($quantityCapacity ?: 'N/A') . "\n" .
              "💬 *Message:* " . ($message ?: 'N/A');

    $whatsappUrl = "https://wa.me/919028771799?text=" . urlencode($waText);

    jsonResponse([
        'success' => true,
        'message' => 'Thank you for your inquiry! Our team will contact you shortly.',
        'inquiry_id' => $inquiryId,
        'whatsapp_url' => $whatsappUrl
    ], 201);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'Failed to submit inquiry: ' . $e->getMessage()], 500);
}
