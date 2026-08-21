import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({ 
  title = "Godas Business Corporation | Solar Tunnel Dryer & Food Dehydration Manufacturer", 
  description = "Leading manufacturer of Polycarbonate Solar Tunnel Dryers, Hybrid Solar Dryers, Industrial Electric Tray Dryers & Food Dehydrators in Maharashtra, India.",
  keywords = "Solar Tunnel Dryer Manufacturer India, Solar Tunnel Dryer Maharashtra, Polycarbonate Solar Dryer, Hybrid Solar Dryer, Electric Tray Dryer Manufacturer, Food Dehydration Equipment",
  canonicalUrl = "https://godasbusinesscorp.com",
  schemaData = null
}) {
  const fullTitle = title.includes("Godas Business Corporation") 
    ? title 
    : `${title} | Godas Business Corporation`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Godas Business Corporation" />

      {/* JSON-LD Schema */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
