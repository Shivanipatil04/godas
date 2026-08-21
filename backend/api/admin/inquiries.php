<?php
// backend/api/admin/inquiries.php
// Admin Inquiries / Leads Management REST API

require_once __DIR__ . '/../../middleware/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/helpers.php';

requireAdminAuth(true);

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $status = $_GET['status'] ?? null;
        $search = $_GET['search'] ?? null;

        $sql = "SELECT * FROM inquiries WHERE 1=1";
        $params = [];

        if ($status && $status !== 'all') {
            $sql .= " AND status = :status";
            $params['status'] = $status;
        }

        if ($search) {
            $sql .= " AND (full_name LIKE :s OR email LIKE :s OR phone LIKE :s OR state_city LIKE :s OR message LIKE :s)";
            $params['s'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY created_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $inquiries = $stmt->fetchAll();

        // Get status counts summary
        $countsStmt = $pdo->query("SELECT status, COUNT(*) as count FROM inquiries GROUP BY status");
        $countsRaw = $countsStmt->fetchAll();
        $counts = [
            'All' => 0,
            'New Inquiry' => 0,
            'DPR Sent' => 0,
            'Quote Sent' => 0,
            'Site Survey Done' => 0,
            'Completed' => 0
        ];
        foreach ($countsRaw as $r) {
            $counts[$r['status']] = (int)$r['count'];
            $counts['All'] += (int)$r['count'];
        }

        jsonResponse([
            'success' => true,
            'data' => $inquiries,
            'counts' => $counts
        ]);
    } elseif ($method === 'POST') {
        $input = getJsonInput();

        $id = (int)($input['id'] ?? 0);
        $status = trim($input['status'] ?? '');
        $notes = trim($input['notes'] ?? '');

        if ($id <= 0) jsonResponse(['success' => false, 'error' => 'Inquiry ID is required'], 400);

        $allowedStatuses = ['New Inquiry', 'DPR Sent', 'Quote Sent', 'Site Survey Done', 'Completed'];
        if (!empty($status) && !in_array($status, $allowedStatuses)) {
            jsonResponse(['success' => false, 'error' => 'Invalid status value'], 400);
        }

        $stmt = $pdo->prepare("UPDATE inquiries SET status = COALESCE(NULLIF(:s, ''), status), notes = :n, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
        $stmt->execute(['s' => $status, 'n' => $notes, 'id' => $id]);

        jsonResponse(['success' => true, 'message' => 'Inquiry updated successfully']);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = :id");
        $stmt->execute(['id' => $id]);
        jsonResponse(['success' => true, 'message' => 'Inquiry deleted successfully']);
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
