export const erpTabData = {
  'Manufacturing ERP': {
    title: 'Intelligent Manufacturing ERP Solutions',
    desc: 'Optimize production schedules, manage Bill of Materials (BOM), automate shopfloor routing, and track material requisitions in real time.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    benefits: [
      'Real-time Production Monitoring',
      'Accurate Costing & Margin Control',
      'Optimized Shopfloor Routing',
      'Reduced Material Waste',
      'Automated Quality Inspection',
      'Predictive Maintenance Alerts'
    ],
    workflow: [
      { name: 'BOM Design', desc: 'Define multi-level Bill of Materials' },
      { name: 'Plan Demand', desc: 'Schedule capacity and material needs' },
      { name: 'Run Shopfloor', desc: 'Dispatch work orders to machines' },
      { name: 'Quality Pass', desc: 'Execute inline inspect inspections' },
      { name: 'Analyze Cost', desc: 'Real-time variance profitability reports' }
    ]
  },
  'Healthcare ERP': {
    title: 'Secure Healthcare ERP & Hospital Management',
    desc: 'Streamline hospital operations, manage secure electronic health records (EHR/EMR), simplify patient billing, and coordinate medical inventories.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    benefits: [
      'Seamless Patient Intake Flow',
      'HIPAA & Secure Data Vaults',
      'Unified Clinic & Ward Billing',
      'Pharmacy Stock Alerts',
      'Doctor Scheduling Optimization',
      'Centralized Diagnostic Logs'
    ],
    workflow: [
      { name: 'Register', desc: 'Register patients and capture health records' },
      { name: 'Schedule', desc: 'Match slots with specialist doctors' },
      { name: 'Diagnose', desc: 'Log treatments, lab tests, and prescriptions' },
      { name: 'Bill & Insure', desc: 'Auto-calculate costs and process claims' },
      { name: 'Procure', desc: 'Refill critical medical inventory' }
    ]
  },
  'Trading ERP': {
    title: 'Global Trading & Distribution ERP',
    desc: 'Unify your supply chain operations. Control purchase-to-pay processes, manage order fulfillments, and track vendor shipments across multiple countries.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    benefits: [
      'Multi-Currency Book Ledger',
      'Automated Sales Order Entry',
      'Cross-docking & Warehousing',
      'Supplier Performance Scorecards',
      'Customs & Duty Automation',
      'Dynamic Price Margins'
    ],
    workflow: [
      { name: 'Source', desc: 'Send RFQs and choose vendors' },
      { name: 'Store', desc: 'Receive stock and log warehouse bins' },
      { name: 'Sell', desc: 'Automate sales orders and quotations' },
      { name: 'Ship', desc: 'Coordinate multi-carrier logistics' },
      { name: 'Reconcile', desc: 'Auto-generate invoices and settle ledgers' }
    ]
  },
  'Construction ERP': {
    title: 'Enterprise Construction & Project ERP',
    desc: 'Gain 360-degree control over multi-site construction projects. Track subcontracts, monitor equipment allocation, and control material billing variances.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    benefits: [
      'Multi-site Budget Visibility',
      'Contractor Milestone Tracking',
      'Equipment Dispatch Efficiency',
      'Automated RA Billing Logs',
      'Labor Attendance Sync',
      'Material Consumption Audits'
    ],
    workflow: [
      { name: 'Budget', desc: 'Define cost sheets and project estimates' },
      { name: 'Contract', desc: 'Issue subcontracts and vendor agreements' },
      { name: 'Procure', desc: 'Requisition steel, cement, and materials' },
      { name: 'Track Site', desc: 'Log daily site progress reports' },
      { name: 'Audit', desc: 'Compare actual cost vs estimated cost' }
    ]
  },
  'Inventory Management': {
    title: 'Real-time Inventory Management Solutions',
    desc: 'Achieve absolute accuracy in stock levels. Automate reorder points, perform stock valuations, and synchronize multiple warehouses in real time.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    benefits: [
      'Real-time Stock Audits',
      'Smart Reorder Point Alerts',
      'Barcoded Batch & Serial Tracking',
      'FIFO/LIFO Valuation Sheets',
      'Inter-warehouse Transfer Logs',
      'Deadstock Reduction Alerts'
    ],
    workflow: [
      { name: 'Catalog', desc: 'Assign barcodes and serial numbers' },
      { name: 'Receive', desc: 'Verify incoming stock and warehouse bins' },
      { name: 'Store', desc: 'Manage picking slots and locations' },
      { name: 'Pick & Pack', desc: 'Automate order dispatch items' },
      { name: 'Reorder', desc: 'Auto-trigger POs when stock hits threshold' }
    ]
  },
  'Purchase Management': {
    title: 'Automated Purchase & Procurement ERP',
    desc: 'Streamline the purchase requisition workflow. Automate RFQ releases, track vendor quotations, and coordinate multi-level approval hierarchies.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    benefits: [
      'Centralized Material Requests',
      'Automated RFQ Comparisons',
      'Multi-level Approval Workflows',
      'Vendor Price History Logs',
      'Seamless GRN Match Checks',
      'Supplier Invoice Auditing'
    ],
    workflow: [
      { name: 'Requisition', desc: 'Departments submit material requests' },
      { name: 'RFQ', desc: 'Generate and send RFQs to vendors' },
      { name: 'Quote Match', desc: 'Compare quotes side-by-side' },
      { name: 'Issue PO', desc: 'Generate and release POs automatically' },
      { name: 'GRN Verify', desc: 'Verify received items against PO' }
    ]
  },
  'Production Planning': {
    title: 'Advanced Production Planning & Scheduling',
    desc: 'Eliminate scheduling bottlenecks. Optimize demand forecasts, balance machine capacities, and streamline raw material allocations.',
    image: '/assets/images/new-iot-solutions/iot_robot_dark.png',
    benefits: [
      'Optimal Resource Load Balancing',
      'Accurate Material Needs (MRP)',
      'Minimized Setup Times',
      'Dynamic Schedule Reshuffling',
      'Reduced Raw Material Deficits',
      'Accurate Delivery Commitment'
    ],
    workflow: [
      { name: 'Forecast', desc: 'Analyze sales orders and backlog trends' },
      { name: 'MRP Run', desc: 'Calculate raw material requirements' },
      { name: 'Capacity Plan', desc: 'Balance load across machines and staff' },
      { name: 'Schedule', desc: 'Create daily production shifts' },
      { name: 'Dispatch', desc: 'Send routing sheets to shop floor' }
    ]
  },
  'Quality Management': {
    title: 'Enterprise Quality Management (QMS)',
    desc: 'Uphold the highest quality standards. Implement inline inspections, log non-conformances (NCR), and automate Corrective Actions (CAPA).',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    benefits: [
      'Automated Quality Gates',
      'Non-Conformance (NCR) Logs',
      'CAPA Workflows Management',
      'ISO Compliance Checklists',
      'Vendor Quality Scorecards',
      'Instrument Calibration Logs'
    ],
    workflow: [
      { name: 'Define Specs', desc: 'Set tolerance limits for materials' },
      { name: 'Inspect', desc: 'Perform tests at GRN and production' },
      { name: 'Log NCR', desc: 'Quarantine defect products instantly' },
      { name: 'CAPA Action', desc: 'Root cause analysis and fix tasks' },
      { name: 'Certify', desc: 'Generate compliance quality reports' }
    ]
  },
  'Finance & Accounts': {
    title: 'Integrated Enterprise Accounting & Finance',
    desc: 'Unify your financial accounting. Manage General Ledger (GL), automate AR/AP workflows, handle tax filing, and generate compliance reports.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    benefits: [
      'Real-time Profit & Loss Ledger',
      'Automated Tax & GST Audits',
      'Multi-Entity Consolidated Books',
      'Seamless Bank Reconciliation',
      'Strict Expense Approval Limits',
      'Accurate Cash Flow Forecasts'
    ],
    workflow: [
      { name: 'Post Entry', desc: 'Capture invoices and transactions' },
      { name: 'Approve', desc: 'Verify expenses and payments' },
      { name: 'Reconcile', desc: 'Match bank statements automatically' },
      { name: 'File Tax', desc: 'Calculate GST and regulatory dues' },
      { name: 'Report', desc: 'Export balance sheets and P&L statements' }
    ]
  },
  'HR & Payroll': {
    title: 'Unified HR Management & Automated Payroll',
    desc: 'Optimize employee lifecycles. Automate attendance logs, manage leave requests, configure complex tax slabs, and run secure payroll operations.',
    image: '/assets/images/new-iot-solutions/ai_robot_dark.png',
    benefits: [
      'Automated Shift Attendance',
      'Single-Click Payroll Runs',
      'Regulatory Tax & PF Compliance',
      'Self-Service Employee Portals',
      'Transparent Expense Claims',
      'Performance Review Metrics'
    ],
    workflow: [
      { name: 'Onboard', desc: 'Create profiles and capture contracts' },
      { name: 'Log Time', desc: 'Sync biometric attendance records' },
      { name: 'Calculate', desc: 'Compute gross salary, taxes, and deductions' },
      { name: 'Disburse', desc: 'Generate payslips and bank files' },
      { name: 'Comply', desc: 'Submit PF, ESI, and tax declarations' }
    ]
  },
  'Asset Management': {
    title: 'Enterprise Asset Lifecycle & Maintenance',
    desc: 'Maximize the value of your physical assets. Track location history, calculate dynamic depreciation rates, and automate preventive AMC schedules.',
    image: '/assets/images/new-iot-solutions/software_wireframe_dark.png',
    benefits: [
      'Minimized Equipment Downtime',
      'Auto-calculated Depreciation',
      'AMC & Warranty Reminders',
      'Barcode Asset Tracking',
      'Maintenance Cost Logging',
      'Optimal Disposal Valuations'
    ],
    workflow: [
      { name: 'Register', desc: 'Capture asset codes, cost, and warranty' },
      { name: 'Depreciate', desc: 'Run monthly depreciation calculations' },
      { name: 'Schedule AMC', desc: 'Set service reminders for machinery' },
      { name: 'Maintain', desc: 'Issue breakdown work orders' },
      { name: 'Retire', desc: 'Log asset disposal or scrap sales' }
    ]
  },
  'Warehouse Management': {
    title: 'Advanced Warehouse Management (WMS)',
    desc: 'Optimize your internal space and speed up pick-and-pack times. Manage inventory by specific bins, automate shelf assignments, and coordinate stock movements.',
    image: '/assets/images/new-iot-solutions/erp_isometric_dark.png',
    benefits: [
      'Optimized Bin Allocations',
      'Faster Pick/Pack Delivery Cycles',
      'Reduced Stock Search Times',
      'Real-time Stock Adjustments',
      'Dynamic FIFO Routing',
      'Mobile Scan Log Integration'
    ],
    workflow: [
      { name: 'Route Inbound', desc: 'Assign warehouse bins for receipts' },
      { name: 'Log Slot', desc: 'Store items by height and batch limits' },
      { name: 'Pick Order', desc: 'Generate path-optimized picking slip' },
      { name: 'Pack & Label', desc: 'Verify dimensions and print cargo tags' },
      { name: 'Audit Zone', desc: 'Execute cycle counting checklists' }
    ]
  },
  'ERP Integrations': {
    title: 'Seamless ERP Integrations & API Console',
    desc: 'Connect your ERP core to external tools. Sync e-commerce channels, link payment gateways, integrate IoT sensors, and connect CRM applications.',
    image: '/assets/images/new-iot-solutions/ai_brain_dark.png',
    benefits: [
      'Unified Business Data Sync',
      'Real-time IoT Telemetry Feeds',
      'E-commerce Inventory Match',
      'Secure Payment API Handshakes',
      'Bi-directional CRM Webhooks',
      'Custom Developer Sandboxes'
    ],
    workflow: [
      { name: 'Map Fields', desc: 'Match data structures between systems' },
      { name: 'Setup API', desc: 'Configure secure webhook triggers' },
      { name: 'Test Sandbox', desc: 'Simulate data requests and responses' },
      { name: 'Deploy Live', desc: 'Enable bi-directional production sync' },
      { name: 'Monitor Log', desc: 'Track payload transfers and errors' }
    ]
  }
};
