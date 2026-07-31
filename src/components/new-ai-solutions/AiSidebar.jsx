import React from 'react';
import { Monitor, MessageSquare, Mic, Settings, Image as ImageIcon, FileText, Camera, LineChart, Star, FileBarChart, Factory, HeartPulse, Link as LinkIcon } from 'lucide-react';
import './ai-solutions.css';

const sidebarItems = [
  { name: 'AI Overview', subtitle: 'Transform business with AI innovation', icon: Monitor },
  { name: 'AI Chatbots', subtitle: 'Intelligent conversational assistants', icon: MessageSquare },
  { name: 'AI Voice Agents', subtitle: 'Human-like voice interactions', icon: Mic },
  { name: 'AI Business Automation', subtitle: 'Automate workflows intelligently', icon: Settings },
  { name: 'Generative AI', subtitle: 'Create content, images, code & more', icon: ImageIcon },
  { name: 'Document AI (OCR)', subtitle: 'Extract data from documents with high accuracy', icon: FileText },
  { name: 'Computer Vision AI', subtitle: 'Detect, analyze & understand visual data', icon: Camera },
  { name: 'Predictive Analytics', subtitle: 'Forecast future trends with AI', icon: LineChart },
  { name: 'AI Recommendation Engine', subtitle: 'Personalized suggestions that convert', icon: Star },
  { name: 'AI Report Generator', subtitle: 'Automated intelligent report generation', icon: FileBarChart },
  { name: 'AI for Manufacturing', subtitle: 'Smart AI solutions for manufacturing', icon: Factory },
  { name: 'AI for Healthcare', subtitle: 'AI-driven solutions for better healthcare', icon: HeartPulse },
  { name: 'AI API Integration', subtitle: 'Integrate AI capabilities into your systems', icon: LinkIcon },
];

const AiSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="ai-sidebar hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar pt-24 pb-12 self-start">
      <div className="px-6 mb-6">
        <h3 className="text-xl font-bold text-white">AI Solutions</h3>
      </div>
      
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`ai-sidebar-item ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => setActiveTab(item.name)}
          >
            <div className="ai-sidebar-icon-wrap flex justify-center">
              <item.icon size={18} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
              <p className="text-[11px] text-gray-400 leading-tight">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiSidebar;
