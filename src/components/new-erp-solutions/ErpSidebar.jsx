import React from 'react';
import { 
  Factory, HeartPulse, ShoppingCart, HardHat, PackageSearch, ShoppingBag, 
  TrendingUp, ShieldCheck, Calculator, Users, BoxSelect, Warehouse, Share2 
} from 'lucide-react';
import SolutionSidebar from '../common/SolutionSidebar';

const erpGroups = [
  {
    category: 'INDUSTRY ERP SYSTEMS',
    items: [
      { id: 'Manufacturing ERP', name: 'Manufacturing ERP', subtitle: 'BOM, routing & shop floor automation', icon: Factory },
      { id: 'Healthcare ERP', name: 'Healthcare ERP', subtitle: 'Patient billing & pharmacy inventory', icon: HeartPulse },
      { id: 'Trading ERP', name: 'Trading ERP', subtitle: 'Multi-currency wholesale trading', icon: ShoppingCart },
      { id: 'Construction ERP', name: 'Construction ERP', subtitle: 'Site estimation & contractor billing', icon: HardHat }
    ]
  },
  {
    category: 'SUPPLY CHAIN & LOGISTICS',
    items: [
      { id: 'Inventory Management', name: 'Inventory Management', subtitle: 'Stock valuation & batch tracking', icon: PackageSearch },
      { id: 'Purchase Management', name: 'Purchase Management', subtitle: 'RFQ, PO approvals & vendor portal', icon: ShoppingBag },
      { id: 'Production Planning', name: 'Production Planning', subtitle: 'MPS & capacity scheduling', icon: TrendingUp },
      { id: 'Warehouse Management', name: 'Warehouse Management', subtitle: 'Bin allocation & rack barcode scan', icon: Warehouse }
    ]
  },
  {
    category: 'FINANCE, HR & ASSETS',
    items: [
      { id: 'Quality Management', name: 'Quality Management', subtitle: 'PQC inspection & non-conformance', icon: ShieldCheck },
      { id: 'Finance & Accounts', name: 'Finance & Accounts', subtitle: 'General ledger & GST invoicing', icon: Calculator },
      { id: 'HR & Payroll', name: 'HR & Payroll', subtitle: 'Attendance, PF, ESI & salary slip', icon: Users },
      { id: 'Asset Management', name: 'Asset Management', subtitle: 'Depreciation & equipment log', icon: BoxSelect },
      { id: 'ERP Integrations', name: 'ERP Integrations', subtitle: 'REST API, Tally & SAP sync', icon: Share2 }
    ]
  }
];

const ErpSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <SolutionSidebar
      title="ERP Solutions"
      searchPlaceholder="Search ERP modules..."
      groups={erpGroups}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      ctaTitle="Need an ERP Solution?"
      ctaText="We customize end-to-end ERP systems tailored for your business workflow."
      ctaButtonText="Schedule ERP Demo"
    />
  );
};

export default ErpSidebar;
