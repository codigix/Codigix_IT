import React from "react";
import { Helmet } from "react-helmet-async";
import config from "../config";

const SEO = ({ title, description, keywords, canonical, ogImage, ogType, twitterHandle }) => {
  const siteName = config.SITE_NAME;
  const siteUrl = config.SITE_URL;
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - AI-Powered IT Solutions`;
  const defaultDescription = "Codigix provides cutting-edge AI-powered solutions, custom technology, predictive analytics, and software engineering services.";
  const defaultKeywords = "AI solutions, IT services, software engineering, machine learning, computer vision, predictive analytics, Codigix";

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const fullCanonical = canonical || `${siteUrl}${currentPath}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || `${siteUrl}/assets/images/logos/logo.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={ogImage || `${siteUrl}/assets/images/logos/logo.png`} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />
    </Helmet>
  );
};

export default SEO;
