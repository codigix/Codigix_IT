import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const industryData = {
  'Manufacturing': {
    title: 'Empowering Manufacturing Excellence',
    desc: 'From shop floor to top floor, we help manufacturers digitize operations, reduce downtime, and increase productivity with smart ERP, IoT, and AI-driven analytics.',
    features: [
      'Production Planning & Control', 'IoT Machine Monitoring',
      'Inventory & Warehouse Management', 'Predictive Maintenance',
      'Quality Control & Compliance', 'Real-time Dashboards & Analytics',
      'Supply Chain Management', 'Workforce & Payroll Management'
    ],
    image: '/assets/images/service/erp_dashboard.webp',
    btnText: 'View Manufacturing Solutions'
  },
  'Healthcare': {
    title: 'Transforming Patient Care Digitally',
    desc: 'We empower healthcare providers with secure, compliant, and intuitive systems to streamline hospital management and enhance patient experiences.',
    features: [
      'Hospital Management System (HMS)', 'Telemedicine Platforms',
      'Electronic Health Records (EHR)', 'Patient Portal & Booking',
      'Medical Billing & Insurance', 'Pharmacy Management',
      'Lab & Diagnostics Integration', 'Healthcare Compliance (HIPAA)'
    ],
    image: '/assets/images/service/ai_brain.png',
    btnText: 'View Healthcare Solutions'
  },
  'Retail': {
    title: 'Revolutionizing Retail & E-Commerce',
    desc: 'Deliver seamless omnichannel shopping experiences with our intelligent retail solutions, bridging the gap between physical stores and digital commerce.',
    features: [
      'Custom E-Commerce Platforms', 'Omnichannel Retailing',
      'Point of Sale (POS) Systems', 'Customer Loyalty Programs',
      'Inventory Optimization', 'Personalized Recommendations',
      'Supply Chain Visibility', 'Retail Analytics & Insights'
    ],
    image: '/assets/images/service/ecommerce_dashboard.webp',
    btnText: 'View Retail Solutions'
  },
  'Finance': {
    title: 'Secure & Scalable FinTech Solutions',
    desc: 'Navigate the complex financial landscape with robust software that ensures security, regulatory compliance, and exceptional user experiences.',
    features: [
      'Core Banking Solutions', 'Secure Payment Gateways',
      'Wealth Management Apps', 'Fraud Detection Systems',
      'Accounting & Invoicing', 'Regulatory Compliance Tools',
      'Cryptocurrency Platforms', 'Financial Analytics'
    ],
    image: '/assets/images/service/crm_dashboard.webp',
    btnText: 'View Finance Solutions'
  },
  'Real Estate': {
    title: 'Digitizing the Real Estate Journey',
    desc: 'Streamline property management, enhance broker efficiency, and provide immersive property buying experiences with our real estate tech solutions.',
    features: [
      'Property Management Systems', 'Real Estate CRM',
      'Virtual Tours (AR/VR)', 'Tenant & Landlord Portals',
      'Lead Generation & Tracking', 'Contract & Lease Management',
      'Smart Home IoT Integration', 'Market Analytics'
    ],
    image: '/assets/images/service/ui_ux_designing_dashboard.webp',
    btnText: 'View Real Estate Solutions'
  }
};

const IndustryHighlight = ({ activeIndustry }) => {
  const navigate = useNavigate();
  const data = industryData[activeIndustry] || industryData['Manufacturing'];

  return (
    <div id="industry-highlight" className="py-12 scroll-mt-24">
      <div className="bg-[#050112] border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeIndustry}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col lg:flex-row"
          >
            {/* Image Side */}
            <div className="lg:w-2/5 relative p-4">
               <div className="w-full h-full rounded-xl overflow-hidden relative min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050112] z-10 lg:block hidden"></div>
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover filter contrast-110 brightness-90 mix-blend-screen"
                  />
               </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-8 lg:p-12 z-20 flex flex-col justify-center">
              <h4 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-3">
                {activeIndustry}
              </h4>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                {data.title}
              </h2>
              <p className="text-[13px] text-gray-400 leading-relaxed mb-8 max-w-2xl">
                {data.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                    <span className="text-[12px] text-gray-300 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/new-contact')}
                className="self-start px-6 py-3 bg-[#9333ea] hover:bg-[#a855f7] text-white text-[12px] font-medium rounded-md shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
              >
                {data.btnText} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default IndustryHighlight;
