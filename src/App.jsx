import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import ExternalStyles from './components/ExternalStyles';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import HeroSlides from './pages/admin/entities/HeroSlides';
import ServicesAdmin from './pages/admin/entities/ServicesAdmin';
import ProjectsAdmin from './pages/admin/entities/ProjectsAdmin';
import BlogsAdmin from './pages/admin/entities/BlogsAdmin';
import TestimonialsAdmin from './pages/admin/entities/TestimonialsAdmin';
import ClientsAdmin from './pages/admin/entities/ClientsAdmin';
import WorkingProcessAdmin from './pages/admin/entities/WorkingProcessAdmin';
import AchievementsAdmin from './pages/admin/entities/AchievementsAdmin';
import TeamAdmin from './pages/admin/entities/TeamAdmin';

import AdminLayout from './pages/admin/components/AdminLayout';

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
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <>
      <ExternalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/details" element={<ServiceDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/details" element={<ProjectDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/details" element={<BlogDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
