import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import CareerSidebar from '../components/new-career/CareerSidebar';
import CareerHero from '../components/new-career/CareerHero';
import CareerStats from '../components/new-career/CareerStats';
import CareerBenefits from '../components/new-career/CareerBenefits';
import CareerJobs from '../components/new-career/CareerJobs';
import CareerLife from '../components/new-career/CareerLife';
import CareerTestimonials from '../components/new-career/CareerTestimonials';
import CareerBottomCta from '../components/new-career/CareerBottomCta';
import JobApplyModal from '../components/new-career/JobApplyModal';
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

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-purple-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Layout Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-8 tracking-wide uppercase font-bold">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-purple-400 font-medium">Career</span>
          <span className="mx-1 text-gray-600">›</span>
          <span className="text-white font-medium">{activeDepartment}</span>
        </div>

        {/* 2-Column Main Layout: Left Side (Scrollable Content), Right Side (Sticky Sidebar) */}
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
             <CareerBottomCta onApply={() => handleOpenModal()} />
           </div>

           {/* Right Sticky Sidebar */}
           <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 sticky top-28 z-30">
             <CareerSidebar />
           </div>

        </div>

      </div>
      
      {/* Job Application Modal */}
      <JobApplyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewCareerPage;
