-- Godas Business Corporation Seed Data
-- 100% Real Client & Production Data Migration

-- Company Information
DELETE FROM company_info;
INSERT INTO company_info (
  id, name, short_name, tagline, established, years_experience, headquarters, address,
  phone_sales, phone_tech, whatsapp_number, email_sales, email_info, email_support,
  certifications, highlights, social_links
) VALUES (
  1,
  'Godas Business Corporation',
  'GBC Industrial',
  'Pioneering Sustainable Food Dehydration & Solar Tunnel Dryer Technology in India',
  '2004',
  '20+',
  'Nashik, Maharashtra, India',
  'Shop No. 33, 4th Floor, Laxmi Vihar Apartment, Opp. New Era English School, Govind Nagar, Nashik – 422009, Maharashtra, India',
  '+91 90287 71799',
  '+91 90287 71799',
  '+919028771799',
  'sales@godasbusinesscorporation.com',
  'sales@godasbusinesscorporation.com',
  'sales@godasbusinesscorporation.com',
  '["ISO 9001:2015 Certified Manufacturing", "MSME Registered Enterprise", "Made in India Certified"]',
  '["20+ Years of Industry Experience", "Serving Customers Across 5+ States", "Government Subsidy Assistance", "Made in India"]',
  '{"facebook": "https://facebook.com/godasbusinesscorp", "instagram": "https://instagram.com/godasbusinesscorp", "youtube": "https://youtube.com/@godasbusinesscorp", "linkedin": "https://linkedin.com/company/godasbusinesscorp", "whatsapp": "https://wa.me/919028771799?text=Hello%20Godas%20Business%20Corporation,%20I%20want%20to%20inquire%20about%20Solar%20Tunnel%20Dryers"}'
);

-- Product Categories
DELETE FROM product_categories;
INSERT INTO product_categories (id, name, slug, description, display_order) VALUES
(1, 'Solar Dryers', 'solar-dryers', 'High-efficiency polycarbonate solar tunnel dryers', 1),
(2, 'Hybrid Systems', 'hybrid-systems', '24/7 all-weather solar and auxiliary heat dryers', 2),
(3, 'Industrial Solar', 'industrial-solar', 'Large batch commercial solar dryers for FPOs & Exporters', 3),
(4, 'Industrial Hybrid', 'industrial-hybrid', 'Precision temperature controlled commercial hybrid dryers', 4),
(5, 'Custom Systems', 'custom-systems', 'Custom engineered thermal dehydration solutions', 5),
(6, 'Dehydrators', 'dehydrators', 'Energy saving heat pump food dehydrators', 6);

-- Products
DELETE FROM products;
INSERT INTO products (
  id, slug, name, tagline, category_id, featured, capacity_range, efficiency, temperature_range, payback_period, image, short_description, full_description, brochure_url, display_order
) VALUES
(
  'polycarbonate-solar-tunnel-dryer',
  'solar-tunnel-dryer-fruits-vegetables',
  'Solar Tunnel Dryer for Fruits & Vegetables',
  'High-Efficiency Clean Solar Drying Preserving Natural Colour, Taste & Aroma',
  1, 1,
  '100 kg to 5,000 kg / batch',
  '85% Solar Thermal Absorption',
  '45°C - 70°C (Controlled)',
  '12 - 18 Months',
  '/backend/uploads/products/product-1.jpeg',
  'Ideal for drying fruits, vegetables, herbs, spices, flowers, and medicinal plants while preserving their natural colour, taste, aroma, and nutritional value.',
  'The Solar Tunnel Dryer for Fruits & Vegetables manufactured by Godas Business Corporation is a semi-cylindrical greenhouse structure engineered for agricultural and food processing applications. Built with GI / Stainless Steel structural arches and covered with imported multiwall UV-protected polycarbonate sheets, it creates a powerful trapped greenhouse effect that boosts internal temperatures 20°C to 30°C above ambient air.\n\nEquipped with solar-powered DC exhaust fans and humidity sensors, the system continuously flushes out moisture while protecting high-value crops from dust, rain, insects, birds, and UV degradation.',
  '#quote-modal',
  1
),
(
  'solar-hybrid-dryer',
  'solar-hybrid-dryer',
  'Solar Hybrid Dryer',
  'Continuous 24/7 Weather-Independent Drying with Dual Heat Integration',
  2, 1,
  '200 kg to 5,000 kg / batch',
  '92% System Thermal Yield',
  '40°C - 85°C (Precision Controlled)',
  '10 - 14 Months',
  '/backend/uploads/products/product-2.jpeg',
  'A combination of solar energy and backup heating systems for continuous drying, even during cloudy weather.',
  'The Solar Hybrid Dryer combines free solar energy during daytime with automatic auxiliary thermal backup (Biomass Pellet Stove, Heat Pump, or Electric Heating) for seamless night-time and rainy season operation. When solar gain drops, the automated controller triggers auxiliary heating to ensure zero downtime.',
  '#quote-modal',
  2
),
(
  'industrial-solar-tunnel-dryer',
  'industrial-solar-tunnel-dryer',
  'Industrial Solar Tunnel Dryer',
  'High-Capacity Commercial Drying for FPOs, Exporters & Processors',
  3, 1,
  '500 kg to 10,000 kg / batch',
  'High-Volume Thermal Recovery',
  '45°C - 75°C',
  '8 - 14 Months',
  '/backend/uploads/products/product-3.jpeg',
  'High-capacity drying solution specially designed for food processing industries, Farmer Producer Organizations (FPOs), exporters, and commercial businesses.',
  'Designed specifically for commercial agro-processors, food exporters, and large FPOs, the Industrial Solar Tunnel Dryer offers massive daily throughput. Built with heavy-duty structural steel and multi-row trolley configurations for fast batch loading.',
  '#quote-modal',
  3
),
(
  'industrial-hybrid-dryer',
  'industrial-hybrid-dryer',
  'Industrial Hybrid Dryer',
  'Commercial-Grade System with Precision Temperature Control All Year Round',
  4, 1,
  '1,000 kg to 15,000 kg / batch',
  'Commercial Thermal Efficiency',
  '40°C - 90°C',
  '10 - 16 Months',
  '/backend/uploads/products/product-4.jpeg',
  'A commercial-grade drying system with advanced temperature control for consistent drying throughout the year.',
  'The Industrial Hybrid Dryer provides commercial food processing factories with year-round climate independence. Combining solar collector roofs with high-efficiency burners or electric banks under automated PID/PLC monitoring.',
  '#quote-modal',
  4
),
(
  'custom-solar-drying-solutions',
  'custom-solar-drying-solutions',
  'Custom Solar Drying Solutions',
  'Tailor-Made Systems Built Around Your Specific Crop & Facility Footprint',
  5, 1,
  'Custom Capacity as per Requirement',
  'Tailored Thermal Engineering',
  '35°C - 85°C',
  '12 - 18 Months',
  '/backend/uploads/products/product-5.jpeg',
  'Customized solar drying systems designed according to product type, production capacity, and customer requirements.',
  'Every agricultural produce has unique moisture curves and bulk density. Godas Business Corporation designs and fabricates custom solar drying systems engineered to match your plant''s exact dimensions, available energy sources, and target drying metrics.',
  '#quote-modal',
  5
),
(
  'heat-pump-food-dehydrators',
  'heat-pump-food-dehydrators',
  'Heat Pump Food Dehydrators',
  'Ultra Energy-Efficient Closed-Loop Dehumidification for Superfoods',
  6, 1,
  '100 kg to 2,000 kg / batch',
  'Uses 75% Less Power than Resistance Heaters',
  '20°C - 75°C (Low Temperature)',
  '8 - 14 Months',
  '/backend/uploads/products/product-1.jpeg',
  'High-performance food dehydrators offering precise temperature control, faster drying, and maximum energy efficiency for all-weather commercial dehydration.',
  'Our Heat Pump Food Dehydrators operate on closed-loop dehumidification technology. By condensing moisture out of circulating air and recovering heat, these dehydrators consume 75% less electricity while preserving 98% of natural color, aroma, and vitamins.',
  '#quote-modal',
  6
);

-- Secondary Product Images
DELETE FROM product_images;
INSERT INTO product_images (product_id, image_path, display_order) VALUES
('polycarbonate-solar-tunnel-dryer', '/backend/uploads/gallery/gallery-1.jpeg', 1),
('polycarbonate-solar-tunnel-dryer', '/backend/uploads/gallery/gallery-2.jpeg', 2),
('polycarbonate-solar-tunnel-dryer', '/backend/uploads/gallery/gallery-4.jpeg', 3),
('solar-hybrid-dryer', '/backend/uploads/gallery/gallery-3.jpeg', 1),
('industrial-solar-tunnel-dryer', '/backend/uploads/gallery/gallery-5.jpeg', 1),
('industrial-hybrid-dryer', '/backend/uploads/gallery/gallery-2.jpeg', 1),
('custom-solar-drying-solutions', '/backend/uploads/gallery/gallery-4.jpeg', 1),
('heat-pump-food-dehydrators', '/backend/uploads/gallery/gallery-1.jpeg', 1);

-- Product Features
DELETE FROM product_features;
INSERT INTO product_features (product_id, feature_text, display_order) VALUES
('polycarbonate-solar-tunnel-dryer', 'Multiwall UV-Protected Polycarbonate Cladding (10-Year Warranty)', 1),
('polycarbonate-solar-tunnel-dryer', 'High-grade Food SS-304 / GI Mesh Trays & Trolleys', 2),
('polycarbonate-solar-tunnel-dryer', 'Automated Temperature & Humidity Fan Controller', 3),
('polycarbonate-solar-tunnel-dryer', 'Solar PV Powered Forced Convection Exhaust System', 4),
('polycarbonate-solar-tunnel-dryer', 'Eligible for 35% to 90% Government Subsidy', 5),

('solar-hybrid-dryer', 'Dual Heat Source Integration (Solar + Auxiliary Backup)', 1),
('solar-hybrid-dryer', 'Smart Auto-Switching PLC Panel with Touchscreen HMI', 2),
('solar-hybrid-dryer', 'Continuous 24/7 All-Weather Drying Operation', 3),
('solar-hybrid-dryer', 'Biomass Pellet Option for Lowest Fuel Cost', 4),

('industrial-solar-tunnel-dryer', 'High-Capacity Batch Processing (up to 10 Tons)', 1),
('industrial-solar-tunnel-dryer', 'Custom Multi-Row Trolley Track Design', 2),
('industrial-solar-tunnel-dryer', 'Heavy Duty Forced Convection Blower Fans', 3),
('industrial-solar-tunnel-dryer', 'Government Subsidy Ready (35% to 90%)', 4),

('industrial-hybrid-dryer', 'Year-Round Constant Batch Drying', 1),
('industrial-hybrid-dryer', 'Advanced Multi-Zone Temperature Control', 2),
('industrial-hybrid-dryer', 'Insulated Double-Walled Panels', 3),
('industrial-hybrid-dryer', 'Integrated Humidity & Moisture Sensors', 4),

('custom-solar-drying-solutions', 'Custom Engineering for Unique Crops & Materials', 1),
('custom-solar-drying-solutions', 'Tailored Footprint & Tray Size Configurations', 2),
('custom-solar-drying-solutions', 'Multi-Fuel Heating Integration Options', 3),
('custom-solar-drying-solutions', 'Full Turnkey Installation & Technical SOPs', 4),

('heat-pump-food-dehydrators', 'Closed-Loop Dehumidification Technology', 1),
('heat-pump-food-dehydrators', '75% Lower Electrical Energy Consumption', 2),
('heat-pump-food-dehydrators', 'Low Temperature Preservation (30°C - 65°C)', 3),
('heat-pump-food-dehydrators', 'Preserves Sensitive Vitamins, Aroma & Flavor', 4);

-- Product Specifications
DELETE FROM product_specifications;
INSERT INTO product_specifications (product_id, spec_key, spec_value, display_order) VALUES
('polycarbonate-solar-tunnel-dryer', 'Structure Material', 'Galvanized Iron (GI) or Food Grade SS-304 Tubular Frame', 1),
('polycarbonate-solar-tunnel-dryer', 'Covering Material', 'UV-Stabilized Multiwall Polycarbonate Sheet (4mm - 8mm)', 2),
('polycarbonate-solar-tunnel-dryer', 'Tray Material', 'Food Grade Stainless Steel (SS-304) Mesh Trays', 3),
('polycarbonate-solar-tunnel-dryer', 'Government Subsidy', 'Eligible for up to 35% - 90% Subsidy under Govt Agro Schemes', 4),

('solar-hybrid-dryer', 'Primary Heat Source', 'Polycarbonate Solar Collector', 1),
('solar-hybrid-dryer', 'Secondary Heat Source', 'Biomass Pellet Burner / Electric Auxiliary', 2),
('solar-hybrid-dryer', 'Control System', 'PLC Digital Sensor & Relay Panel', 3),

('industrial-solar-tunnel-dryer', 'Capacity', '500 kg to 10,000 kg / batch', 1),
('industrial-solar-tunnel-dryer', 'Material', 'Heavy Structural GI / SS-304', 2),

('industrial-hybrid-dryer', 'Automation', 'PLC Controller with HMI Display', 1),
('industrial-hybrid-dryer', 'Structure', 'Insulated Sandwich Panels & Solar Polycarbonate', 2),

('custom-solar-drying-solutions', 'Capacity', 'Customized based on client mandate', 1),
('custom-solar-drying-solutions', 'Design', 'CAD / Psychrometric Engineered Layout', 2),

('heat-pump-food-dehydrators', 'Technology', 'Closed-Loop Heat Pump Dehumidifier', 1),
('heat-pump-food-dehydrators', 'Compressor', 'Copeland / Panasonic High-Efficiency Scroll Compressor', 2),
('heat-pump-food-dehydrators', 'Energy Savings', 'Up to 75% compared to electrical heating', 3);

-- Product Suitable For
DELETE FROM product_suitable_for;
INSERT INTO product_suitable_for (product_id, item_text, display_order) VALUES
('polycarbonate-solar-tunnel-dryer', 'Fruits & Slices (Mango, Banana, Apple)', 1),
('polycarbonate-solar-tunnel-dryer', 'Vegetables (Onion, Garlic, Tomato, Spinach)', 2),
('polycarbonate-solar-tunnel-dryer', 'Spices & Herbs (Chilli, Turmeric, Ginger, Moringa)', 3),

('solar-hybrid-dryer', 'Export Quality Onion & Garlic Powder', 1),
('solar-hybrid-dryer', 'High-Value Ayush Herbal Extracts', 2),
('solar-hybrid-dryer', 'Spices: Pepper, Cardamom, Chilli, Turmeric', 3),

('industrial-solar-tunnel-dryer', 'Farmer Producer Organizations (FPOs)', 1),
('industrial-solar-tunnel-dryer', 'Spices & Agro Export Facilities', 2),
('industrial-solar-tunnel-dryer', 'Commercial Dehydration Plants', 3),

('industrial-hybrid-dryer', 'Onion & Garlic Processing Factories', 1),
('industrial-hybrid-dryer', 'Pharmaceutical Granules & Botanical Extracts', 2),
('industrial-hybrid-dryer', 'Large Agro Exporters', 3),

('custom-solar-drying-solutions', 'Specialty Herbs & Flowers', 1),
('custom-solar-drying-solutions', 'Industrial Sludge & Chemical Dewatering', 2),
('custom-solar-drying-solutions', 'Unique Regional Fruits & Grain Drying', 3),

('heat-pump-food-dehydrators', 'Export Grade Fruits & Berries', 1),
('heat-pump-food-dehydrators', 'Medicinal Herbs & Botanical Extracts', 2),
('heat-pump-food-dehydrators', 'Superfood Powders & Flowers', 3);

-- Product Drying Comparison
DELETE FROM product_drying_comparison;
INSERT INTO product_drying_comparison (product_id, crop_name, open_sun_time, solar_tunnel_time, display_order) VALUES
('polycarbonate-solar-tunnel-dryer', 'Red Chilli', '7-9 Days', '2.5-3 Days', 1),
('polycarbonate-solar-tunnel-dryer', 'Moringa Leaves', '3-4 Days', '8-12 Hours', 2);

-- Gallery Categories
DELETE FROM gallery_categories;
INSERT INTO gallery_categories (id, name, slug, display_order) VALUES
(1, 'Installations', 'installations', 1),
(2, 'Manufacturing', 'manufacturing', 2),
(3, 'Products', 'products', 3),
(4, 'Innovations', 'innovations', 4);

-- Gallery Items (5 Active + 4 Inactive)
DELETE FROM gallery_items;
INSERT INTO gallery_items (id, title, category_id, location, image, display_order, status) VALUES
(1, 'Polycarbonate Solar Tunnel Dryer Site', 1, 'Nashik, Maharashtra', '/backend/uploads/gallery/gallery-1.jpeg', 1, 1),
(2, 'Hybrid Solar Tunnel Dryer Installation', 1, 'Mahuva, Gujarat', '/backend/uploads/gallery/gallery-2.jpeg', 2, 1),
(3, 'Food Grade SS-304 Trays & Fabrication', 2, 'Nashik Factory Unit', '/backend/uploads/gallery/gallery-4.jpeg', 3, 1),
(4, 'Dehydrated Red Chilli Batch Output', 3, 'Guntur Cluster Project', '/backend/uploads/gallery/gallery-3.jpeg', 4, 1),
(5, 'Solar Air Circulation Ventilation Systems', 4, 'Nashik R&D Hub', '/backend/uploads/gallery/gallery-5.jpeg', 5, 1),

(6, 'Industrial Multi-Tray Electric Cabinet Dryer', 3, 'Pune Industrial Estate', '/backend/uploads/gallery/gallery-2.jpeg', 6, 0),
(7, 'Commercial Heat Pump Food Dehydrator Unit', 3, 'Indore Organic Farm', '/backend/uploads/gallery/gallery-1.jpeg', 7, 0),
(8, 'Hygienic Marine Products Drying Installation', 1, 'Kakinada Coastal Hub', '/backend/uploads/gallery/gallery-4.jpeg', 8, 0),
(9, 'Moringa Leaf Drying Batch Result', 3, 'Satara Agri Cluster', '/backend/uploads/gallery/gallery-3.jpeg', 9, 0);

-- FAQ Categories
DELETE FROM faq_categories;
INSERT INTO faq_categories (id, name, slug, display_order) VALUES
(1, 'General', 'general', 1),
(2, 'Subsidy', 'subsidy', 2),
(3, 'Performance', 'performance', 3),
(4, 'Quality', 'quality', 4),
(5, 'Technical', 'technical', 5),
(6, 'Maintenance', 'maintenance', 6),
(7, 'Materials', 'materials', 7),
(8, 'Installation', 'installation', 8),
(9, 'Training', 'training', 9),
(10, 'Market Support', 'market-support', 10);

-- FAQs
DELETE FROM faqs;
INSERT INTO faqs (id, category_id, question, answer, display_order) VALUES
(1, 1, 'What is a Solar Tunnel Dryer and how does it work?', 'A Polycarbonate Solar Tunnel Dryer is an enclosed semi-cylindrical walk-in drying structure. Solar radiation enters through multiwall UV-stabilized polycarbonate sheets and gets absorbed inside, heating the air up to 20°C - 35°C above ambient temperature. Solar-powered exhaust fans create forced air circulation to continuously flush out moisture, drying agricultural produce 60% faster while protecting it from weather, dust, and pests.', 1),
(2, 2, 'Are Godas Solar Dryers eligible for Government Subsidies in India?', 'Yes, our solar drying systems comply with standard technical specifications. Government subsidies are accessible through agricultural and horticulture schemes for Farmer Producer Companies (FPOs), self-help groups, and individual agri-entrepreneurs. We assist you with detailed project reports (DPR) and technical documentation.', 2),
(3, 3, 'How does the dryer operate during rainy, cloudy days or at night?', 'For standard solar dryers, drying slows down at night. For commercial operations requiring continuous output, we offer Hybrid Solar Dryers equipped with auxiliary heating backup — such as Biomass Pellet Furnaces, Electric Resistance Heaters, or Heat Pump Units.', 3),
(4, 4, 'Why is a polycarbonate solar tunnel better than open sun drying?', 'Open sun drying exposes produce to rain, high ambient humidity, dust, birds, insects, mold spores, and UV bleaching. Polycarbonate solar tunnels create a hygienic, UV-filtered micro-climate that reduces moisture rapidly while preserving natural colors, volatile essential oils, active nutrients, and flavor.', 4),
(5, 5, 'What capacities do you manufacture?', 'We engineer solar tunnel and industrial dryers ranging from 100 kg batch capacity models suitable for small farmers up to large commercial 10,000 kg (10 Ton) multi-tunnel installations for industrial export processing hubs.', 5),
(6, 6, 'What maintenance is required for the solar tunnel dryer?', 'Maintenance is minimal. Periodically wipe or hose off dust from the outer polycarbonate sheet exterior to maximize solar light transmittance. Trays can be washed down easily with food-grade sanitation solutions.', 6),
(7, 7, 'What materials are used in construction?', 'The structural frame is constructed from heavy-duty Galvanized Iron (GI) or SS-304 stainless steel tubing. Covering sheets are UV-stabilized multiwall polycarbonate, and material contact trays are made of food-grade SS-304 wire mesh.', 7),
(8, 8, 'How long does installation and setup take?', 'Factory fabrication takes approximately 10 to 15 days. On-site installation and commissioning by our technicians typically takes 3 to 5 days depending on site foundation readiness and batch capacity.', 8),
(9, 9, 'Do you provide training and guidance for startups and new agri-entrepreneurs?', 'Yes, we provide end-to-end operational training for startups, SHGs, and FPOs. Our team offers step-by-step guidance on raw material pre-treatment (washing, cutting, blanching), loading protocols, optimal drying temperatures, moisture testing, and post-drying packaging.', 9),
(10, 10, 'Do you offer market linkage and value-addition support?', 'Yes, we support our clients with market intelligence, buyer networking connections, and value-addition advice for dehydrated products such as spices, onion flakes, moringa powder, and dried fruits to ensure profitable commercial viability.', 10);

-- Testimonials
DELETE FROM testimonials;
INSERT INTO testimonials (id, name, role, organization, location, image, quote, rating, product_used, display_order) VALUES
(1, 'Rajesh Patil', 'Chairman', 'Sahyadri Agro Farmer Producer Co. Ltd.', 'Nashik, Maharashtra', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'We installed Godas Business Corp''s 2-Ton Polycarbonate Solar Tunnel Dryer for our Red Chilli and Moringa leaf cluster. The drying time dropped from 8 days to just 2.5 days! The natural red color retention is fantastic, and we got a 35% NHM government subsidy through their seamless documentation guidance.', 5, 'Polycarbonate Solar Tunnel Dryer (2000 kg)', 1),
(2, 'Suresh Patel', 'Managing Director', 'Shree Krishna Dehydrates & Spices', 'Mahuva, Gujarat', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'Onion drying in Mahuva monsoons used to stop completely. Installing their Hybrid Biomass Solar Tunnel Dryer allowed us to operate 24/7 without weather interruption. Biomass pellet backup costs us 60% less than electricity!', 5, 'Hybrid Solar Dryer with Biomass Backup', 2),
(3, 'Dr. Ananya Deshmukh', 'Head of Operations', 'VedaPure Organic Botanicals', 'Indore, Madhya Pradesh', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 'For sensitive medicinal herbs and marigold flower extraction, temperature precision is non-negotiable. Godas Heat Pump Dehydrator reduced our power bill by 70% while keeping essential oils intact. Exceptional after-sales service!', 5, 'Commercial Heat Pump Food Dehydrator', 3),
(4, 'Venkatesh Rao', 'Proprietor', 'Godavari Marine & Seafood Exports', 'Kakinada, Andhra Pradesh', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', 'Open sun drying of shrimp and sea fish was plagued by flies and dust. Switching to Godas solar tunnel dryer produced clean export-grade dried fish that commands a 30% higher market price per kg.', 5, 'Polycarbonate Solar Tunnel Dryer (1000 kg)', 4),
(5, 'Pravin Kulkarni', 'Founder', 'Sahaj Natural Foods & Spices', 'Pune, Maharashtra', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', 'Their 48-Tray SS Electric Cabinet Dryer is rock solid. Temperature uniformity across top and bottom trays is impressive. We dry turmeric powder and ginger slices continuously with zero maintenance issues in 2 years.', 5, 'Industrial Electric Cabinet Tray Dryer (48 Trays)', 5);

-- Features
DELETE FROM features;
INSERT INTO features (id, feature, advantage, icon, display_order) VALUES
(1, '70% Energy Cost Savings', 'Harness free solar radiation trapped within high-grade UV polycarbonate chambers to replace expensive diesel and high-tariff grid heating.', 'Zap', 1),
(2, '60% Faster Drying Speed', 'Forced convection airflow and automated exhaust fans evaporate moisture at double the speed of traditional open sun drying.', 'Clock', 2),
(3, '100% Weather-Proof Operation', 'Enclosed sealed chambers safeguard agricultural produce from unexpected rain, humidity spikes, dust, insects, and fungal growth.', 'ShieldCheck', 3),
(4, 'Superior Color & Aroma Retention', 'Controlled thermal profiles prevent scorch and UV fading, preserving natural essential oils, vibrant colors, and market value.', 'Sparkles', 4),
(5, '10-Year UV Sheet Warranty', 'Imported multiwall polycarbonate sheets coated with UV protection layers, backed by a 10-year warranty against yellowing.', 'Sun', 5),
(6, 'Govt Subsidy Assistance (35% to 90%)', 'Compliant with MNRE, NABARD, NHM, and State Agro-Industrial schemes with complete bankable DPR project support.', 'Award', 6),
(7, 'Food Grade SS-304 Trays & Frame', 'All food contact surfaces and mesh trays utilize hygienic SS-304 stainless steel meeting FSSAI & US-FDA safety guidelines.', 'CheckCircle2', 7),
(8, 'Smart Automated PLC Controllers', 'Integrated digital sensors monitor temperature and humidity, toggling exhaust fans and auxiliary heat automatically.', 'Cpu', 8),
(9, 'Zero Carbon Footprint Options', '100% solar PV-driven forced air fans enable zero-grid off-grid operation directly in farmlands.', 'Leaf', 9),
(10, 'Modular & Expandable Structure', 'Tunnel structures are modularly built. Start with 200kg batch capacity and extend tunnel length as production grows.', 'LayoutGrid', 10),
(11, 'Custom Thermal Engineering', 'In-house thermal engineers calculate specific psychrometric loads and custom tray spacing tailored to your specific crop.', 'Wrench', 11),
(12, 'Pan-India Installation & SOPs', 'Turnkey service: engineering, factory fabrication, on-site setup, operator training, SOP manuals, and ongoing support.', 'MapPin', 12);

-- Industries
DELETE FROM industries;
INSERT INTO industries (id, title, icon, image, description, recommended_dryer, display_order) VALUES
('spices-herbs-chilli', 'Spices, Herbs & Red Chilli', 'Flame', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 'Preserve natural color, aroma, capsaicin, and volatile essential oils in Chilli, Turmeric, Ginger, Pepper, Cardamom, and Coriander under 100% hygienic conditions.', 'Polycarbonate Solar Tunnel Dryer / Hybrid Solar Dryer', 1),
('fruits-vegetables', 'Fruits & Vegetables Dehydration', 'Apple', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80', 'Produce premium quality dried mango slices, banana chips, pineapple leather, apple chips, beetroot, tomato flakes, and spinach powder.', 'Heat Pump Dehydrator / Polycarbonate Solar Tunnel Dryer', 2),
('onion-garlic', 'Onion & Garlic Flakes', 'Layers', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80', 'Commercial scale drying of white/red onion kibbled, flakes, and garlic cloves for spice seasoning companies and soup premix manufacturers.', 'Hybrid Solar Dryer / Biomass Tunnel Dryer', 3),
('moringa-leaves', 'Moringa & Superfood Powder', 'Leaf', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', 'Shade-like hygienic drying of Moringa oleifera leaves, Wheatgrass, Spirulina, and Neem to preserve bright green chlorophyll and Vitamin C.', 'Polycarbonate Solar Tunnel Dryer / Heat Pump Dehydrator', 4),
('tea-coffee', 'Tea, Coffee & Botanicals', 'Coffee', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', 'Gentle drying of specialty green tea leaves, herbal tea blends, coffee beans, and dried flower petals.', 'Heat Pump Dehydrator / Industrial Electric Cabinet Dryer', 5),
('meat-fish-marine', 'Meat & Fish / Marine Products', 'Fish', 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80', 'Hygienic, odorless dehydration of fish, prawns, shrimp, squid, chicken jerky, and meat products complying with safety standards.', 'Polycarbonate Solar Tunnel Dryer / Hybrid Solar Dryer', 6),
('grains-seeds', 'Grains, Pulses & Seeds', 'Wheat', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', 'Conditioning and moisture control for paddy, maize, oilseeds, soybean, and agricultural seed stock prior to storage.', 'Biomass Fired Solar Tunnel Dryer', 7),
('pharma-chemical', 'Pharmaceuticals & Fine Chemicals', 'FlaskConical', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 'Drying active pharmaceutical ingredients (APIs), granules, powders, chemical salts, and dyes under cGMP cleanroom specs.', 'Industrial Electric Cabinet Tray Dryer', 8),
('herbal-extracts', 'Ayurvedic & Herbal Extracts', 'Flower2', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', 'Dehydration of roots, barks, leaves, and extract powders including Ashwagandha, Shatavari, Giloy, and Senna.', 'Heat Pump Dehydrator / Industrial Electric Tray Dryer', 9),
('flowers-botanicals', 'Flowers & Decorative Botanicals', 'Sun', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', 'Drying rose petals, marigold (lutein extract), jasmine, lavender, and potpourri for cosmetic and essential oil extraction.', 'Heat Pump Dehydrator', 10),
('coconut-copra', 'Coconut & Copra Drying', 'CircleDot', 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80', 'Rapid drying of coconut halves and kernel to produce high grade white copra and desiccated coconut powder.', 'Polycarbonate Solar Tunnel Dryer / Biomass Hybrid Dryer', 11),
('industrial-sludge', 'Industrial Waste & Sludge Dewatering', 'Factory', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 'Drying ETP/STP chemical sludge cakes, bio-solids, and factory waste streams to drastically reduce disposal weight and transportation costs.', 'Polycarbonate Solar Tunnel Dryer / Biomass Tunnel Dryer', 12);

-- Industry Benefits
DELETE FROM industry_benefits;
INSERT INTO industry_benefits (industry_id, benefit_text, display_order) VALUES
('spices-herbs-chilli', '95%+ Color, Shine & Essential Oil Retention', 1),
('spices-herbs-chilli', 'No aflatoxin contamination or bird/dust exposure', 2),
('spices-herbs-chilli', 'Reduces drying moisture from 80% to safe 8-10% in 1/3rd time', 3),
('spices-herbs-chilli', 'Meets stringent export quality norms', 4),

('fruits-vegetables', 'Extends shelf life up to 12-24 months without chemical preservatives', 1),
('fruits-vegetables', 'Prevents enzymatic browning and sugar caramelization', 2),
('fruits-vegetables', 'High rehydration ratio upon soaking', 3),
('fruits-vegetables', 'Ideal for snack food manufacturers & export markets', 4),

('onion-garlic', 'Prevents yellowing and pungency loss', 1),
('onion-garlic', 'Uniform moisture reduction to < 5%', 2),
('onion-garlic', 'Continuous bulk drying capacity up to 50 Tons/day', 3),
('onion-garlic', 'Low operational energy cost per kg output', 4),

('moringa-leaves', '100% UV Filtered indirect radiation options', 1),
('moringa-leaves', 'Retains vibrant green chlorophyll color without yellowing', 2),
('moringa-leaves', 'Zero microbial & Salmonella contamination risk', 3),
('moringa-leaves', 'Ultra-fast drying in under 8-10 hours', 4),

('tea-coffee', 'Controlled low-temperature moisture evaporation', 1),
('tea-coffee', 'Preserves delicate floral and earthy aroma profiles', 2),
('tea-coffee', 'Prevents leaf breakage and over-fermentation', 3),
('tea-coffee', 'Custom airflow velocity controls', 4),

('meat-fish-marine', 'Fully enclosed hygienic environment immune to flies & maggots', 1),
('meat-fish-marine', 'Precision temperature cycle with zero contamination', 2),
('meat-fish-marine', 'Significantly reduces drying odor in surroundings', 3),
('meat-fish-marine', 'Substantially improves export price per kg', 4),

('grains-seeds', 'Prevents germination during storage', 1),
('grains-seeds', 'Eliminates field moisture safely prior to milling', 2),
('grains-seeds', 'Uniform moisture level prevents mold & insect infestation', 3),
('grains-seeds', 'High bulk capacity handling', 4),

('pharma-chemical', 'Complete SS-316/304 construction with mirror finish', 1),
('pharma-chemical', 'HEPA air filtration options available', 2),
('pharma-chemical', 'Explosion-proof ATEX certified heating elements option', 3),
('pharma-chemical', 'Validation documentation (DQ/IQ/OQ/PQ) provided', 4),

('herbal-extracts', 'Preserves active phytochemicals (withanolides, alkaloids)', 1),
('herbal-extracts', 'Strict temperature limit control to avoid thermal degradation', 2),
('herbal-extracts', 'Prevents cross-contamination between herb batches', 3),
('herbal-extracts', 'Clean air circulation', 4),

('flowers-botanicals', 'Maintains original petal shape and vibrant pigmentation', 1),
('flowers-botanicals', 'Gentle low-velocity horizontal airflow prevents petal flutter', 2),
('flowers-botanicals', 'Retains concentrated essential fragrance oils', 3),
('flowers-botanicals', 'Fast cycle time', 4),

('coconut-copra', 'Eliminates traditional sulphur smoking requirement', 1),
('coconut-copra', 'Produces crystal white copra with higher oil yield', 2),
('coconut-copra', 'Reduces drying time from 7 days to 24-36 hours', 3),
('coconut-copra', 'Substantially higher market value per ton', 4),

('industrial-sludge', 'Reduces sludge weight by up to 60-75%', 1),
('industrial-sludge', 'Drastically slashes hazardous waste disposal tipping fees', 2),
('industrial-sludge', 'Low operating cost leveraging solar heat', 3),
('industrial-sludge', 'Robust corrosion resistant materials', 4);

-- Process Steps
DELETE FROM process_steps;
INSERT INTO process_steps (id, step_number, title, subtitle, description, icon, display_order) VALUES
(1, '01', 'Thermal Load & Psychrometric Analysis', 'Understanding Produce Dynamics', 'We analyze your raw product''s initial moisture content (e.g., 85%), target final moisture (e.g., 8%), daily tonnage, local ambient solar irradiation, and relative humidity to size the system precisely.', 'Calculator', 1),
(2, '02', 'CAD Modeling & Structural Engineering', 'Custom 3D Blueprinting', 'Our engineering team creates 3D CAD layouts of the tunnel structure, airflow ducts, fan placements, and tray placement, ensuring optimal thermal convection and easy trolley access.', 'DraftingCompass', 2),
(3, '03', 'Precision Fabrication & Quality Assembly', 'ISO 9001 Factory Standards', 'GI tubular structural arches are bent and galvanized, SS-304 trays are laser cut and perforated, and UV multiwall polycarbonate sheets are cut to millimeter accuracy in our Nashik facility.', 'Factory', 3),
(4, '04', 'Factory Testing & Sensor Calibration', 'Rigorous Pre-Shipment Inspection', 'Solar PV fan panels, PLC humidity controllers, auxiliary burners, and temperature sensors undergo 24-hour simulation testing before dispatch.', 'CheckSquare', 4),
(5, '05', 'On-Site Installation & Turnkey Setup', 'Professional Field Commissioning', 'Our certified installation technicians anchor the foundation civil structure, assemble the poly-sheet tunnel, mount solar fans, align trolleys, and connect power panels on your site.', 'Truck', 5),
(6, '06', 'Trial Run, SOP Training & After-Sales Support', 'Empowering Your Operations', 'We execute initial test batches with your actual produce, fine-tune temperature curves, train your operational crew, provide written SOP manuals, and assign a dedicated service account manager.', 'GraduationCap', 6);

-- Stats
DELETE FROM stats;
INSERT INTO stats (id, label, value, suffix, display_text, description, display_order) VALUES
('exp', 'Years of Manufacturing Experience', 20, '+', NULL, 'Specialized in thermal solar engineering and food dehydration', 1),
('states', 'States Served Across India', 5, '+', NULL, 'Wide customer base across key agricultural & industrial hubs', 2),
('savings', 'Average Energy Cost Reduction', 70, '%', NULL, 'Compared to traditional electric resistance or diesel heating', 3),
('retention', 'Made in India Excellence', 100, '%', '100%', 'Built with heavy-duty UV multiwall sheets & SS-304 trays', 4);
