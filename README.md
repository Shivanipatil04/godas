# Godas Business Corporation - Industrial Solar Tunnel Dryer Platform

A complete full-stack web application for **Godas Business Corporation**, India's leading manufacturer of Polycarbonate Solar Tunnel Dryers, Hybrid Solar Systems, Electric Cabinet Tray Dryers, and Commercial Heat Pump Dehydrators.

This project unifies a modern React frontend with a production-ready PHP 8.x + MySQL backend, standalone PHP Admin Panel, normalized database schema, secure image upload management, and lead pipeline tracking.

---

## 📁 Repository Structure

```text
godas-business-corporation/
├── admin/                    # Standalone PHP Admin Panel
│   ├── assets/               # Admin CSS stylesheet (style.css)
│   ├── includes/             # Header, Footer, and Sidebar templates
│   ├── index.php             # Dashboard with lead counters & recent inquiries
│   ├── login.php             # Secure admin session authentication
│   ├── products.php          # Product catalog management & status toggle
│   ├── product-edit.php     # Detailed product editor (features, specs, images)
│   ├── product-categories.php# Product categories manager
│   ├── gallery.php           # Gallery image uploader & manager
│   ├── gallery-categories.php# Gallery categories manager
│   ├── faqs.php              # FAQ manager
│   ├── faq-categories.php    # FAQ categories manager
│   ├── testimonials.php      # Reviews & testimonials manager
│   ├── inquiries.php         # Lead pipeline management & admin notes
│   └── company.php           # Company profile & contact information editor
│
├── backend/                  # PHP REST API Backend
│   ├── api/                  # Public REST APIs
│   │   ├── products.php      # GET public product listing & details
│   │   ├── categories.php    # GET categories for products, gallery, faqs
│   │   ├── gallery.php       # GET gallery items by category
│   │   ├── faqs.php          # GET FAQs by category
│   │   ├── testimonials.php  # GET testimonials/reviews
│   │   ├── company.php       # GET company info, features, industries, process, stats
│   │   ├── inquiry.php       # POST public contact & quote form submission
│   │   └── admin/            # Authenticated Admin REST APIs
│   │       ├── auth.php      # Login, logout, session verification
│   │       ├── products.php  # Admin CRUD for products & categories
│   │       ├── gallery.php   # Admin CRUD for gallery items & categories
│   │       ├── faqs.php      # Admin CRUD for FAQs & categories
│   │       ├── testimonials.php # Admin CRUD for reviews
│   │       ├── inquiries.php # Admin lead pipeline & notes
│   │       └── company.php   # Admin company settings updates
│   ├── config/               # Application & database configurations
│   │   ├── config.php        # Constants, session settings, upload limits
│   │   └── database.php      # PDO connection (MySQL with auto SQLite fallback)
│   ├── middleware/           # Middleware
│   │   ├── auth.php          # Admin session verification
│   │   └── cors.php          # CORS policy handler
│   ├── uploads/              # Dynamic uploaded images
│   │   ├── products/
│   │   ├── gallery/
│   │   └── testimonials/
│   └── utils/                # Helpers for JSON, sanitization & file uploads
│       └── helpers.php
│
├── database/                 # Normalized Database Files
│   ├── schema.sql            # MySQL 8.0+ database schema DDL
│   └── seed.sql              # 100% Real client production data seed script
│
├── frontend/                 # React Frontend (Vite + React 18 + TailwindCSS)
│   ├── src/
│   │   ├── api/              # API Client Service Layer
│   │   │   ├── config.js     # Base URL configuration (VITE_API_BASE_URL)
│   │   │   └── index.js      # API fetchers with fallback to static data
│   │   ├── assets/           # Static images & branding assets
│   │   ├── components/       # Header, Footer, QuoteModal, FAQAccordion, etc.
│   │   ├── data/             # Static data fallbacks (Preserved as fallback)
│   │   └── pages/            # Home, Products, ProductDetail, Gallery, About, Contact
│   ├── .env.example          # Environment variable template
│   ├── package.json          # Node dependencies & scripts
│   └── vite.config.ts        # Vite configuration
│
├── scripts/                  # Management Scripts
│   └── create_admin.php      # Secure CLI script for initial admin user creation
│
└── .htaccess                 # Root Apache security configuration
```

---

## 🗄️ Database Architecture

The normalized MySQL database contains the following core tables:

- **`admin_users`**: Admin credentials hashed with `password_hash($pass, PASSWORD_BCRYPT)`.
- **`company_info`**: Central company address, phones, emails, certifications, highlights, social links.
- **`product_categories`**: Managed categories for dryers and dehydration equipment.
- **`products`**: Rich product records (slug, tagline, capacity, efficiency, temp range, payback, descriptions, brochure URL).
- **`product_images`**: Secondary product showcase images.
- **`product_features`**: Multi-line key engineering features for each product.
- **`product_specifications`**: Key-value technical specifications.
- **`product_suitable_for`**: Recommended crops & applications.
- **`product_drying_comparison`**: Performance metrics (Open Sun vs Godas Solar Dryer).
- **`gallery_categories`**: Independently manageable gallery categories (Installations, Manufacturing, etc.).
- **`gallery_items`**: Site photos with title, location, category, order, and status.
- **`faq_categories`**: Categories for questions (Subsidy, Technical, General, etc.).
- **`faqs`**: Questions and answers with ordering and status toggles.
- **`testimonials`**: Client reviews with ratings, organization, location, and product used.
- **`features`**: 12 core value propositions and energy-saving advantages.
- **`industries`**: 12 target crop & industry sectors with recommended equipment and benefit points.
- **`process_steps`**: 6-step turnkey manufacturing and installation workflow.
- **`stats`**: Company achievements and key statistics.
- **`inquiries`**: Lead records submitted from Contact/Quote forms with status pipeline:
  `New Inquiry` → `DPR Sent` → `Quote Sent` → `Site Survey Done` → `Completed`.

---

## 🚀 Local Development Setup

### 1. Requirements
- **PHP 8.1+** with PDO, PDO_MySQL, and PDO_SQLite extensions
- **MySQL 8.0+** / MariaDB (or auto SQLite fallback)
- **Node.js 18+** & npm

### 2. Database Initialization (MySQL)
Create a MySQL database named `godas_db` and run schema and seed scripts:

```bash
mysql -u root -p -e "CREATE DATABASE godas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p godas_db < database/schema.sql
mysql -u root -p godas_db < database/seed.sql
```

### 3. Create Admin User
Run the CLI admin creation script:

```bash
php scripts/create_admin.php admin admin@godasbusinesscorp.com "GodasAdmin@2026" "System Administrator"
```

### 4. Start PHP Server
Start the PHP built-in web server from the project root:

```bash
php -S localhost:8000
```

Access the Admin Panel at: [http://localhost:8000/admin](http://localhost:8000/admin)

### 5. Start React Frontend
In a separate terminal, navigate to `frontend/` and launch Vite:

```bash
cd frontend
npm install
npm run dev
```

Access the React Frontend at: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Hostinger Shared Hosting Deployment

### Step A: Deploy PHP Backend & Admin Panel to Hostinger
1. Upload the `backend/`, `admin/`, `database/`, and `scripts/` directories to your Hostinger `public_html` folder (or a subfolder like `public_html/api`).
2. Create a MySQL Database in Hostinger hPanel.
3. Import `database/schema.sql` and `database/seed.sql` via phpMyAdmin.
4. Create a `.env` file in the root of your Hostinger installation:

```env
APP_ENV=production
APP_URL=https://yourdomain.com
ADMIN_URL=https://yourdomain.com/admin
DB_DRIVER=mysql
DB_HOST=localhost
DB_NAME=u123456789_godas_db
DB_USER=u123456789_admin
DB_PASS=YourStrongDatabasePassword
FRONTEND_URL=https://yourdomain.com
```

5. Run `php scripts/create_admin.php` via SSH (or load `admin/login.php` to sign in).

### Step B: Deploy React Frontend (Vercel or Hostinger)
Set the environment variable `VITE_API_BASE_URL`:

```env
VITE_API_BASE_URL=https://yourdomain.com
```

Build the production bundle:

```bash
cd frontend
npm run build
```

Upload the contents of `frontend/dist/` to your frontend host.

---

## 🔐 Security Features

- **PDO Prepared Statements**: 100% parameter binding on all database queries preventing SQL Injection.
- **PHP Session Auth**: Secure, HttpOnly, SameSite session cookies for Admin access.
- **Password Hashing**: `password_hash()` with BCrypt cost 12 and `password_verify()`.
- **Upload Protection**: Strict MIME type validation (JPEG, PNG, WEBP, GIF), max file size limits (5MB), random safe filenames, and path traversal protection (`basename`).
- **Input Sanitization & Escaping**: HTML entity escaping on output.
- **Apache Protection**: `.htaccess` rules restricting access to `.env` files and configuration scripts.
