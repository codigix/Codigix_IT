import React from 'react';
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist. Return to Codigix home page for AI-powered IT solutions."
      />
      <section className="tj-error-section section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tj-error-content text-center">
                <div className="error-img mb-10">
                  <h1 style={{ fontSize: '150px', fontWeight: 'bold', color: 'var(--tj-color-theme-primary)' }}>404</h1>
                </div>
                <h2 className="title mb-6">Oops! Page Not Found</h2>
                <p className="desc mb-10">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/" className="tj-primary-btn">
                  <div className="btn-inner">
                    <span className="btn-icon h-icon"><i className="tji-arrow-right"></i></span>
                    <span className="btn-text">Back to Home</span>
                    <span className="btn-icon"><i className="tji-arrow-right"></i></span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
