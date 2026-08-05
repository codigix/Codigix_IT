import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import CareerSidebar from '../components/new-career/CareerSidebar';
import CareerHero from '../components/new-career/CareerHero';
import CareerStats from '../components/new-career/CareerStats';
import CareerBenefits from '../components/new-career/CareerBenefits';
import CareerJobs, { fallbackJobs } from '../components/new-career/CareerJobs';
import CareerLife from '../components/new-career/CareerLife';
import CareerTestimonials from '../components/new-career/CareerTestimonials';
import CareerBottomCta from '../components/new-career/CareerBottomCta';
import CareerFaq, { careerFaqs } from '../components/new-career/CareerFaq';
import JobApplyModal from '../components/new-career/JobApplyModal';
import config from '../config';
import '../components/new-career/career.css';

const NewCareerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeDepartment, setActiveDepartment] = useState(tabQuery || 'All Departments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (tabQuery) {
      setActiveDepartment(tabQuery);
    }
  }, [tabQuery]);

  const handleDepartmentChange = (dept) => {
    setActiveDepartment(dept);
    setSearchParams({ tab: dept });
  };

  const handleOpenModal = (job = null) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const siteUrl = config.SITE_URL || "https://codigixinfotech.com";
  const canonicalUrl = `${siteUrl}/career${activeDepartment !== 'All Departments' ? `?tab=${activeDepartment}` : ''}`;

  const pageTitle = activeDepartment === 'All Departments'
    ? "Careers & Job Openings | Join Codigix Infotech Engineering Team"
    : `${activeDepartment} Jobs & Careers | Codigix Infotech`;

  const metaDescription = "Explore career opportunities at Codigix Infotech. Join our engineering, AI, IoT, design, and sales teams in Pune, India. Enjoy competitive salaries, leadership growth, and hybrid work culture.";

  // JSON-LD Schemas for Google for Jobs and Rich Snippets
  const jobPostingSchemas = fallbackJobs.map(job => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": `${job.title} - ${job.desc}. Experience required: ${job.exp}. Location: ${job.location}. Department: ${job.dept}. Join Codigix Infotech's innovative software engineering team.`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Codigix Infotech",
      "value": `CODIGIX-JOB-${job.id}`
    },
    "datePosted": "2026-08-01",
    "validThrough": "2026-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Codigix Infotech",
      "sameAs": siteUrl,
      "logo": `${siteUrl}/assets/images/logos/logo.webp`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    }
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Careers",
        "item": `${siteUrl}/career`
      },
      ...(activeDepartment !== 'All Departments' ? [{
        "@type": "ListItem",
        "position": 3,
        "name": activeDepartment,
        "item": canonicalUrl
      }] : [])
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": careerFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codigix Infotech",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/images/logos/logo.webp`,
    "sameAs": [
      "https://www.linkedin.com/company/135144609/admin/",
      "https://www.facebook.com/codigix.infotech",
      "https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==",
      "https://x.com/CodigixI2994",
      "https://www.youtube.com/@codigixinfotech"
    ]
  };

  return (
    <>
      <SEO
        title={pageTitle}
        metaTitle={pageTitle}
        description={metaDescription}
        keywords={`IT careers Pune, software developer jobs Pune, Full Stack developer job, React developer jobs, UI UX designer job, Codigix Infotech careers, technology jobs India, AI engineering jobs, ${activeDepartment} jobs`}
        canonical={canonicalUrl}
        ogImage={`${siteUrl}/assets/images/logos/logo.webp`}
        schemaData={[...jobPostingSchemas, breadcrumbSchema, faqSchema, organizationSchema]}
      />

      <div className="bg-theme-bg min-h-screen font-sans text-slate-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

        {/* Navigation */}
        <header>
          <NewHomeNav />
        </header>

        {/* Main Layout Container */}
        <main className="mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-gray-400 mb-8 tracking-wide uppercase font-bold">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <span className="mx-1 text-gray-600">›</span>
            <Link to="/career" className="text-purple-650 dark:text-purple-400 font-medium">Career</Link>
            <span className="mx-1 text-gray-600">›</span>
            <span className="text-slate-900 dark:text-white font-medium">{activeDepartment}</span>
          </nav>

          {/* 2-Column Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">

            {/* Left Main Content Area */}
            <div className="flex-1 min-w-0 space-y-12">
              <CareerHero onApply={() => handleOpenModal()} />
              <CareerStats />
              <CareerBenefits />
              <CareerJobs
                activeDepartment={activeDepartment}
                setActiveDepartment={handleDepartmentChange}
                onApply={(job) => handleOpenModal(job)}
              />
              <CareerLife />
              <CareerTestimonials />
              <CareerFaq />
              <CareerBottomCta onApply={() => handleOpenModal()} />
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30" aria-label="Career Information & Perks">
              <CareerSidebar />
            </aside>

          </div>

        </main>

        {/* Job Application Modal */}
        <JobApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />

        {/* Footer */}
        <footer className="pt-24 border-t border-slate-200 dark:border-gray-800/30 mt-12 bg-slate-50/50 dark:bg-black/20">
          <CtaFooterSection />
        </footer>

      </div>
    </>
  );
};

export default NewCareerPage;
