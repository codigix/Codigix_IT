import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { trackPageView } from './utils/analytics';

// Lazy load active pages
const NewHomePage = lazy(() => import('./pages/NewHomePage'));
const NewAiSolutionsPage = lazy(() => import('./pages/NewAiSolutionsPage'));
const NewIotSolutionsPage = lazy(() => import('./pages/NewIotSolutionsPage'));
const NewErpSolutionsPage = lazy(() => import('./pages/NewErpSolutionsPage'));
const NewCrmSolutionsPage = lazy(() => import('./pages/NewCrmSolutionsPage'));
const NewOtherServicesPage = lazy(() => import('./pages/NewOtherServicesPage'));
const NewIndustriesPage = lazy(() => import('./pages/NewIndustriesPage'));
const NewCaseStudiesPage = lazy(() => import('./pages/NewCaseStudiesPage'));
const NewCaseStudyDetailsPage = lazy(() => import('./pages/NewCaseStudyDetailsPage'));
const NewCareerPage = lazy(() => import('./pages/NewCareerPage'));
const NewAboutPage = lazy(() => import('./pages/NewAboutPage'));
const NewContactPage = lazy(() => import('./pages/NewContactPage'));
const NewBlogPage = lazy(() => import('./pages/NewBlogPage'));
const NewBlogDetailsPage = lazy(() => import('./pages/NewBlogDetailsPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy load admin components
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CaseStudiesAdmin = lazy(() => import('./pages/admin/entities/CaseStudiesAdmin'));
const BlogsAdmin = lazy(() => import('./pages/admin/entities/BlogsAdmin'));
const TestimonialsAdmin = lazy(() => import('./pages/admin/entities/TestimonialsAdmin'));
const ClientsAdmin = lazy(() => import('./pages/admin/entities/ClientsAdmin'));
const JobsAdmin = lazy(() => import('./pages/admin/entities/JobsAdmin'));
const ApplicationsAdmin = lazy(() => import('./pages/admin/entities/ApplicationsAdmin'));
const InquiriesAdmin = lazy(() => import('./pages/admin/entities/InquiriesAdmin'));
const AdminLayout = lazy(() => import('./pages/admin/components/AdminLayout'));

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAdmin) {
      trackPageView(location.pathname + location.search, document.title);
    }
  }, [location.pathname, location.search, isAdmin]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Nested Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/case-studies" element={<CaseStudiesAdmin />} />
          <Route path="/admin/blogs" element={<BlogsAdmin />} />
          <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
          <Route path="/admin/clients" element={<ClientsAdmin />} />
          <Route path="/admin/jobs" element={<JobsAdmin />} />
          <Route path="/admin/applications" element={<ApplicationsAdmin />} />
          <Route path="/admin/inquiries" element={<InquiriesAdmin />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Primary Clean SEO Routes */}
      <Route path="/" element={<NewHomePage />} />
      <Route path="/home" element={<NewHomePage />} />

      {/* AI Solutions */}
      <Route path="/ai-solutions" element={<NewAiSolutionsPage />} />

      {/* IoT Solutions */}
      <Route path="/iot-solutions" element={<NewIotSolutionsPage />} />

      {/* ERP Solutions */}
      <Route path="/erp-solutions" element={<NewErpSolutionsPage />} />

      {/* CRM Solutions */}
      <Route path="/crm-solutions" element={<NewCrmSolutionsPage />} />

      {/* Services */}
      <Route path="/services" element={<NewOtherServicesPage />} />
      <Route path="/other-services" element={<NewOtherServicesPage />} />

      {/* Industries */}
      <Route path="/industries" element={<NewIndustriesPage />} />

      {/* Case Studies / Projects */}
      <Route path="/case-studies" element={<NewCaseStudiesPage />} />
      <Route path="/projects" element={<NewCaseStudiesPage />} />
      <Route path="/case-studies/:id" element={<NewCaseStudyDetailsPage />} />

      {/* Career */}
      <Route path="/career" element={<NewCareerPage />} />
      <Route path="/careers" element={<NewCareerPage />} />

      {/* About */}
      <Route path="/about" element={<NewAboutPage />} />

      {/* Contact */}
      <Route path="/contact" element={<NewContactPage />} />

      {/* Legal Routes */}
      <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      <Route path="/terms" element={<TermsConditionsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />

      {/* Blogs */}
      <Route path="/blog" element={<NewBlogPage />} />
      <Route path="/blogs" element={<NewBlogPage />} />
      <Route path="/blog/:id" element={<NewBlogDetailsPage />} />
      <Route path="/blogs/:id" element={<NewBlogDetailsPage />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#030014] flex items-center justify-center text-white font-mono text-sm">Loading Codigix...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
