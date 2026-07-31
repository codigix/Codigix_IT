import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import IotSidebar from '../components/new-iot-solutions/IotSidebar';
import IotHero from '../components/new-iot-solutions/IotHero';
import IotWhyChooseUs from '../components/new-iot-solutions/IotWhyChooseUs';
import IotArchitecture from '../components/new-iot-solutions/IotArchitecture';
import IotCapabilitiesAndUseCases from '../components/new-iot-solutions/IotCapabilitiesAndUseCases';
import IotTechAndIntegrations from '../components/new-iot-solutions/IotTechAndIntegrations';
import IotBottomCta from '../components/new-iot-solutions/IotBottomCta';
import NewHomeNav from '../components/new-home/NewHomeNav';
import CtaFooterSection from '../components/new-home/CtaFooterSection';
import '../components/new-iot-solutions/iot-solutions.css';

const NewIotSolutionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'Industrial IoT');

  useEffect(() => {
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="bg-[#0d0b21] min-h-screen font-sans text-white selection:bg-rose-500/30">
      
      {/* Navigation */}
      <NewHomeNav />
      
      {/* Main Layout Container */}
      <div className="iot-layout-container max-w-[1600px] mx-auto">
        
        {/* Main Content Area (Left Side) */}
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
          <IotHero activeTab={activeTab} />
          <IotWhyChooseUs activeTab={activeTab} />
          <IotArchitecture activeTab={activeTab} />
          <IotCapabilitiesAndUseCases activeTab={activeTab} />
          <IotTechAndIntegrations activeTab={activeTab} />
          <IotBottomCta activeTab={activeTab} />
        </div>
        
        {/* Sticky Sidebar (Right Side) */}
        <IotSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        
      </div>
      
      {/* Footer */}
      <div className="pt-24 border-t border-gray-800/30 mt-12 bg-black/20">
        <CtaFooterSection />
      </div>
      
    </div>
  );
};

export default NewIotSolutionsPage;
