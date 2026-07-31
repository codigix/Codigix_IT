import React from 'react';
import { Factory, HeartPulse, ShoppingCart, HardHat, PackageSearch, ShoppingBag, TrendingUp, ShieldCheck, Calculator, Users, BoxSelect, Warehouse, Share2 } from 'lucide-react';
import './erp-solutions.css';

const sidebarItems = [
  { name: 'Manufacturing ERP', icon: Factory },
  { name: 'Healthcare ERP', icon: HeartPulse },
  { name: 'Trading ERP', icon: ShoppingCart },
  { name: 'Construction ERP', icon: HardHat },
  { name: 'Inventory Management', icon: PackageSearch },
  { name: 'Purchase Management', icon: ShoppingBag },
  { name: 'Production Planning', icon: TrendingUp },
  { name: 'Quality Management', icon: ShieldCheck },
  { name: 'Finance & Accounts', icon: Calculator },
  { name: 'HR & Payroll', icon: Users },
  { name: 'Asset Management', icon: BoxSelect },
  { name: 'Warehouse Management', icon: Warehouse },
  { name: 'ERP Integrations', icon: Share2 },
];

const ErpSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="erp-sidebar hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar pt-24 pb-12 self-start">
      <div className="px-6 mb-6">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-widest">ERP Solutions</h3>
      </div>
      
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`erp-sidebar-item ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => setActiveTab(item.name)}
          >
            <div className="erp-sidebar-icon-wrap flex justify-center">
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

export default ErpSidebar;
