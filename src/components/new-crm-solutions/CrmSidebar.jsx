import React from 'react';
import { LineChart, UserPlus, Megaphone, Headset, Settings, FileText, Briefcase, CheckSquare, Truck, LifeBuoy, UserCircle, PieChart } from 'lucide-react';
import './crm-solutions.css';

const sidebarItems = [
  { name: 'Sales CRM', icon: LineChart },
  { name: 'Lead Management', icon: UserPlus },
  { name: 'Marketing Automation', icon: Megaphone },
  { name: 'Customer Support', icon: Headset },
  { name: 'Service Management', icon: Settings },
  { name: 'Quotation Management', icon: FileText },
  { name: 'Project Management', icon: Briefcase },
  { name: 'Task Management', icon: CheckSquare },
  { name: 'Field Service CRM', icon: Truck },
  { name: 'Helpdesk', icon: LifeBuoy },
  { name: 'Customer Portal', icon: UserCircle },
  { name: 'CRM Analytics', icon: PieChart },
];

const CrmSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="crm-sidebar hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar pt-24 pb-12 self-start">
      <div className="px-6 mb-6">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-widest">CRM Solutions</h3>
      </div>
      
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`crm-sidebar-item ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => setActiveTab(item.name)}
          >
            <div className="crm-sidebar-icon-wrap flex justify-center">
              <item.icon size={16} className={activeTab === item.name ? "text-purple-500" : "text-gray-400"} />
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-300">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrmSidebar;
