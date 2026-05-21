import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Layout,
  Code2,
  Database,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Layers,
  Settings,
  Activity,
  Workflow
} from 'lucide-react';
import SEO from "../components/SEO";
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;
const getImageUrl = config.getImageUrl;

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);

        // Fetch all services for sidebar and navigation
        const allServicesResponse = await fetch(`${API_BASE_URL}/services`);
        const allServicesData = await allServicesResponse.json();

        if (!allServicesResponse.ok) {
          console.error('All services fetch error:', allServicesData.error);
        }

        setServices(Array.isArray(allServicesData) ? allServicesData : []);

        let serviceId = id;
        if (!serviceId && Array.isArray(allServicesData) && allServicesData.length > 0) {
          serviceId = allServicesData[0].id;
        }

        if (serviceId) {
          // Fetch current service details
          const serviceResponse = await fetch(`${API_BASE_URL}/services/${serviceId}`);
          const serviceData = await serviceResponse.json();

          if (serviceResponse.ok) {
            setService(serviceData);
          } else {
            console.error('Service details fetch error:', serviceData.error);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return <div className="text-center py-20">Service not found</div>;
  }

  const currentIndex = Array.isArray(services) ? services.findIndex(s => s.id === (service ? service.id : null)) : -1;
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex !== -1 && currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  // Helper to get Lucide icon for technology category
  const getCategoryIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('language')) return <Globe className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('framework') || lowerName.includes('library')) return <Layers className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('database')) return <Database className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('cloud') || lowerName.includes('infrastructure')) return <Cpu className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('security')) return <ShieldCheck className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('performance') || lowerName.includes('optimization')) return <Zap className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('backend')) return <Code2 className="text-[#6c56b6]" size={20} />;
    if (lowerName.includes('frontend')) return <Layout className="text-[#6c56b6]" size={20} />;
    return <Settings className="text-[#6c56b6]" size={20} />;
  };

  // Helper to parse JSON safely
  const safeParse = (str, fallback) => {
    try {
      if (!str) return fallback;
      // If it looks like a JSON array, parse it
      if (str.trim().startsWith('[')) {
        return JSON.parse(str);
      }
      return fallback;
    } catch (e) {
      console.error("Parse error:", e);
      return fallback;
    }
  };

  const faqs = (() => {
    if (!service.faqs) return [
      {
        question: "Are you licensed and insured?",
        answer: "Yes, absolutely. Our company is fully licensed and insured to operate in the AI and technology solutions sector. We comply with all industry standards and local regulations to ensure the safety, legality, and quality of our work."
      },
      {
        question: "Do you offer emergency services?",
        answer: "We offer priority support and emergency response for our enterprise clients. Our team is dedicated to ensuring your critical systems remain operational and any issues are addressed promptly."
      },
      {
        question: "How long will my project take?",
        answer: "Project timelines vary based on scope and complexity. A typical website development project takes 4-6 weeks, while more complex AI or ERP integrations may take 3-6 months. We provide detailed timelines during the strategy phase."
      },
      {
        question: "Do you handle smart home installations?",
        answer: "While our core focus is on enterprise AI and software solutions, we do provide smart automation and IoT integrations for commercial and high-end residential projects that require advanced technology stacks."
      },
      {
        question: "How can I schedule an appointment?",
        answer: "You can schedule a consultation by clicking the 'Get In Touch' button or filling out our contact form. Our team will reach out within 24 hours to discuss your project requirements."
      }
    ];

    if (service.faqs.trim().startsWith('[')) {
      try {
        return JSON.parse(service.faqs);
      } catch (e) {
        console.error("FAQ JSON parse error:", e);
      }
    }

    // Handle newline separated Q&A pairs
    const lines = service.faqs.split('\n').filter(l => l.trim());
    const result = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i] && lines[i + 1]) {
        result.push({
          question: lines[i].trim(),
          answer: lines[i + 1].trim()
        });
      }
    }
    return result.length > 0 ? result : [
      {
        question: "Are you licensed and insured?",
        answer: "Yes, absolutely. Our company is fully licensed and insured to operate in the AI and technology solutions sector. We comply with all industry standards and local regulations to ensure the safety, legality, and quality of our work."
      }
    ];
  })();

  const technologies = (() => {
    if (!service.technologies) return [];

    try {
      // Try parsing as JSON first (new tech-list format)
      if (service.technologies.trim().startsWith('[')) {
        return JSON.parse(service.technologies);
      }
    } catch (e) {
      console.error("Tech list parse error:", e);
    }

    // Fallback to old line-based parsing for legacy data
    const lines = service.technologies.split('\n').filter(l => l.trim());
    const categories = [];
    let currentCategory = null;

    lines.forEach(line => {
      if (line.includes(':')) {
        currentCategory = {
          name: line.replace(':', '').trim(),
          items: []
        };
        categories.push(currentCategory);
      } else if (currentCategory) {
        currentCategory.items.push(line.trim());
      } else {
        currentCategory = { name: "Technologies", items: [line.trim()] };
        categories.push(currentCategory);
      }
    });
    return categories;
  })();

  const maintenanceServices = (() => {
    if (!service.maintenance_items) return [
      {
        step: "01.",
        title: "Unmatched Precision in Every Build",
        desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
      },
      {
        step: "02.",
        title: "Sustainable Technical Practices",
        desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
      },
      {
        step: "03.",
        title: "Comprehensive Project Management",
        desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
      }
    ];

    if (service.maintenance_items.trim().startsWith('[')) {
      try {
        return JSON.parse(service.maintenance_items);
      } catch (e) {
        console.error("Maintenance JSON parse error:", e);
      }
    }

    const lines = service.maintenance_items.split('\n').filter(l => l.trim());
    const result = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i]) {
        result.push({
          step: `0${Math.floor(i / 2) + 1}.`,
          title: lines[i].trim(),
          desc: lines[i + 1] ? lines[i + 1].trim() : "Our dedicated team is bringing your vision to life with precision."
        });
      }
    }
    return result.length > 0 ? result : [
      {
        step: "01.",
        title: "Unmatched Precision in Every Build",
        desc: "Our dedicated team is bring your vision to life. With a commitment to craftsmanship and attention to detail."
      }
    ];
  })();
  // Handle keyFeatures specifically as it might be newline-separated or JSON
  let keyFeatures = [
    "Discover our expertise",
    "Consultation and Discovery",
    "Journey and commitment to explained",
    "Routine Maintenance",
    "Meet our team and learn",
    "Troubleshooting",
    "Meet our team"
  ];

  if (service.key_features) {
    if (service.key_features.trim().startsWith('[')) {
      try {
        keyFeatures = JSON.parse(service.key_features);
      } catch (e) { }
    } else {
      keyFeatures = service.key_features.split('\n').filter(f => f.trim());
    }
  }

  return (
    <>
      <SEO
        title={`${service.title} | Codigix Infotech`}
        description={service.overview || service.desc || `Expert ${service.title} services at Codigix Infotech. We provide specialized AI-powered solutions to transform your business.`}
        keywords={`${service.title}, AI solutions, IT services, Codigix Infotech, ${service.title} services`}
        ogImage={getImageUrl(service.image, "assets/images/service")}
      />

      <style>
        {`
          .tj-faq .accordion-item {
            background-color: var(--tj-color-theme-bg) !important;
            border: 1px solid var(--tj-color-border-1) !important;
            border-radius: 16px !important;
            margin-bottom: 15px !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
          }
          .tj-faq .accordion-item .faq-title {
            color: var(--tj-color-heading-primary) !important;
            padding: 20px 25px !important;
            font-weight: 600 !important;
            font-size: 18px !important;
            width: 100% !important;
            text-align: left !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            background: none !important;
            border: none !important;
          }
          .tj-faq .accordion-item .accordion-body {
            padding: 0 25px 25px !important;
          }
          .tj-faq .accordion-item .accordion-body p {
            color: var(--tj-color-text-body) !important;
            margin: 0 !important;
            line-height: 1.6 !important;
          }
          .tj-faq .accordion-item.active {
            border-color: var(--tj-color-theme-primary) !important;
            box-shadow: 0 10px 25px rgba(108, 86, 182, 0.1) !important;
          }
          .dark .tj-faq .accordion-item {
            background-color: #161039 !important;
            border-color: #312c52 !important;
          }
          .dark .tj-faq .accordion-item .accordion-body p {
            color: #b8b5cc !important;
          }
          .dark .tj-faq .accordion-item.active {
             border-color: var(--tj-color-theme-primary) !important;
          }

          /* Key Features List */
          .key-features-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
            position: relative;
            z-index: 10;
          }
          .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 12px;
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          .feature-item:hover {
            background: rgba(108, 86, 182, 0.05);
          }
          .feature-icon-wrap {
            color: var(--tj-color-theme-primary);
            flex-shrink: 0;
            margin-top: 2px;
          }
          .feature-text {
            font-size: 16px;
            font-weight: 500;
            color: var(--tj-color-heading-primary);
            line-height: 1.4;
          }
          .dark .feature-text {
            color: #ffffff;
          }

          /* General Typography & Spacing */
          .service-details-content .title {
            font-size: 20px;
            font-weight: 800;
            line-height: 1.2;
            color: var(--tj-color-heading-primary);
            letter-spacing: -0.02em;
          }
          .dark .service-details-content .title {
            color: #ffffff;
          }
          .service-details-content .desc {
            font-size: 16px;
            line-height: 1.8;
            color: var(--tj-color-text-body);
            opacity: 0.9;
          }
          .dark .service-details-content .desc {
            color: #9692b2;
          }
          .section-gap {
            padding: 20px 0;
          }
          .mb-16 {
            margin-bottom: 80px;
          }
          .mb-20 {
            margin-bottom: 100px;
          }
          .tech-badge {
            background: var(--tj-color-theme-dark);
            border: 1px solid var(--tj-color-border-1);
            color: var(--tj-color-text-body);
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .tech-badge:hover {
            border-color: var(--tj-color-theme-primary);
            color: var(--tj-color-theme-primary);
            transform: translateY(-2px);
          }
          .dark .tech-badge {
            background: rgba(108, 86, 182, 0.15);
            border-color: rgba(108, 86, 182, 0.3);
            color: #d1d1f0;
          }
          .tech-category-card h5 {
            color: var(--tj-color-heading-primary);
          }
          .dark .tech-category-card h5 {
            color: #ffffff;
          }

          /* Glassmorphism Category Cards */
          .tech-category-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(108, 86, 182, 0.1);
            border-radius: 20px;
            padding: 24px;
            height: 100%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .dark .tech-category-card {
            background: rgba(22, 16, 57, 0.6);
            border-color: rgba(108, 86, 182, 0.2);
          }
          .tech-category-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(108, 86, 182, 0.15);
            border-color: var(--tj-color-theme-primary);
          }
          .category-icon-wrap {
            width: 45px;
            height: 45px;
            background: rgba(108, 86, 182, 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          .dark .category-icon-wrap {
            background: rgba(108, 86, 182, 0.2);
          }

          /* Premium Step Cards */
          .maintenance-card {
            background: var(--tj-color-theme-bg);
            border: 1px solid var(--tj-color-border-1);
            border-radius: 20px;
            padding: 35px 30px;
            height: 100%;
            position: relative;
            overflow: hidden;
            z-index: 1;
            transition: all 0.3s ease;
          }
          .dark .maintenance-card {
            background: #161039;
            border-color: #312c52;
          }
          .maintenance-card .title {
            color: var(--tj-color-heading-primary);
            transition: all 0.3s ease;
          }
          .maintenance-card .desc {
            color: var(--tj-color-text-body);
            transition: all 0.3s ease;
          }
          .dark .maintenance-card .title {
            color: #ffffff;
          }
          .dark .maintenance-card .desc {
            color: #b8b5cc;
          }
          .maintenance-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--tj-color-theme-primary) 0%, #4a3a8c 100%);
            opacity: 0;
            z-index: -1;
            transition: all 0.4s ease;
          }
          .maintenance-card:hover {
            border-color: var(--tj-color-theme-primary);
            transform: translateY(-10px);
            box-shadow: 0 0 25px rgba(108, 86, 182, 0.3);
          }
          .maintenance-card:hover::before {
            opacity: 1;
          }
          .maintenance-card:hover .step-number,
          .maintenance-card:hover .title,
          .maintenance-card:hover .desc {
            color: var(--tj-color-common-white) !important;
          }
          .step-number {
            font-size: 45px;
            font-weight: 800;
            line-height: 1;
            color: rgba(108, 86, 182, 0.15);
            margin-bottom: 25px;
            display: block;
            transition: all 0.3s ease;
          }
          .dark .step-number {
            color: rgba(255, 255, 255, 0.05);
          }

          /* Sidebar Modernization */
          .service-sidebar-box {
            background: var(--tj-color-theme-bg);
            border: 1px solid var(--tj-color-border-1);
            border-radius: 24px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .dark .service-sidebar-box {
            background: #161039;
            border-color: #312c52;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          .service-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .service-list li {
            margin-bottom: 12px;
          }
          .service-list li:last-child {
            margin-bottom: 0;
          }
          .service-list li a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 20px;
            background: var(--tj-color-common-white);
            border: 1px solid var(--tj-color-border-1);
            border-radius: 12px;
            color: var(--tj-color-heading-primary);
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dark .service-list li a {
            background: #1c154d;
            border-color: #312c52;
            color: rgba(255, 255, 255, 0.8);
          }
          .service-list li a:hover {
            border-color: var(--tj-color-theme-primary);
            color: var(--tj-color-theme-primary);
            transform: translateX(5px);
          }
          .service-list li a.active {
            background: linear-gradient(135deg, var(--tj-color-theme-primary) 0%, #4a3a8c 100%);
            border-color: var(--tj-color-theme-primary);
            color: var(--tj-color-common-white) !important;
            box-shadow: 0 8px 20px rgba(108, 86, 182, 0.3);
          }
          .service-list li a .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: rgba(108, 86, 182, 0.1);
            border-radius: 6px;
            transition: all 0.3s ease;
          }
          .service-list li a.active .icon-box {
            background: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      <section className="tj-page-header section-gap-x" style={{ backgroundImage: `url(${getImageUrl(service.image, "assets/images/service")})` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-full px-4">
              <div className="tj-page-header-content text-center">
                <h1 className="tj-page-title">{service.title}</h1>
                <div className="tj-page-link flex items-center justify-center gap-2">
                  <span className="flex items-center"><Globe size={16} className="mr-1" /></span>
                  <span><Link to="/" className="hover:text-[#6c56b6] transition-colors">Home</Link></span>
                  <span className="text-gray-400">/</span>
                  <span className="text-[#6c56b6] font-medium">{service.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tj-service-details-section section-gap">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              <div className="service-details-content">
                <div className="service-details-img mb-12">
                  <img
                    src={getImageUrl(service.image, "assets/images/service")}
                    alt={service.title}
                    className="w-full rounded-2xl"
                    loading="lazy"
                  />
                </div>

                <h2 className="title mb-12">{service.overview_title || "Empowering Innovation with Custom Technology Solutions."}</h2>
                <div className="desc mb-12" style={{ whiteSpace: 'pre-line' }}>
                  {service.overview_desc || service.desc || "We specialize in crafting bespoke technology solutions tailored to the unique needs of your business. From custom software development and IoT integration to AI-powered tools and cloud computing, we provide innovative systems that streamline processes, enhance productivity, and drive growth."}
                </div>

                <div className="flex flex-wrap -mx-4 my-5">
                  <div className="w-full lg:w-full px-4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                      {keyFeatures.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-4 group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-[#6c56b6]/10 text-[#6c56b6] rounded-full group-hover:bg-[#6c56b6] group-hover:text-white transition-all duration-300 mt-1">
                            <CheckCircle2 size={14} strokeWidth={3} />
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-[#6c56b6] dark:group-hover:text-white transition-colors leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-4 my-5">
                  <div className="w-full md:w-1/2 px-4 mb-12 md:mb-0">
                    <img
                      src={getImageUrl(service.secondary_image_1 || "service-details", "assets/images/service")}
                      alt="Service detail 1"
                      className="rounded-2xl w-full h-[300px] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <img
                      src={getImageUrl(service.secondary_image_2 || "service-11", "assets/images/service")}
                      alt="Service detail 2"
                      className="rounded-2xl w-full h-[300px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>



                <h2 className="title mb-12">{service.maintenance_title || "Our Range of Maintenance Services"}</h2>
                <div className="desc mb-12" style={{ whiteSpace: 'pre-line' }}>
                  {service.maintenance_desc || "We specialize in crafting bespoke technology solutions tailored to the unique needs of your business. From custom software development and IoT integration to AI-powered tools and cloud computing, we provide innovative systems that streamline processes, enhance productivity, and drive growth."}
                </div>

                <div className="flex flex-wrap -mx-4 mb-12">
                  {maintenanceServices.map((m, idx) => (
                    <div key={idx} className="w-full lg:w-1/3 px-4 md:w-1/2 mb-2">
                      <motion.div
                        className="maintenance-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      >
                        <span className="step-number">{m.step}</span>
                        <h4 className="title mb-12 font-bold text-xl">{m.title}</h4>
                        <p className="desc leading-relaxed">{m.desc}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>

                <div className="faq-section my-2">
                  <h2 className="title mb-12 text-3xl font-bold">Frequently Asked Questions</h2>
                  <div className="tj-faq">
                    {faqs.map((faq, index) => (
                      <div key={index} className={`accordion-item ${activeFaq === index ? 'active' : ''}`}>
                        <button
                          className="faq-title w-full flex items-center justify-between"
                          onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                        >
                          <span>{faq.question}</span>
                          <motion.span
                            animate={{ rotate: activeFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              className="accordion-body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="pt-2 pb-6 px-0">
                                <p className="text-body leading-relaxed">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tj-post__navigation mt-12 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="tj-nav__post previous">
                    <div className="tj-nav-post__nav prev_post">
                      {prevService && (
                        <Link to={`/services/details/${prevService.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                          <span><i className="tji-arrow-left"></i></span>Previous
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="tj-nav-post__grid">
                    <Link to="/services" className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      <i className="tji-window"></i>
                    </Link>
                  </div>
                  <div className="tj-nav__post next">
                    <div className="tj-nav-post__nav next_post">
                      {nextService && (
                        <Link to={`/services/details/${nextService.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                          Next<span><i className="tji-arrow-right"></i></span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

               



              </div>

            </div>

            <div className="w-full lg:w-1/3 px-4">
              <div className=" tj-main-sidebar sticky-lg-top">
                <div className="service-sidebar-box">
                  <h3 className="title mb-12">Our Services</h3>
                  <ul className="service-list">
                    {services.map((s) => (
                      <li key={s.id}>
                        <Link
                          className={service && service.id === s.id ? 'active' : ''}
                          to={`/services/details/${s.id}`}
                        >
                          <span>{s.title}</span>
                          <span className="icon-box">
                            <ChevronRight size={16} />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="md:w-full px-4">
              {technologies.length > 0 && (
                  <div className="tech-section my-5">
                    <h2 className="title mb-12">Technologies We Use</h2>
                    <div className="flex flex-wrap -mx-4">
                      {technologies.map((cat, idx) => (
                        <div key={idx} className="w-full lg:w-1/4 px-4 md:w-1/4 mb-12">
                          <motion.div 
                            className="tech-category-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="category-icon-wrap">
                              {getCategoryIcon(cat.name)}
                            </div>
                            <h5 className="text-lg font-bold mb-12">{cat.name}</h5>
                            <div className="flex flex-wrap gap-2">
                              {cat.items.map((item, i) => (
                                <span key={i} className="tech-badge">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
