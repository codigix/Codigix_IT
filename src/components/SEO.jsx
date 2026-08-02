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
  ogType,
  twitterHandle,
  exactTitle,
  robots,
  schema,
  children
}) => {
  const siteName = config.SITE_NAME || "Codigix Infotech";
  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const fullTitle = exactTitle ? title : (title ? `${title} | ${siteName}` : `${siteName} - AI-Powered IT Solutions & Software Engineering`);
  const finalMetaTitle = metaTitle || fullTitle;
  const finalOgTitle = ogTitle || fullTitle;
  const defaultDescription = "Codigix Infotech delivers cutting-edge AI-powered solutions, custom software engineering, IoT platform development, ERP, CRM, and predictive analytics.";
  const defaultKeywords = "AI solutions, IoT software development, ERP development, CRM solutions, custom software engineering, machine learning, predictive analytics, Codigix Infotech";

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const fullCanonical = canonical || `${siteUrl}${currentPath}`;
  const robotsDirective = robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Format schema into JSON-LD scripts array
  const schemasToRender = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={finalMetaTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || `${siteUrl}/assets/images/logos/logo.webp`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={ogImage || `${siteUrl}/assets/images/logos/logo.webp`} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Structured Data (JSON-LD) for Google Rich Snippets */}
      {schemasToRender.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}

      {/* Custom Children Tags */}
      {children}
    </Helmet>
  );
};

export default SEO;
