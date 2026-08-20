import product1 from "../assets/images/products/product-1.jpeg";
import product2 from "../assets/images/products/product-2.jpeg";
import product3 from "../assets/images/products/product-3.jpeg";
import product4 from "../assets/images/products/product-4.jpeg";
import product5 from "../assets/images/products/product-5.jpeg";
import gallery1 from "../assets/images/gallery/gallery-1.jpeg";
import gallery2 from "../assets/images/gallery/gallery-2.jpeg";
import gallery3 from "../assets/images/gallery/gallery-3.jpeg";
import gallery4 from "../assets/images/gallery/gallery-4.jpeg";
import gallery5 from "../assets/images/gallery/gallery-5.jpeg";

export const products = [
  {
    id: "polycarbonate-solar-tunnel-dryer",
    slug: "solar-tunnel-dryer-fruits-vegetables",
    name: "Solar Tunnel Dryer for Fruits & Vegetables",
    tagline: "High-Efficiency Clean Solar Drying Preserving Natural Colour, Taste & Aroma",
    category: "Solar Dryers",
    featured: true,
    capacityRange: "100 kg to 5,000 kg / batch",
    efficiency: "85% Solar Thermal Absorption",
    temperatureRange: "45°C - 70°C (Controlled)",
    paybackPeriod: "12 - 18 Months",
    image: product1,
    secondaryImages: [
      gallery1,
      gallery2,
      gallery4
    ],
    shortDescription: "Ideal for drying fruits, vegetables, herbs, spices, flowers, and medicinal plants while preserving their natural colour, taste, aroma, and nutritional value.",
    fullDescription: "The Solar Tunnel Dryer for Fruits & Vegetables manufactured by Godas Business Corporation is a semi-cylindrical greenhouse structure engineered for agricultural and food processing applications. Built with GI / Stainless Steel structural arches and covered with imported multiwall UV-protected polycarbonate sheets, it creates a powerful trapped greenhouse effect that boosts internal temperatures 20°C to 30°C above ambient air.\n\nEquipped with solar-powered DC exhaust fans and humidity sensors, the system continuously flushes out moisture while protecting high-value crops from dust, rain, insects, birds, and UV degradation.",
    keyFeatures: [
      "Multiwall UV-Protected Polycarbonate Cladding (10-Year Warranty)",
      "High-grade Food SS-304 / GI Mesh Trays & Trolleys",
      "Automated Temperature & Humidity Fan Controller",
      "Solar PV Powered Forced Convection Exhaust System",
      "Eligible for 35% to 90% Government Subsidy"
    ],
    specifications: {
      "Structure Material": "Galvanized Iron (GI) or Food Grade SS-304 Tubular Frame",
      "Covering Material": "UV-Stabilized Multiwall Polycarbonate Sheet (4mm - 8mm)",
      "Tray Material": "Food Grade Stainless Steel (SS-304) Mesh Trays",
      "Government Subsidy": "Eligible for up to 35% - 90% Subsidy under Govt Agro Schemes"
    },
    suitableFor: [
      "Fruits & Slices (Mango, Banana, Apple)",
      "Vegetables (Onion, Garlic, Tomato, Spinach)",
      "Spices & Herbs (Chilli, Turmeric, Ginger, Moringa)"
    ],
    dryingTimeComparison: [
      { product: "Red Chilli", openSun: "7-9 Days", solarTunnel: "2.5-3 Days" },
      { product: "Moringa Leaves", openSun: "3-4 Days", solarTunnel: "8-12 Hours" }
    ],
    brochureUrl: "#quote-modal",
    faqs: []
  },
  {
    id: "solar-hybrid-dryer",
    slug: "solar-hybrid-dryer",
    name: "Solar Hybrid Dryer",
    tagline: "Continuous 24/7 Weather-Independent Drying with Dual Heat Integration",
    category: "Hybrid Systems",
    featured: true,
    capacityRange: "200 kg to 5,000 kg / batch",
    efficiency: "92% System Thermal Yield",
    temperatureRange: "40°C - 85°C (Precision Controlled)",
    paybackPeriod: "10 - 14 Months",
    image: product2,
    secondaryImages: [
      gallery3
    ],
    shortDescription: "A combination of solar energy and backup heating systems for continuous drying, even during cloudy weather.",
    fullDescription: "The Solar Hybrid Dryer combines free solar energy during daytime with automatic auxiliary thermal backup (Biomass Pellet Stove, Heat Pump, or Electric Heating) for seamless night-time and rainy season operation. When solar gain drops, the automated controller triggers auxiliary heating to ensure zero downtime.",
    keyFeatures: [
      "Dual Heat Source Integration (Solar + Auxiliary Backup)",
      "Smart Auto-Switching PLC Panel with Touchscreen HMI",
      "Continuous 24/7 All-Weather Drying Operation",
      "Biomass Pellet Option for Lowest Fuel Cost"
    ],
    specifications: {
      "Primary Heat Source": "Polycarbonate Solar Collector",
      "Secondary Heat Source": "Biomass Pellet Burner / Electric Auxiliary",
      "Control System": "PLC Digital Sensor & Relay Panel"
    },
    suitableFor: [
      "Export Quality Onion & Garlic Powder",
      "High-Value Ayush Herbal Extracts",
      "Spices: Pepper, Cardamom, Chilli, Turmeric"
    ],
    dryingTimeComparison: [],
    brochureUrl: "#quote-modal",
    faqs: []
  },
  {
    id: "industrial-solar-tunnel-dryer",
    slug: "industrial-solar-tunnel-dryer",
    name: "Industrial Solar Tunnel Dryer",
    tagline: "High-Capacity Commercial Drying for FPOs, Exporters & Processors",
    category: "Industrial Solar",
    featured: true,
    capacityRange: "500 kg to 10,000 kg / batch",
    efficiency: "High-Volume Thermal Recovery",
    temperatureRange: "45°C - 75°C",
    paybackPeriod: "8 - 14 Months",
    image: product3,
    secondaryImages: [
      gallery5
    ],
    shortDescription: "High-capacity drying solution specially designed for food processing industries, Farmer Producer Organizations (FPOs), exporters, and commercial businesses.",
    fullDescription: "Designed specifically for commercial agro-processors, food exporters, and large FPOs, the Industrial Solar Tunnel Dryer offers massive daily throughput. Built with heavy-duty structural steel and multi-row trolley configurations for fast batch loading.",
    keyFeatures: [
      "High-Capacity Batch Processing (up to 10 Tons)",
      "Custom Multi-Row Trolley Track Design",
      "Heavy Duty Forced Convection Blower Fans",
      "Government Subsidy Ready (35% to 90%)"
    ],
    specifications: {
      "Capacity": "500 kg to 10,000 kg / batch",
      "Material": "Heavy Structural GI / SS-304"
    },
    suitableFor: [
      "Farmer Producer Organizations (FPOs)",
      "Spices & Agro Export Facilities",
      "Commercial Dehydration Plants"
    ],
    dryingTimeComparison: [],
    brochureUrl: "#quote-modal",
    faqs: []
  },
  {
    id: "industrial-hybrid-dryer",
    slug: "industrial-hybrid-dryer",
    name: "Industrial Hybrid Dryer",
    tagline: "Commercial-Grade System with Precision Temperature Control All Year Round",
    category: "Industrial Hybrid",
    featured: true,
    capacityRange: "1,000 kg to 15,000 kg / batch",
    efficiency: "Commercial Thermal Efficiency",
    temperatureRange: "40°C - 90°C",
    paybackPeriod: "10 - 16 Months",
    image: product4,
    secondaryImages: [
      gallery2
    ],
    shortDescription: "A commercial-grade drying system with advanced temperature control for consistent drying throughout the year.",
    fullDescription: "The Industrial Hybrid Dryer provides commercial food processing factories with year-round climate independence. Combining solar collector roofs with high-efficiency burners or electric banks under automated PID/PLC monitoring.",
    keyFeatures: [
      "Year-Round Constant Batch Drying",
      "Advanced Multi-Zone Temperature Control",
      "Insulated Double-Walled Panels",
      "Integrated Humidity & Moisture Sensors"
    ],
    specifications: {
      "Automation": "PLC Controller with HMI Display",
      "Structure": "Insulated Sandwich Panels & Solar Polycarbonate"
    },
    suitableFor: [
      "Onion & Garlic Processing Factories",
      "Pharmaceutical Granules & Botanical Extracts",
      "Large Agro Exporters"
    ],
    dryingTimeComparison: [],
    brochureUrl: "#quote-modal",
    faqs: []
  },
  {
    id: "custom-solar-drying-solutions",
    slug: "custom-solar-drying-solutions",
    name: "Custom Solar Drying Solutions",
    tagline: "Tailor-Made Systems Built Around Your Specific Crop & Facility Footprint",
    category: "Custom Systems",
    featured: true,
    capacityRange: "Custom Capacity as per Requirement",
    efficiency: "Tailored Thermal Engineering",
    temperatureRange: "35°C - 85°C",
    paybackPeriod: "12 - 18 Months",
    image: product5,
    secondaryImages: [
      gallery4
    ],
    shortDescription: "Customized solar drying systems designed according to product type, production capacity, and customer requirements.",
    fullDescription: "Every agricultural produce has unique moisture curves and bulk density. Godas Business Corporation designs and fabricates custom solar drying systems engineered to match your plant's exact dimensions, available energy sources, and target drying metrics.",
    keyFeatures: [
      "Custom Engineering for Unique Crops & Materials",
      "Tailored Footprint & Tray Size Configurations",
      "Multi-Fuel Heating Integration Options",
      "Full Turnkey Installation & Technical SOPs"
    ],
    specifications: {
      "Capacity": "Customized based on client mandate",
      "Design": "CAD / Psychrometric Engineered Layout"
    },
    suitableFor: [
      "Specialty Herbs & Flowers",
      "Industrial Sludge & Chemical Dewatering",
      "Unique Regional Fruits & Grain Drying"
    ],
    dryingTimeComparison: [],
    brochureUrl: "#quote-modal",
    faqs: []
  },
  {
    id: "heat-pump-food-dehydrators",
    slug: "heat-pump-food-dehydrators",
    name: "Heat Pump Food Dehydrators",
    tagline: "Ultra Energy-Efficient Closed-Loop Dehumidification for Superfoods",
    category: "Dehydrators",
    featured: true,
    capacityRange: "100 kg to 2,000 kg / batch",
    efficiency: "Uses 75% Less Power than Resistance Heaters",
    temperatureRange: "20°C - 75°C (Low Temperature)",
    paybackPeriod: "8 - 14 Months",
    image: product1,
    secondaryImages: [
      gallery1
    ],
    shortDescription: "High-performance food dehydrators offering precise temperature control, faster drying, and maximum energy efficiency for all-weather commercial dehydration.",
    fullDescription: "Our Heat Pump Food Dehydrators operate on closed-loop dehumidification technology. By condensing moisture out of circulating air and recovering heat, these dehydrators consume 75% less electricity while preserving 98% of natural color, aroma, and vitamins.",
    keyFeatures: [
      "Closed-Loop Dehumidification Technology",
      "75% Lower Electrical Energy Consumption",
      "Low Temperature Preservation (30°C - 65°C)",
      "Preserves Sensitive Vitamins, Aroma & Flavor"
    ],
    specifications: {
      "Technology": "Closed-Loop Heat Pump Dehumidifier",
      "Compressor": "Copeland / Panasonic High-Efficiency Scroll Compressor",
      "Energy Savings": "Up to 75% compared to electrical heating"
    },
    suitableFor: [
      "Export Grade Fruits & Berries",
      "Medicinal Herbs & Botanical Extracts",
      "Superfood Powders & Flowers"
    ],
    dryingTimeComparison: [],
    brochureUrl: "#quote-modal",
    faqs: []
  }
];
