import React from "react";
import { Helmet } from "react-helmet-async";
import config from "../config";

const SEO = ({
  title,
  metaTitle,
  ogTitle,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  twitterHandle = "@codigix",
  exactTitle = false,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schemaData = null,
  children
}) => {
  const siteName = config.SITE_NAME || "Codigix Infotech";
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  
  const fullTitle = exactTitle 
    ? title 
    : title 
      ? `${title} | ${siteName}` 
      : `${siteName} | AI Solutions, Industrial IoT & Custom Software Engineering`;
      
  const finalMetaTitle = metaTitle || fullTitle;
  const finalOgTitle = ogTitle || fullTitle;
  
  const defaultDescription =
    "Codigix Infotech delivers cutting-edge AI-powered solutions, custom software engineering, Industrial IoT automation, enterprise ERP/CRM systems, and predictive analytics.";
  const defaultKeywords =
    "AI solutions, Industrial IoT, ERP development, CRM development, machine learning, computer vision, predictive analytics, custom software engineering, Codigix Infotech";
  
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const fullCanonical = canonical || `${siteUrl}${currentPath === "/" ? "" : currentPath}`;
  const finalOgImage = ogImage || `${siteUrl}/assets/images/logos/logo.png`;

  // Process structured JSON-LD schemas
  const schemasToRender = Array.isArray(schemaData)
    ? schemaData
    : schemaData
    ? [schemaData]
    : [];

  return (
    <Helmet>
      {/* HTML Attributes */}
      <html lang="en" />

      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={finalMetaTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Codigix Infotech" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonical} />

      {/* Dynamic JSON-LD Structured Data */}
      {schemasToRender.map((schema, index) => (
        <script key={`jsonld-schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Custom Children Tags */}
      {children}
    </Helmet>
  );
};

export default SEO;
