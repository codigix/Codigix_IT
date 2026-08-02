import React from 'react';
import { 
  Factory, Activity, MonitorSmartphone, Settings, Cpu, Radio, Radar, 
  ShieldAlert, FileDigit, Zap, Wrench, Globe, LayoutDashboard, Cog 
} from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const iotGroups = [
  {
    category: 'HARDWARE & SENSORS',
    items: [
      { id: 'Industrial IoT', name: 'Industrial IoT', subtitle: 'Connected smart factory infrastructure', icon: Factory },
      { id: 'Sensor Monitoring', name: 'Sensor Monitoring', subtitle: 'Temperature, pressure & humidity telemetry', icon: Radar },
      { id: 'RFID Tracking', name: 'RFID Tracking', subtitle: 'Asset tracking & warehouse tag reading', icon: Radio },
      { id: 'Barcode Automation', name: 'Barcode Automation', subtitle: 'Automatic scanner & barcode decoders', icon: FileDigit }
    ]
  },
  {
    category: 'MACHINE & CONTROL',
    items: [
      { id: 'Machine Monitoring', name: 'Machine Monitoring', subtitle: 'Real-time machine state & health stream', icon: Activity },
      { id: 'PLC Integration', name: 'PLC Integration', subtitle: 'Modbus/TCP & Siemens S7 PLC drivers', icon: Settings },
      { id: 'SCADA Integration', name: 'SCADA Integration', subtitle: 'Supervisory control & data acquisition', icon: Cpu },
      { id: 'Remote Equipment Monitoring', name: 'Remote Equipment Monitoring', subtitle: 'Field machine status & remote commands', icon: ShieldAlert }
    ]
  },
  {
    category: 'PRODUCTION & ENERGY',
    items: [
      { id: 'Production Monitoring', name: 'Production Monitoring', subtitle: 'Live line output & throughput tracking', icon: MonitorSmartphone },
      { id: 'OEE Dashboard', name: 'OEE Dashboard', subtitle: 'Availability, performance & quality metrics', icon: LayoutDashboard },
      { id: 'Energy Monitoring', name: 'Energy Monitoring', subtitle: 'Power factor & kWh consumption analysis', icon: Zap },
      { id: 'Predictive Maintenance', name: 'Predictive Maintenance', subtitle: 'Vibration AI & failure prevention', icon: Wrench }
    ]
  },
  {
    category: 'DIGITAL TWIN & INDUSTRY 4.0',
    items: [
      { id: 'Digital Twin', name: 'Digital Twin', subtitle: '3D virtual machine digital twin models', icon: Globe },
      { id: 'Industry 4.0', name: 'Industry 4.0', subtitle: 'Complete smart factory transformation', icon: Cog }
    ]
  }
];

const IotSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <SolutionSidebar
      title="IoT Solutions"
      searchPlaceholder="Search IoT modules..."
      groups={iotGroups}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      ctaTitle="Need an IIoT System?"
      ctaText="We connect PLCs, SCADA systems, sensors & edge gateways directly to your cloud ERP."
      ctaButtonText="Schedule IoT Demo"
    />
  );
};

export default IotSidebar;
