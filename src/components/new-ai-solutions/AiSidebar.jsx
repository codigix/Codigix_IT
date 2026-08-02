import React from 'react';
import { 
  Monitor, MessageSquare, Mic, Settings, Image as ImageIcon, 
  FileText, Camera, LineChart, Star, FileBarChart, Factory, 
  HeartPulse, Link as LinkIcon 
} from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const aiGroups = [
  {
    category: 'OVERVIEW',
    items: [
      { id: 'AI Overview', name: 'AI Overview', subtitle: 'Transform business with AI innovation', icon: Monitor }
    ]
  },
  {
    category: 'CORE AI AGENTS',
    items: [
      { id: 'AI Chatbots', name: 'AI Chatbots', subtitle: 'Intelligent conversational assistants', icon: MessageSquare },
      { id: 'AI Voice Agents', name: 'AI Voice Agents', subtitle: 'Human-like voice interactions', icon: Mic },
      { id: 'AI Business Automation', name: 'AI Business Automation', subtitle: 'Automate workflows intelligently', icon: Settings },
      { id: 'Generative AI', name: 'Generative AI', subtitle: 'Create content, images & code', icon: ImageIcon }
    ]
  },
  {
    category: 'VISION & ANALYTICS',
    items: [
      { id: 'Document AI (OCR)', name: 'Document AI (OCR)', subtitle: 'Extract data with high accuracy', icon: FileText },
      { id: 'Computer Vision AI', name: 'Computer Vision AI', subtitle: 'Detect & analyze visual feeds', icon: Camera },
      { id: 'Predictive Analytics', name: 'Predictive Analytics', subtitle: 'Forecast trends with ML models', icon: LineChart },
      { id: 'AI Recommendation Engine', name: 'AI Recommendation Engine', subtitle: 'Personalized recommendations', icon: Star },
      { id: 'AI Report Generator', name: 'AI Report Generator', subtitle: 'Automated intelligent reporting', icon: FileBarChart }
    ]
  },
  {
    category: 'INDUSTRY & INTEGRATION',
    items: [
      { id: 'AI for Manufacturing', name: 'AI for Manufacturing', subtitle: 'Smart AI for production lines', icon: Factory },
      { id: 'AI for Healthcare', name: 'AI for Healthcare', subtitle: 'AI-driven healthcare solutions', icon: HeartPulse },
      { id: 'AI API Integration', name: 'AI API Integration', subtitle: 'Integrate AI into your stack', icon: LinkIcon }
    ]
  }
];

const AiSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <SolutionSidebar
      title="AI Solutions"
      searchPlaceholder="Search AI modules..."
      groups={aiGroups}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      ctaTitle="Need a Custom AI Agent?"
      ctaText="We design custom LLMs, computer vision engines & AI agents tailored for enterprise data."
      ctaButtonText="Schedule AI Demo"
    />
  );
};

export default AiSidebar;
