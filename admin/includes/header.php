<?php
// admin/includes/header.php
require_once __DIR__ . '/../../backend/middleware/auth.php';
requireAdminAuth(false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $pageTitle ?? 'Admin Panel' ?> - Godas Business Corporation</title>
  <link rel="stylesheet" href="/admin/assets/style.css">
</head>
<body>
<div class="admin-wrapper">
  <?php include __DIR__ . '/sidebar.php'; ?>
  <div class="main-content">
    <header class="top-header">
      <h1><?= $pageTitle ?? 'Dashboard' ?></h1>
      <div class="user-menu">
        <span class="user-badge">👤 <?= htmlspecialchars($_SESSION['admin_full_name'] ?? 'Admin') ?></span>
        <a href="/admin/login.php?action=logout" class="btn btn-secondary btn-sm">Logout</a>
      </div>
    </header>
    <main class="content-body">
