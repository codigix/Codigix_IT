import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Smartphone, PenTool, Cloud, Infinity as DevOpsIcon } from 'lucide-react';

// Interactive Simulators for each service
const WebDevSimulator = () => {
  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] p-4 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-xs space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-1.5">
        <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">web_dev_playground.js</span>
        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] animate-pulse"></span>
      </div>
      <div className="space-y-1 my-1 text-slate-800 dark:text-slate-300">
        <div className="text-slate-400 dark:text-gray-500">// Initialize responsive layout</div>
        <div className="text-indigo-600 dark:text-indigo-300">const App = () =&gt; &#123;</div>
        <div className="text-slate-900 dark:text-white pl-3 font-semibold">return &lt;ReactApp SSR=true SEO="Optimal" /&gt;;</div>
        <div className="text-indigo-600 dark:text-indigo-300">&#125;</div>
      </div>
      <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-gray-800">
        <span>Framework: React / Next.js</span>
        <span className="text-emerald-600 dark:text-green-400 font-bold">READY (99.8% Speed)</span>
      </div>
    </div>
  );
};

const MobileAppSimulator = () => {
  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] p-4 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-xs space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-1.5">
        <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">mobile_simulator_frame</span>
        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7] animate-pulse"></span>
      </div>
      <div className="my-1 flex justify-around items-center gap-4">
        <div className="w-20 h-16 border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] rounded-lg p-1.5 flex flex-col justify-between text-center">
          <div className="w-full h-1 bg-slate-200 dark:bg-gray-800 rounded"></div>
          <span className="text-[7px] text-purple-700 dark:text-purple-300 font-bold">iOS Native</span>
          <div className="text-[6px] text-slate-500 dark:text-gray-400">Swift 5.8</div>
        </div>
        <div className="w-20 h-16 border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#050117] rounded-lg p-1.5 flex flex-col justify-between text-center">
          <div className="w-full h-1 bg-slate-200 dark:bg-gray-800 rounded"></div>
          <span className="text-[7px] text-cyan-700 dark:text-cyan-300 font-bold">Android</span>
          <div className="text-[6px] text-slate-500 dark:text-gray-400">Kotlin / Jetpack</div>
        </div>
      </div>
      <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-gray-800">
        <span>Cross-Platform: React Native</span>
        <span className="text-cyan-600 dark:text-cyan-400 font-bold">100% Synced</span>
      </div>
    </div>
  );
};

const UiUxSimulator = () => {
  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] p-4 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-xs space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-1.5">
        <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold uppercase tracking-wider">ui_ux_wireframe_designer</span>
        <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef] animate-pulse"></span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 my-1">
        <div className="border border-dashed border-fuchsia-400 p-1 rounded text-center text-[7px] text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-950/20 font-bold">Figma System</div>
        <div className="border border-dashed border-fuchsia-400 p-1 rounded text-center text-[7px] text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-950/20 font-bold">Wireframe</div>
        <div className="border border-dashed border-fuchsia-400 p-1 rounded text-center text-[7px] text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-950/20 font-bold">User Flow</div>
      </div>
      <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-gray-800">
        <span>Design System: Atomic UI</span>
        <span className="text-emerald-600 dark:text-green-400 font-bold">Figma Token Sync</span>
      </div>
    </div>
  );
};

const CloudSolutionsSimulator = () => {
  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] p-4 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-xs space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-1.5">
        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">cloud_architecture_cluster</span>
        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse"></span>
      </div>
      <div className="space-y-1 my-1 text-slate-800 dark:text-slate-300">
        <div className="flex justify-between text-slate-600 dark:text-gray-400">
          <span>AWS / Azure Nodes:</span>
          <span className="font-bold text-emerald-600 dark:text-green-400">3 Clusters Active</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-gray-400">
          <span>Auto-Scaling Group:</span>
          <span className="font-bold text-cyan-600 dark:text-cyan-400">0% CPU Bottleneck</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-gray-800">
        <span>SSL & Disaster Recovery:</span>
        <span className="text-emerald-600 dark:text-green-400 font-bold">99.99% Uptime</span>
      </div>
    </div>
  );
};

const DevopsSimulator = () => {
  return (
    <div className="w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] p-4 font-mono text-[10px] text-left flex flex-col justify-between rounded-xl shadow-xs space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-1.5">
        <span className="text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider">devops_cicd_pipeline</span>
        <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse"></span>
      </div>
      <div className="space-y-1 my-1 text-slate-800 dark:text-slate-300">
        <div className="flex items-center justify-between bg-slate-50 dark:bg-[#050117] p-1.5 border border-slate-200 dark:border-gray-800 rounded">
          <span className="text-slate-600 dark:text-gray-400">Docker Image Build</span>
          <span className="text-emerald-600 dark:text-green-400 font-bold">PASSED</span>
        </div>
        <div className="flex items-center justify-between bg-slate-50 dark:bg-[#050117] p-1.5 border border-slate-200 dark:border-gray-800 rounded">
          <span className="text-slate-600 dark:text-gray-400">Kubernetes Pod Sync</span>
          <span className="text-emerald-600 dark:text-green-400 font-bold">DEPLOYED</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-200 dark:border-gray-800">
        <span>CI/CD Pipeline Engine:</span>
        <span className="text-emerald-600 dark:text-green-400 font-bold">Zero-Downtime</span>
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
    agenda: 'Deliver high-performance, responsive web applications engineered for speed, SEO dominance, and high-concurrency user traffic.',
    desc: 'We build fast, secure, and scalable web applications tailored to your business goals. From modern frontends (React, Next.js, Vue) to robust backend microservices (Node.js, Python, Java), we deliver web software that drives measurable business growth.',
    features: ['Custom Web Applications', 'E-Commerce Platforms', 'CMS Development', 'Web Portals & Dashboards', 'API & Microservices', 'Core Web Vitals Speed Boost'],
    imageLight: '/assets/images/service/web_dev_dashboard.webp',
    imageDark: '/assets/images/new-iot-solutions/software_wireframe_dark.webp',
    icon: Code2,
    color: 'text-indigo-500 dark:text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    id: 'mobile-apps',
    num: '02',
    title: 'Mobile Apps',
    agenda: 'Craft intuitive native iOS, Android, and cross-platform mobile apps with biometric security, offline sync, and push engagement.',
    desc: 'Native or cross-platform, we create feature-rich mobile applications that deliver seamless experiences across iOS and Android devices. We leverage React Native, Flutter, and native Swift/Kotlin to build apps users love.',
    features: ['Native iOS (Swift) Development', 'Native Android (Kotlin) Development', 'Cross-Platform (React Native / Flutter)', 'Offline Data Synchronization', 'Biometric & Mobile Security', 'Push Notification Engines'],
    imageLight: '/assets/images/service/mobile_app_dashboard.webp',
    imageDark: '/assets/images/new-iot-solutions/iot_robot_dark.webp',
    icon: Smartphone,
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'ui-ux-design',
    num: '03',
    title: 'UI/UX Design',
    agenda: 'Design conversion-driven interfaces, Figma design systems, and user-tested prototypes that maximize customer engagement.',
    desc: 'We design intuitive, user-centric interfaces that enhance engagement and create exceptional digital experiences. Our designers build atomic design systems in Figma to ensure consistent brand identity across web and mobile products.',
    features: ['User Research & Journey Mapping', 'Figma Wireframing & Prototyping', 'Atomic UI Design Systems', 'Interactive Design Systems', 'Usability & A/B Testing', 'Design-to-Code Handoff'],
    imageLight: '/assets/images/service/ui_ux_designing_dashboard.webp',
    imageDark: '/assets/images/service/ui_ux_dashboard.webp',
    icon: PenTool,
    color: 'text-fuchsia-500 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-500/10'
  },
  {
    id: 'cloud-solutions',
    num: '04',
    title: 'Cloud Solutions',
    agenda: 'Architect resilient, auto-scaling cloud infrastructure on AWS, Azure, and GCP with zero downtime and automated failover.',
    desc: 'Leverage the power of the cloud to scale, secure, and optimize your business operations with our cloud engineering services. We handle cloud migrations, serverless architectures, and multi-region infrastructure setups.',
    features: ['AWS / Azure Cloud Migration', 'Auto-Scaling Infrastructure', 'Serverless Functions (AWS Lambda)', 'Cloud Security & IAM Vaults', 'Disaster Recovery & Daily Backup', 'Cloud FinOps Cost Reduction'],
    imageLight: '/assets/images/service/custom_software_dashboard.webp',
    imageDark: '/assets/images/new-iot-solutions/ai_brain_dark.webp',
    icon: Cloud,
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'devops',
    num: '05',
    title: 'DevOps Services',
    agenda: 'Automate CI/CD pipelines, Docker containerization, and Kubernetes cluster orchestration to accelerate software release velocity.',
    desc: 'We streamline development and operations to deliver faster, reliable, and high-quality software with continuous improvement. Eliminate deployment bottlenecks with automated testing, infrastructure as code (Terraform), and 24/7 telemetry monitoring.',
    features: ['CI/CD Pipeline Automation', 'Infrastructure as Code (Terraform)', 'Docker & Containerization', 'Kubernetes Cluster Orchestration', '24/7 Telemetry & Logging (Prometheus)', 'Zero-Downtime Releases'],
    imageLight: '/assets/images/service/crm_marketing_light.webp',
    imageDark: '/assets/images/new-iot-solutions/ai_robot_dark.webp',
    icon: DevOpsIcon,
    color: 'text-pink-500 dark:text-pink-400',
    bg: 'bg-pink-500/10'
  }
];

const OtherServicesList = () => {
  return (
    <div className="py-8">
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={service.id}
            id={service.id}
            className="flex flex-col lg:flex-row gap-10 items-stretch py-14 border-b border-slate-200 dark:border-gray-800/40 last:border-0"
          >

            {/* Visual SaaS App Frame & Simulator Display Side */}
            <div className={`lg:w-1/2 w-full order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-between gap-4`}>
              {/* Modern SaaS Window Frame */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#060318] shadow-md dark:shadow-2xl group transition-all duration-300"
              >
                {/* Window Controls Top Header */}
                <div className="bg-slate-100/90 dark:bg-[#0d0728] px-4 py-2.5 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-gray-400 tracking-wider bg-white/80 dark:bg-black/40 px-3 py-0.5 rounded-md border border-slate-200/60 dark:border-gray-800 truncate max-w-[210px]">
                    codigix.services/{service.id}
                  </div>
                  <div className="w-8"></div>
                </div>

                {/* Dual Theme Image Canvas */}
                <div className="relative w-full h-[220px] bg-slate-50 dark:bg-[#090422] flex items-center justify-center p-2.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none z-10"></div>

                  {/* Light Theme Genuine White Dashboard Image */}
                  <img
                    src={service.imageLight}
                    alt={`${service.title} Light Showcase`}
                    className="block dark:hidden w-full h-full object-cover rounded-xl shadow-xs border border-slate-200/70 group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
                  />

                  {/* Dark Theme Showcase Image */}
                  <img
                    src={service.imageDark}
                    alt={`${service.title} Dark Showcase`}
                    className="hidden dark:block w-full h-full object-cover rounded-xl filter contrast-125 brightness-110 group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
                  />
                </div>
              </motion.div>

              {/* Interactive Live System Simulator Box */}
              <div className="w-full">
                {renderServiceSimulator(service.id)}
              </div>
            </div>

            {/* Content & Agenda Text Side */}
            <div className={`lg:w-1/2 w-full order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} text-left flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-extrabold text-slate-300 dark:text-gray-700">{service.num}</span>
                  <div className={`p-2.5 rounded-xl ${service.bg} ${service.color} border border-purple-500/20`}>
                    <service.icon size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                </div>

                {/* Strategic Agenda Banner */}
                <div className="mb-4 p-3 bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-750 dark:text-purple-300 block mb-1">
                    🎯 Strategic Agenda & Target Outcome:
                  </span>
                  <p className="text-[11.5px] font-medium text-slate-800 dark:text-gray-200 leading-snug">
                    {service.agenda}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>

                {/* 6 Key Functional Capabilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white dark:bg-[#050117] p-2.5 border border-slate-200 dark:border-gray-800/80 rounded-xl hover:border-purple-500/30 transition-colors shadow-xs">
                      <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-gray-300 font-semibold leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    // Dispatch event to change pricing tab
                    const event = new CustomEvent('select-pricing', { detail: service.id });
                    window.dispatchEvent(event);
                    
                    // Scroll to pricing section
                    const el = document.getElementById('pricing');
                    if (el) {
                      const yOffset = -100;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  Explore {service.title} Capabilities & Pricing →
                </button>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default OtherServicesList;
