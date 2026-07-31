import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Smartphone, PenTool, Cloud, Infinity } from 'lucide-react';

// Web Dev Simulator
const WebDevSimulator = () => {
  return (
    <div className="w-full h-[180px] border border-gray-800 bg-[#07041a] p-5 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-600/5 blur-2xl rounded-full" />
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 relative z-10">
        <span className="text-indigo-400 font-bold uppercase tracking-wider">web_dev_playground.js</span>
        <span className="nh-led-active bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>
      </div>
      <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center relative z-10">
        <div className="text-gray-500">// Initialize responsive layout</div>
        <div className="text-indigo-300">const App = () =&gt; &#123;</div>
        <div className="text-white pl-4">return &lt;div className="grid-layout"&gt;;</div>
        <div className="text-indigo-300">&#125;</div>
      </div>
      <div className="text-[8px] text-gray-500 text-right relative z-10">Compile check: <span className="text-green-400 font-bold">READY</span></div>
    </div>
  );
};

// Mobile App Simulator
const MobileAppSimulator = () => {
  return (
    <div className="w-full h-[180px] border border-gray-800 bg-[#07041a] p-5 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-purple-600/5 blur-2xl rounded-full" />
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 relative z-10">
        <span className="text-purple-400 font-bold uppercase tracking-wider">mobile_simulator_frame</span>
        <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
      </div>
      <div className="my-3 flex justify-around items-center flex-1 relative z-10">
        <div className="w-16 h-28 border border-gray-800 bg-[#050117] rounded-lg p-1.5 flex flex-col justify-between">
          <div className="w-full h-1 bg-gray-800 rounded"></div>
          <div className="text-center text-[7px] text-gray-500">iOS Wireframe</div>
          <div className="w-3 h-3 rounded-full border border-gray-800 mx-auto"></div>
        </div>
        <div className="w-16 h-28 border border-gray-800 bg-[#050117] rounded-lg p-1.5 flex flex-col justify-between">
          <div className="w-full h-1 bg-gray-800 rounded"></div>
          <div className="text-center text-[7px] text-gray-500">Android</div>
          <div className="w-3 h-3 rounded-full border border-gray-800 mx-auto"></div>
        </div>
      </div>
      <div className="text-[8px] text-gray-500 text-right relative z-10">Framework: <span className="text-cyan-400 font-bold">REACT NATIVE / FLUTTER</span></div>
    </div>
  );
};

// UI/UX Simulator
const UiUxSimulator = () => {
  return (
    <div className="w-full h-[180px] border border-gray-800 bg-[#07041a] p-5 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-fuchsia-600/5 blur-2xl rounded-full" />
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 relative z-10">
        <span className="text-fuchsia-400 font-bold uppercase tracking-wider">ui_ux_wireframe_designer</span>
        <span className="nh-led-active bg-fuchsia-500 shadow-[0_0_8px_#d946ef]"></span>
      </div>
      <div className="my-3 flex-1 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-dashed border-fuchsia-500/30 h-8 rounded flex items-center justify-center bg-fuchsia-950/10 hover:border-fuchsia-500/80 transition-all cursor-pointer">
              <span className="text-[7px] text-fuchsia-400/60">DIV_{i+1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[8px] text-gray-500 text-right relative z-10">Figma component mapping: <span className="text-green-400 font-bold">SYNCED</span></div>
    </div>
  );
};

// Cloud Solutions Simulator
const CloudSolutionsSimulator = () => {
  return (
    <div className="w-full h-[180px] border border-gray-800 bg-[#07041a] p-5 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-full" />
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 relative z-10">
        <span className="text-blue-400 font-bold uppercase tracking-wider">cloud_deployment_status</span>
        <span className="nh-led-active bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
      </div>
      <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex justify-between text-gray-400">
          <span>Kubernetes Clusters</span>
          <span className="font-bold text-green-400">ACTIVE (3 NODES)</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>AWS Load Balancers</span>
          <span className="font-bold text-white">READY (us-east-1)</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>SSL Certificate</span>
          <span className="font-bold text-cyan-400">VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

// DevOps Simulator
const DevopsSimulator = () => {
  return (
    <div className="w-full h-[180px] border border-gray-800 bg-[#07041a] p-5 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-pink-600/5 blur-2xl rounded-full" />
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 relative z-10">
        <span className="text-pink-400 font-bold uppercase tracking-wider">devops_cicd_pipeline</span>
        <span className="nh-led-active bg-pink-500 shadow-[0_0_8px_#ec4899]"></span>
      </div>
      <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex items-center justify-between bg-[#050117] p-2 border border-gray-800 rounded-lg">
          <span className="text-gray-400">LINT VERIFICATION</span>
          <span className="text-green-400 font-bold">PASSED</span>
        </div>
        <div className="flex items-center justify-between bg-[#050117] p-2 border border-gray-800 rounded-lg">
          <span className="text-gray-400">PRODUCTION BUILD</span>
          <span className="text-green-400 font-bold">PASSED</span>
        </div>
      </div>
    </div>
  );
};

const renderServiceSimulator = (id) => {
  switch (id) {
    case 'web-development':
      return <WebDevSimulator />;
    case 'mobile-apps':
      return <MobileAppSimulator />;
    case 'ui-ux-design':
      return <UiUxSimulator />;
    case 'cloud-solutions':
      return <CloudSolutionsSimulator />;
    case 'devops':
      return <DevopsSimulator />;
    default:
      return null;
  }
};

const services = [
  {
    id: 'web-development',
    num: '01',
    title: 'Web Development',
    desc: 'We build fast, secure, and scalable web applications tailored to your business goals. From modern frontends to robust backend systems, we deliver solutions that drive growth.',
    features: ['Custom Web Applications', 'E-Commerce Solutions', 'CMS Development', 'Web Portals', 'API Development & Integration', 'Performance Optimization'],
    icon: Code2,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    id: 'mobile-apps',
    num: '02',
    title: 'Mobile Apps',
    desc: 'Native or cross-platform, we create feature-rich mobile applications that deliver seamless experiences across iOS and Android devices.',
    features: ['iOS App Development', 'Android App Development', 'Cross-Platform Apps', 'UI/UX Focused Apps', 'App Maintenance & Support', 'API & Third-Party Integration'],
    icon: Smartphone,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'ui-ux-design',
    num: '03',
    title: 'UI/UX Design',
    desc: 'We design intuitive, user-centric interfaces that enhance engagement and create exceptional digital experiences.',
    features: ['User Research & Analysis', 'Wireframing & Prototyping', 'UI Design', 'UX Strategy', 'Interaction Design', 'Usability Testing'],
    icon: PenTool,
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10'
  },
  {
    id: 'cloud-solutions',
    num: '04',
    title: 'Cloud Solutions',
    desc: 'Leverage the power of the cloud to scale, secure, and optimize your business operations with our cloud services.',
    features: ['Cloud Migration', 'Cloud Infrastructure Setup', 'Cloud Security', 'Serverless Solutions', 'Disaster Recovery', 'Cloud Optimization'],
    icon: Cloud,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'devops',
    num: '05',
    title: 'DevOps',
    desc: 'We streamline development and operations to deliver faster, reliable, and high-quality software with continuous improvement.',
    features: ['CI/CD Pipeline Automation', 'Infrastructure as Code', 'Monitoring & Logging', 'Containerization (Docker)', 'Kubernetes Orchestration', 'DevOps Consulting'],
    icon: Infinity,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10'
  }
];

const OtherServicesList = () => {
  return (
    <div className="py-12">
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <div 
            key={service.id} 
            id={service.id}
            className="flex flex-col lg:flex-row gap-12 items-center py-16 border-b border-gray-800/30 last:border-0"
          >
            
            {/* Simulator Display Side */}
            <div className={`lg:w-1/2 w-full order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex items-center justify-center`}>
               <motion.div 
                 initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 className="relative w-full max-w-md aspect-video rounded-2xl bg-[#090526] border border-purple-900/40 flex items-center justify-center p-6 overflow-hidden shadow-2xl group"
               >
                  {renderServiceSimulator(service.id)}
               </motion.div>
            </div>

            {/* Text Side */}
            <div className={`lg:w-1/2 w-full order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} text-left`}>
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-3xl font-bold text-gray-700">{service.num}</span>
                 <div className={`p-2.5 rounded-xl ${service.bg} ${service.color} border border-purple-500/20`}>
                    <service.icon size={20} />
                 </div>
                 <h3 className="text-2xl font-bold text-white">{service.title}</h3>
               </div>
               
               <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                 {service.desc}
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-[#050117] p-2.5 border border-gray-800/80 rounded-xl hover:border-purple-500/30 transition-colors">
                      <CheckCircle2 size={14} className="text-purple-500 shrink-0" />
                      <span className="text-xs text-gray-300 font-medium">{feat}</span>
                    </div>
                  ))}
               </div>

               <button className="px-5 py-2.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold rounded-lg border border-purple-500/40 transition-all shadow-md">
                 Explore {service.title} Services →
               </button>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default OtherServicesList;
