import React from 'react';
import { 
  LineChart, UserPlus, Megaphone, Headset, Settings, FileText, 
  Briefcase, CheckSquare, Truck, LifeBuoy, UserCircle, PieChart 
} from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const crmGroups = [
  {
    category: 'SALES & MARKETING',
    items: [
      { id: 'Sales CRM', name: 'Sales CRM', subtitle: 'Pipeline stage & deal conversion', icon: LineChart },
      { id: 'Lead Management', name: 'Lead Management', subtitle: 'Auto-assignment & lead scoring', icon: UserPlus },
      { id: 'Marketing Automation', name: 'Marketing Automation', subtitle: 'Drip campaigns & email tracking', icon: Megaphone },
      { id: 'Quotation Management', name: 'Quotation Management', subtitle: 'Instant PDF quote & discount logic', icon: FileText }
    ]
  },
  {
    category: 'CUSTOMER SERVICE & HELPDESK',
    items: [
      { id: 'Customer Support', name: 'Customer Support', subtitle: 'SLA escalation & ticket routing', icon: Headset },
      { id: 'Service Management', name: 'Service Management', subtitle: 'AMC contracts & warranty log', icon: Settings },
      { id: 'Field Service CRM', name: 'Field Service CRM', subtitle: 'Field engineer job dispatch', icon: Truck },
      { id: 'Helpdesk', name: 'Helpdesk', subtitle: 'Omnichannel ticketing system', icon: LifeBuoy },
      { id: 'Customer Portal', name: 'Customer Portal', subtitle: 'Self-service client dashboard', icon: UserCircle }
    ]
  },
  {
    category: 'PROJECTS & ANALYTICS',
    items: [
      { id: 'Project Management', name: 'Project Management', subtitle: 'Milestone & timesheet tracking', icon: Briefcase },
      { id: 'Task Management', name: 'Task Management', subtitle: 'Kanban boards & task delegation', icon: CheckSquare },
      { id: 'CRM Analytics', name: 'CRM Analytics', subtitle: 'Executive revenue dashboards', icon: PieChart }
    ]
  }
];

const CrmSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <SolutionSidebar
      title="CRM Solutions"
      searchPlaceholder="Search CRM modules..."
      groups={crmGroups}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      ctaTitle="Need a Custom CRM?"
      ctaText="Boost your sales conversion and automate customer support with tailored CRM software."
      ctaButtonText="Schedule CRM Demo"
    />
  );
};

export default CrmSidebar;
