import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailsPage = lazy(() => import('./pages/ServiceDetailsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailsPage = lazy(() => import('./pages/BlogDetailsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy load admin components
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const HeroSlides = lazy(() => import('./pages/admin/entities/HeroSlides'));
const ServicesAdmin = lazy(() => import('./pages/admin/entities/ServicesAdmin'));
const ProjectsAdmin = lazy(() => import('./pages/admin/entities/ProjectsAdmin'));
const BlogsAdmin = lazy(() => import('./pages/admin/entities/BlogsAdmin'));
const TestimonialsAdmin = lazy(() => import('./pages/admin/entities/TestimonialsAdmin'));
const ClientsAdmin = lazy(() => import('./pages/admin/entities/ClientsAdmin'));
const WorkingProcessAdmin = lazy(() => import('./pages/admin/entities/WorkingProcessAdmin'));
const AchievementsAdmin = lazy(() => import('./pages/admin/entities/AchievementsAdmin'));
const TeamAdmin = lazy(() => import('./pages/admin/entities/TeamAdmin'));
const JobsAdmin = lazy(() => import('./pages/admin/entities/JobsAdmin'));
const ApplicationsAdmin = lazy(() => import('./pages/admin/entities/ApplicationsAdmin'));
const AdminLayout = lazy(() => import('./pages/admin/components/AdminLayout'));

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Nested Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/slides" element={<HeroSlides />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/admin/blogs" element={<BlogsAdmin />} />
          <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
          <Route path="/admin/clients" element={<ClientsAdmin />} />
          <Route path="/admin/workingProcess" element={<WorkingProcessAdmin />} />
          <Route path="/admin/achievements" element={<AchievementsAdmin />} />
          <Route path="/admin/team" element={<TeamAdmin />} />
          <Route path="/admin/jobs" element={<JobsAdmin />} />
          <Route path="/admin/applications" element={<ApplicationsAdmin />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/banner" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/details/:id?" element={<ServiceDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/details/:id" element={<ProjectDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/details/:id" element={<BlogDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
 <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
