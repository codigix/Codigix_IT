import React from 'react';
import { Factory, Activity, MonitorSmartphone, Settings, Cpu, Radio, Radar, ShieldAlert, FileDigit, Zap, Wrench, Globe, LayoutDashboard, Cog } from 'lucide-react';
import './iot-solutions.css';

const sidebarItems = [
  { name: 'Industrial IoT', icon: Factory },
  { name: 'Machine Monitoring', icon: Activity },
  { name: 'Production Monitoring', icon: MonitorSmartphone },
  { name: 'OEE Dashboard', icon: LayoutDashboard },
  { name: 'PLC Integration', icon: Settings },
  { name: 'SCADA Integration', icon: Cpu },
  { name: 'Sensor Monitoring', icon: Radar },
  { name: 'RFID Tracking', icon: Radio },
  { name: 'Barcode Automation', icon: FileDigit },
  { name: 'Energy Monitoring', icon: Zap },
  { name: 'Predictive Maintenance', icon: Wrench },
  { name: 'Remote Equipment Monitoring', icon: ShieldAlert },
  { name: 'Digital Twin', icon: Globe },
  { name: 'Industry 4.0', icon: Cog },
];

const IotSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="iot-sidebar hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar pt-24 pb-12 self-start">
      <div className="px-6 mb-6">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-widest">IoT Solutions</h3>
      </div>
      
      <div className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            className={`iot-sidebar-item ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => setActiveTab(item.name)}
          >
            <div className="iot-sidebar-icon-wrap flex justify-center">
              <item.icon size={16} className={activeTab === item.name ? "text-rose-500" : "text-blue-400"} />
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

export default IotSidebar;
