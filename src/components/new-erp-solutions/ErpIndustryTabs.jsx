import React, { useState, useEffect } from 'react';
import { 
  Factory, HeartPulse, ShoppingCart, HardHat, PackageSearch, 
  ShoppingBag, TrendingUp, ShieldCheck, Calculator, Users, 
  BoxSelect, Warehouse, Share2, CheckCircle2, ChevronLeft, ChevronRight,
  Search, Filter, ArrowUpRight, BarChart3, Database, ShieldAlert, Cpu, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const erpModulesList = [
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
  { name: 'ERP Integrations', icon: Share2 }
];

const erpDashboardData = {
  'Manufacturing ERP': {
    title: 'Manufacturing ERP Operational Dashboard',
    desc: 'Automate shop floor operations, optimize production planning, manage BOMs, and monitor machine performance.',
    features: ['Production Planning & Scheduling', 'Machine OEE Management', 'Bill of Materials (BOM)', 'Quality Control & Inspection', 'Shop Floor Work Orders', 'Costing & Profitability Analysis'],
    funnelTitle: 'Shop Floor Order Fulfillment',
    funnel: [
      { stage: 'Planned Work Orders', val: '15,000', color: 'bg-purple-600' },
      { stage: 'Dispatched to Shop Floor', val: '14,920', color: 'bg-indigo-600' },
      { stage: 'Passed Quality Inspection', val: '14,850', color: 'bg-pink-600' },
      { stage: 'Packed & Staged for Dispatch', val: '14,850', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Shop Floor OEE & Capacity',
    donutMetric: { val: '94.2%', label: 'Shift OEE Rate' },
    bars: [
      { height: 'h-[70%]', val: '14.8k', label: 'Units' },
      { height: 'h-[90%]', val: '94.2%', label: 'OEE' },
      { height: 'h-[65%]', val: '18/20', label: 'Lines' },
      { height: 'h-[98%]', val: '0.38%', label: 'Scrap' },
      { height: 'h-[80%]', val: '100%', label: 'Packed' }
    ],
    statusText: 'Shop Floor Telemetry & Machine Sensor Stream',
    stats: [
      { label: 'Units Produced', value: '14,850', chg: '↑ 12.4%' },
      { label: 'Shift OEE Rate', value: '94.2%', chg: '↑ 3.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Active Lines', value: '18 / 20', chg: '90% Capacity' },
      { label: 'Scrap Defect Rate', value: '0.38%', chg: '↓ 1.4%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Healthcare ERP': {
    title: 'Healthcare & Hospital Administration Hub',
    desc: 'Streamline patient intake, manage medical records (EHR), automate pharmacy stock, and process insurance claims.',
    features: ['EHR/EMR Systems Integration', 'Patient Scheduling Portal', 'Pharmacy Inventory Control', 'Billing & Claims Management', 'Doctor Roster Allocation', 'HIPAA Compliance Vault'],
    funnelTitle: 'Patient Admissions & Care Flow',
    funnel: [
      { stage: 'Patient Intake Registrations', val: '420', color: 'bg-rose-600' },
      { stage: 'Doctor Consultations Completed', val: '390', color: 'bg-purple-600' },
      { stage: 'Diagnostic Lab Tests Done', val: '280', color: 'bg-indigo-600' },
      { stage: 'Billing Cleared & Discharged', val: '385', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Bed Occupancy & Claim Approval',
    donutMetric: { val: '88.0%', label: 'Bed Occupancy' },
    bars: [
      { height: 'h-[85%]', val: '420', label: 'Intake' },
      { height: 'h-[60%]', val: '88%', label: 'Beds' },
      { height: 'h-[95%]', val: '45', label: 'Docs' },
      { height: 'h-[75%]', val: '98.4%', label: 'Claims' },
      { height: 'h-[90%]', val: '385', label: 'Done' }
    ],
    statusText: 'Hospital EHR & Claims Processing Stream',
    stats: [
      { label: 'Admissions Today', value: '420', chg: '↑ 8.2%' },
      { label: 'Bed Occupancy', value: '88.0%', chg: 'Optimal' },
      { label: 'Doctor Roster', value: '45 Active', chg: '100% Roster' },
      { label: 'Claim Approvals', value: '98.4%', chg: '↑ 2.1%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Trading ERP': {
    title: 'Trading & Wholesale Distribution Hub',
    desc: 'Manage supply chains, track inventory across multiple warehouses, automate sales orders, and audit landed costs.',
    features: ['Multi-Currency Book Ledger', 'Automated Sales Orders', 'Cross-docking & Warehousing', 'Supplier Scorecards', 'Customs & Duty Automation', 'Dynamic Price Margins'],
    funnelTitle: 'Supply Chain Purchase & Order Flow',
    funnel: [
      { stage: 'Purchase RFQs Received', val: '180', color: 'bg-orange-600' },
      { stage: 'Purchase Orders Released', val: '165', color: 'bg-purple-600' },
      { stage: 'Warehouse Goods Received', val: '150', color: 'bg-indigo-600' },
      { stage: 'Dispatched & Invoiced Orders', val: '142', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'On-Time Delivery & Vendor Rating',
    donutMetric: { val: '99.1%', label: 'On-Time Delivery' },
    bars: [
      { height: 'h-[75%]', val: '142', label: 'Shipments' },
      { height: 'h-[85%]', val: '8.4x', label: 'Turnover' },
      { height: 'h-[95%]', val: '99.1%', label: 'OnTime' },
      { height: 'h-[60%]', val: '94/100', label: 'Vendor' },
      { height: 'h-[90%]', val: '100%', label: 'Customs' }
    ],
    statusText: 'Supply Chain Logistics & Multi-Warehouse Feed',
    stats: [
      { label: 'Active Shipments', value: '142', chg: '↑ 14.5%' },
      { label: 'Inventory Turnover', value: '8.4x', chg: '↑ 1.2x', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'On-Time Delivery', value: '99.1%', chg: '↑ 0.8%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Vendor Rating', value: '94 / 100', chg: 'High Grade' }
    ]
  },
  'Construction ERP': {
    title: 'Construction & Site Engineering Hub',
    desc: 'Control construction projects with integrated budgeting, resource planning, subcontractor contracts, and site DPR logs.',
    features: ['Project BOQ Budgeting', 'Subcontractor RA Billing', 'Site Material Indent', 'Plant & Fleet Management', 'Daily Progress Reports (DPR)', 'Profitability Analytics'],
    funnelTitle: 'Site Progress & BOQ Billing Flow',
    funnel: [
      { stage: 'Project BOQ Estimates', val: '12', color: 'bg-amber-600' },
      { stage: 'Subcontracts Awarded', val: '45', color: 'bg-purple-600' },
      { stage: 'Daily Progress Reports (DPR)', val: '340', color: 'bg-indigo-600' },
      { stage: 'RA Bills Approved', val: '42', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'BOQ Budget Variance & Safety',
    donutMetric: { val: '-2.4%', label: 'Under Budget' },
    bars: [
      { height: 'h-[60%]', val: '12', label: 'Sites' },
      { height: 'h-[80%]', val: '-2.4%', label: 'CostVar' },
      { height: 'h-[90%]', val: '340', label: 'Labor' },
      { height: 'h-[75%]', val: '100%', label: 'Safety' },
      { height: 'h-[85%]', val: '42', label: 'Bills' }
    ],
    statusText: 'Site Progress & Subcontractor RA Stream',
    stats: [
      { label: 'Active Project Sites', value: '12', chg: 'Running' },
      { label: 'Budget Cost Variance', value: '-2.4%', chg: 'Under Budget', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Labor Onsite Count', value: '340', chg: 'Active' },
      { label: 'Safety Compliance', value: '100%', chg: 'Certified', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Inventory Management': {
    title: 'Central Inventory & Stores Control Hub',
    desc: 'Optimize stock levels, automate reordering, track serial numbers, and reduce carrying costs with multi-warehouse visibility.',
    features: ['Multi-Warehouse Ledger', 'Barcode & RFID Tracking', 'Reorder Point Engine', 'Inter-Warehouse Transfers', 'FIFO/LIFO Valuation', 'Deadstock Analytics'],
    funnelTitle: 'Inventory Stock Cycle Flow',
    funnel: [
      { stage: 'Inbound GRN Barcode Scans', val: '2,450', color: 'bg-blue-600' },
      { stage: 'Bin Slot Put-Away Completed', val: '2,450', color: 'bg-purple-600' },
      { stage: 'Picked Sales Orders', val: '2,100', color: 'bg-pink-600' },
      { stage: 'Audit Verified Stock SKUs', val: '45,200', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Stock Audit Accuracy & Deadstock',
    donutMetric: { val: '99.9%', label: 'Audit Accuracy' },
    bars: [
      { height: 'h-[90%]', val: '45.2k', label: 'SKUs' },
      { height: 'h-[95%]', val: '99.9%', label: 'Audit' },
      { height: 'h-[70%]', val: '4', label: 'Alerts' },
      { height: 'h-[85%]', val: '1.2%', label: 'Deadstock' },
      { height: 'h-[98%]', val: '2.4k', label: 'Scans' }
    ],
    statusText: 'Multi-Warehouse Barcode & RFID Stream',
    stats: [
      { label: 'Cataloged SKUs', value: '45,200', chg: 'Active' },
      { label: 'Audit Accuracy', value: '99.9%', chg: '↑ 0.5%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Reorder Alerts', value: '4', chg: 'Action Needed' },
      { label: 'Deadstock Rate', value: '1.2%', chg: '↓ 3.4%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Purchase Management': {
    title: 'Corporate Procurement & Sourcing Hub',
    desc: 'Automate RFQs, manage purchase orders, evaluate supplier scorecards, and enforce 3-way invoice matching.',
    features: ['Purchase Requisition Hub', 'RFQ Vendor Tendering', 'Multi-Level Approvals', 'GRN 3-Way Match', 'Vendor Scorecards', 'Procurement Savings Log'],
    funnelTitle: 'Procurement Sourcing & PO Flow',
    funnel: [
      { stage: 'Requisitions Received', val: '45', color: 'bg-pink-600' },
      { stage: 'RFQs Tendered to Vendors', val: '14', color: 'bg-purple-600' },
      { stage: 'POs Approved & Released', val: '38', color: 'bg-indigo-600' },
      { stage: 'GRN 3-Way Matched', val: '36', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Procurement Savings & Match Rate',
    donutMetric: { val: '$1.2M', label: 'Approved POs' },
    bars: [
      { height: 'h-[65%]', val: '14', label: 'Tenders' },
      { height: 'h-[85%]', val: '$1.2M', label: 'POVol' },
      { height: 'h-[75%]', val: '2.4d', label: 'LeadTime' },
      { height: 'h-[92%]', val: '12.8%', label: 'Savings' },
      { height: 'h-[80%]', val: '36', label: 'Matched' }
    ],
    statusText: 'Procurement Audit & 3-Way Match Telemetry',
    stats: [
      { label: 'Open RFQ Tenders', value: '14', chg: 'Active' },
      { label: 'Active PO Volume', value: '$1.2M', chg: 'Approved' },
      { label: 'Sourcing Lead Time', value: '2.4 Days', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Procurement Savings', value: '12.8%', chg: '↑ 2.4%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Production Planning': {
    title: 'Planning & Production Control (PPC) Hub',
    desc: 'Plan demand accurately, schedule capacity, route materials efficiently, and balance machine work centers.',
    features: ['Master Schedule (MPS)', 'Material Needs (MRP)', 'Capacity Load Balancing', 'What-If Simulation', 'Routing Control', 'On-Time Delivery (OTD)'],
    funnelTitle: 'PPC Demand & Machine Load Flow',
    funnel: [
      { stage: 'Sales Order Demand', val: '15,000', color: 'bg-green-600' },
      { stage: 'MRP Raw Material Allocations', val: '15,000', color: 'bg-purple-600' },
      { stage: 'Machine Shift Schedules', val: '140', color: 'bg-indigo-600' },
      { stage: 'Fulfilled On-Time (OTD)', val: '14,850', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'MPS Compliance & Capacity Balance',
    donutMetric: { val: '98.6%', label: 'MPS Compliance' },
    bars: [
      { height: 'h-[80%]', val: '98.6%', label: 'MPS' },
      { height: 'h-[92%]', val: '91%', label: 'Load' },
      { height: 'h-[70%]', val: '0', label: 'Shortage' },
      { height: 'h-[95%]', val: '99%', label: 'OTD' },
      { height: 'h-[85%]', val: '140', label: 'Shifts' }
    ],
    statusText: 'MRP Demand & Work Center Telemetry',
    stats: [
      { label: 'MPS Compliance', value: '98.6%', chg: '↑ 1.4%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Machine Load Rate', value: '91.0%', chg: 'Balanced' },
      { label: 'MRP Material Shortage', value: '0 SKUs', chg: 'Clean', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'On-Time Delivery', value: '99.0%', chg: '↑ 2.1%', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Quality Management': {
    title: 'Quality Assurance & Compliance (QA/QC) Hub',
    desc: 'Ensure rigorous quality standards. Inspect incoming GRNs, capture inline defects, quarantine NCR scrap, and track CAPA.',
    features: ['Inward GRN Quality', 'Inline Operator Sampling', 'NCR Scrap Quarantine', 'CAPA Root Cause (8D)', 'Gauge Calibration', 'Certificate of Analysis (CoA)'],
    funnelTitle: 'Quality Assurance Inspection Flow',
    funnel: [
      { stage: 'Inward GRNs Inspected', val: '2,450', color: 'bg-indigo-600' },
      { stage: 'First Pass Approved Yield', val: '2,435', color: 'bg-purple-600' },
      { stage: 'NCR Defect Quarantine', val: '15', color: 'bg-pink-600' },
      { stage: 'CoA Verified & Released', val: '2,435', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'First Pass Yield & CAPA Closure',
    donutMetric: { val: '99.4%', label: 'First Pass Yield' },
    bars: [
      { height: 'h-[95%]', val: '99.4%', label: 'FPY' },
      { height: 'h-[98%]', val: '2', label: 'NCR' },
      { height: 'h-[60%]', val: '24h', label: 'CAPA' },
      { height: 'h-[90%]', val: '100%', label: 'Calib' },
      { height: 'h-[85%]', val: '2.4k', label: 'CoA' }
    ],
    statusText: 'QA Inspection & Gauge Calibration Stream',
    stats: [
      { label: 'First Pass Yield', value: '99.4%', chg: '↑ 0.6%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Active NCR Logs', value: '2', chg: 'Quarantined' },
      { label: 'CAPA Closure Time', value: '24 Hours', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Gauge Calibration Rate', value: '100%', chg: 'Verified', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'Finance & Accounts': {
    title: 'Corporate Financial Accounting & Tax Hub',
    desc: 'Automate general ledgers, accounts payable/receivable, bank reconciliation, multi-currency books, and GST/VAT tax filings.',
    features: ['General Ledger Automation', 'AP/AR Invoicing Ledger', 'Bank Reconciliation Engine', 'Multi-Currency Accounting', 'GST/VAT e-Way Tax Sync', 'P&L & Cash Flow Reports'],
    funnelTitle: 'General Ledger Invoicing & Tax Flow',
    funnel: [
      { stage: 'Invoices Issued', val: '4,850', color: 'bg-indigo-600' },
      { stage: 'Collections Logged', val: '4,620', color: 'bg-purple-600' },
      { stage: 'Bank Feeds Reconciled', val: '4,620', color: 'bg-pink-600' },
      { stage: 'GST/VAT Returns Filed', val: '100%', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Monthly Revenue & AR DSO Days',
    donutMetric: { val: '$4.85M', label: 'Monthly Revenue' },
    bars: [
      { height: 'h-[85%]', val: '$4.8M', label: 'Revenue' },
      { height: 'h-[90%]', val: '100%', label: 'BankSync' },
      { height: 'h-[75%]', val: '28d', label: 'DSO' },
      { height: 'h-[96%]', val: '100%', label: 'TaxFiled' },
      { height: 'h-[88%]', val: '4.6k', label: 'Collected' }
    ],
    statusText: 'Bank Reconciliation & Tax Compliance Stream',
    stats: [
      { label: 'Monthly Revenue', value: '$4.85M', chg: '↑ 14.2%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Bank Sync Status', value: 'Reconciled', chg: '100% Match' },
      { label: 'AR DSO Days', value: '28 Days', chg: '↓ 4 Days', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Tax Filing Status', value: 'Compliant', chg: 'Verified', color: 'text-emerald-600 dark:text-emerald-400' }
    ]
  },
  'HR & Payroll': {
    title: 'E-HRM Enterprise ERP & AI Hub',
    desc: 'Automate hiring with our 16-Step ATS, eliminate buddy punching with <0.3s AI face recognition, and run fully compliant payroll instantly.',
    features: ['16-Step ATS Recruitment', 'AI Face Recognition (<0.3s)', '100m GPS Geofencing', '1-Click Payroll (PF/TDS)', '9-Box Performance Matrix', 'Employee Mobile App (ESS)'],
    funnelTitle: 'End-to-End HR Automation Pipeline',
    funnel: [
      { stage: 'ATS Resumes Screened', val: '8,450', color: 'bg-purple-600' },
      { stage: 'AI Face Authentications', val: '1,240', color: 'bg-emerald-500' },
      { stage: '1-Click Payroll Run', val: '1,240', color: 'bg-amber-500' },
      { stage: 'ESS Mobile App Users', val: '1,190', color: 'bg-sky-500' }
    ],
    rightCardTitle: 'AI Match Rate & Automation Velocity',
    donutMetric: { val: '99.9%', label: 'AI Face Match' },
    bars: [
      { height: 'h-[95%]', val: '8.4k', label: 'ATS' },
      { height: 'h-[99%]', val: '99.9%', label: 'Face AI' },
      { height: 'h-[100%]', val: '1.2k', label: 'Payroll' },
      { height: 'h-[96%]', val: '1.1k', label: 'ESSApp' },
      { height: 'h-[100%]', val: '100%', label: 'Compliant' }
    ],
    statusText: 'E-HRM AI Intelligence & Payroll Engine Stream',
    stats: [
      { label: 'ATS Pipeline', value: '8,450', chg: 'Active' },
      { label: 'AI Match Accuracy', value: '99.9%', chg: '< 0.3s', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Payroll Processing', value: 'Instant', chg: '⚡ 1-Click', color: 'text-amber-500 dark:text-amber-400' },
      { label: 'ESS App Adoption', value: '96.0%', chg: 'High Sync', color: 'text-sky-600 dark:text-sky-400' }
    ]
  },
  'Asset Management': {
    title: 'Enterprise Asset Lifecycle & Maintenance Hub',
    desc: 'Track plant machinery, IT equipment, maintenance schedules, depreciation values, and breakdown work orders.',
    features: ['Fixed Asset Tagging', 'Preventive Maintenance (PM)', 'Breakdown Work Orders', 'Depreciation Calculator', 'Asset Transfer Ledger', 'Mean Time To Repair (MTTR)'],
    funnelTitle: 'Plant Asset Maintenance Flow',
    funnel: [
      { stage: 'Tagged Fixed Assets', val: '4,850', color: 'bg-blue-600' },
      { stage: 'PM Preventive Inspections', val: '340', color: 'bg-purple-600' },
      { stage: 'Breakdown Orders Logged', val: '12', color: 'bg-rose-600' },
      { stage: 'Repaired & Restored Uptime', val: '12', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Asset Uptime & MTTR Breakdown',
    donutMetric: { val: '99.2%', label: 'Asset Uptime' },
    bars: [
      { height: 'h-[95%]', val: '4.8k', label: 'Assets' },
      { height: 'h-[90%]', val: '99.2%', label: 'Uptime' },
      { height: 'h-[65%]', val: '35m', label: 'MTTR' },
      { height: 'h-[98%]', val: '98%', label: 'PMRate' },
      { height: 'h-[85%]', val: '340', label: 'Inspected' }
    ],
    statusText: 'Plant RFID Sensor & Asset Uptime Stream',
    stats: [
      { label: 'Tracked Assets', value: '4,850', chg: 'Tagged' },
      { label: 'Asset Uptime Rate', value: '99.2%', chg: '↑ 0.8%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'MTTR Breakdown Time', value: '35 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'PM Compliance Rate', value: '98.0%', chg: 'Certified' }
    ]
  },
  'Warehouse Management': {
    title: 'Smart Warehouse & Logistics Hub (WMS)',
    desc: 'Optimize warehouse space with bin allocation, pick-and-pack routing, cross-docking, and real-time dispatcher dispatch.',
    features: ['Smart Bin Location Engine', 'Wave Picking & Packing', 'Cross-Docking Dispatch', 'Dock Door Scheduler', 'Courier API Integration', 'Order Fulfillment Velocity'],
    funnelTitle: 'WMS Order Fulfillment Flow',
    funnel: [
      { stage: 'Inbound Dock Arrivals', val: '140', color: 'bg-cyan-600' },
      { stage: 'Smart Bin Put-Away', val: '3,450', color: 'bg-purple-600' },
      { stage: 'Wave Pick & Pack Completed', val: '3,450', color: 'bg-pink-600' },
      { stage: 'Shipped & Out for Delivery', val: '3,450', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'Pick Accuracy & Fulfillment Velocity',
    donutMetric: { val: '99.9%', label: 'Pick Accuracy' },
    bars: [
      { height: 'h-[98%]', val: '3.4k', label: 'Shipments' },
      { height: 'h-[95%]', val: '99.9%', label: 'PickAcc' },
      { height: 'h-[80%]', val: '18m', label: 'FulfillTime' },
      { height: 'h-[92%]', val: '92%', label: 'DockUtil' },
      { height: 'h-[90%]', val: '140', label: 'Docks' }
    ],
    statusText: 'WMS Barcode Scanner & Wave Dispatch Telemetry',
    stats: [
      { label: 'Daily Shipments', value: '3,450', chg: 'Dispatched' },
      { label: 'Pick Accuracy Rate', value: '99.9%', chg: '↑ 0.3%', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Fulfillment Time', value: '18 min', chg: '⚡ Fast', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Dock Utilization', value: '92.0%', chg: 'Optimal' }
    ]
  },
  'ERP Integrations': {
    title: 'API Gateway & Middleware Integration Hub',
    desc: 'Connect your ERP seamlessly with CRM, IoT sensors, E-Commerce storefronts, banks, and third-party logistics APIs.',
    features: ['REST/SOAP API Connectors', 'Webhook Data Pipeline', 'Real-Time Sync Monitor', 'Error Retry Queue', 'OAuth 2.0 Security Vault', 'ETL Data Transformer'],
    funnelTitle: 'API Gateway Webhook Pipeline',
    funnel: [
      { stage: 'Inbound API Requests', val: '2.4M', color: 'bg-[#7e22ce]' },
      { stage: 'ETL Data Transformed', val: '2.4M', color: 'bg-blue-600' },
      { stage: 'Synced to ERP Database', val: '2.4M', color: 'bg-purple-600' },
      { stage: '200 OK Responses Returned', val: '2.4M', color: 'bg-emerald-500' }
    ],
    rightCardTitle: 'API Gateway Uptime & Latency',
    donutMetric: { val: '99.99%', label: 'Gateway Uptime' },
    bars: [
      { height: 'h-[95%]', val: '2.4M', label: 'Calls' },
      { height: 'h-[99%]', val: '99.99%', label: 'Uptime' },
      { height: 'h-[85%]', val: '12ms', label: 'Latency' },
      { height: 'h-[98%]', val: '0.01%', label: 'ErrorRetry' },
      { height: 'h-[92%]', val: '100%', label: 'ETL' }
    ],
    statusText: 'API Gateway & Webhook Pipeline Stream',
    stats: [
      { label: 'Daily API Calls', value: '2.4M', chg: 'Processed' },
      { label: 'API Uptime Rate', value: '99.99%', chg: 'Reliable', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Sync Latency Time', value: '12 ms', chg: '⚡ Instant', color: 'text-emerald-600 dark:text-emerald-400' },
      { label: 'Error Retry Rate', value: '0.01%', chg: 'Resolved' }
    ]
  }
};

{/* Dynamic Feature Dashboard UI Canvas for Left Browser Window */}
const DynamicTabUiCanvas = ({ tabName, features }) => {
  if (tabName === 'Inventory Management') {
    return (
      <div className="w-full h-full p-3 flex flex-col justify-between text-left text-xs bg-slate-50 dark:bg-[#07031c]">
        {/* Top Control Header */}
        <div className="flex justify-between items-center bg-white dark:bg-[#0c082e] p-2 rounded-lg border border-slate-200 dark:border-gray-800 shadow-xs mb-2">
          <div className="flex items-center gap-2">
            <PackageSearch size={14} className="text-purple-600 dark:text-purple-400" />
            <span className="font-extrabold text-slate-800 dark:text-white text-[11px]">Central Inventory & Stores Control Hub</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800/40">
            <span>Whse: Central-A</span>
          </div>
        </div>

        {/* Feature Pill Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {features?.map((f, i) => (
            <span key={i} className="text-[8.5px] font-semibold bg-white dark:bg-[#0e0836] text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-slate-200 dark:border-purple-900/50">
              ✓ {f}
            </span>
          ))}
        </div>

        {/* Live Multi-Warehouse Stock Ledger Table */}
        <div className="bg-white dark:bg-[#090526] rounded-lg border border-slate-200 dark:border-gray-800 p-2 shadow-xs overflow-hidden flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-center pb-1 mb-1.5 border-b border-slate-100 dark:border-gray-800 text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase">
            <span>Multi-Warehouse Stock Ledger</span>
            <span className="text-emerald-600 dark:text-emerald-400">Barcode & RFID Active</span>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
              <div>
                <span className="font-extrabold text-slate-800 dark:text-white block leading-tight">SKU-45210 • Ball Bearings</span>
                <span className="text-[8.5px] text-slate-500 dark:text-gray-400">Bin W-A4 | FIFO Unit: $12.40</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">450 Units In Stock</span>
            </div>

            <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
              <div>
                <span className="font-extrabold text-slate-800 dark:text-white block leading-tight">SKU-38912 • Oil Filter</span>
                <span className="text-[8.5px] text-slate-500 dark:text-gray-400">Bin W-B2 | FIFO Unit: $45.00</span>
              </div>
              <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800/40">12 Units (Reorder Alert)</span>
            </div>

            <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
              <div>
                <span className="font-extrabold text-slate-800 dark:text-white block leading-tight">SKU-89201 • RFID Tags</span>
                <span className="text-[8.5px] text-slate-500 dark:text-gray-400">Transit 3PL | LIFO Unit: $2.10</span>
              </div>
              <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/40">1,200 (Inter-Transfer)</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[8.5px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-100 dark:border-gray-800 mt-1 font-mono">
            <span>Deadstock Rate: 1.2%</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">Reorder Engine: Auto-Trigger On</span>
          </div>
        </div>
      </div>
    );
  }

  // Generic Dynamic UI Dashboard generator matching features for all other tabs
  return (
    <div className="w-full h-full p-3 flex flex-col justify-between text-left text-xs bg-slate-50 dark:bg-[#07031c]">
      {/* Top Control Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#0c082e] p-2 rounded-lg border border-slate-200 dark:border-gray-800 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-purple-600 dark:text-purple-400" />
          <span className="font-extrabold text-slate-800 dark:text-white text-[11px] truncate max-w-[210px]">{tabName} Console</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
          <span>● Live Telemetry</span>
        </div>
      </div>

      {/* Feature Pill Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {features?.slice(0, 4).map((f, i) => (
          <span key={i} className="text-[8.5px] font-semibold bg-white dark:bg-[#0e0836] text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-slate-200 dark:border-purple-900/50">
            ✓ {f}
          </span>
        ))}
      </div>

      {/* Dashboard Table / Metrics */}
      <div className="bg-white dark:bg-[#090526] rounded-lg border border-slate-200 dark:border-gray-800 p-2.5 shadow-xs overflow-hidden flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-1 mb-1.5 border-b border-slate-100 dark:border-gray-800 text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase">
          <span>Operational Control Ledger</span>
          <span className="text-purple-600 dark:text-purple-400">100% Synced</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[0] || 'System Optimization'}</span>
            <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">Active High</span>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[1] || 'Real-time Workflow'}</span>
            <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400">Automated</span>
          </div>
          <div className="flex items-center justify-between text-[10px] bg-slate-50 dark:bg-[#0d0833] p-1.5 rounded border border-slate-100 dark:border-gray-800/60">
            <span className="font-bold text-slate-800 dark:text-white">{features?.[2] || 'Audit Trail & Compliance'}</span>
            <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400">Verified</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[8.5px] text-slate-500 dark:text-gray-400 pt-1 border-t border-slate-100 dark:border-gray-800 mt-1 font-mono">
          <span>codigix.erp/{tabName.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Secure ERP Node</span>
        </div>
      </div>
    </div>
  );
};

const ErpIndustryTabs = ({ activeTab: mainActiveTab, setActiveTab: setMainActiveTab }) => {
  const [activeTab, setActiveTab] = useState(mainActiveTab || 'Manufacturing ERP');

  useEffect(() => {
    if (mainActiveTab && erpDashboardData[mainActiveTab]) {
      setActiveTab(mainActiveTab);
    }
  }, [mainActiveTab]);

  const changeTab = (name) => {
    setActiveTab(name);
    if (setMainActiveTab) {
      setMainActiveTab(name);
    }
  };

  const data = erpDashboardData[activeTab] || erpDashboardData['Manufacturing ERP'];

  const handleNextTab = () => {
    const currentIndex = erpModulesList.findIndex(i => i.name === activeTab);
    const nextIndex = (currentIndex + 1) % erpModulesList.length;
    changeTab(erpModulesList[nextIndex].name);
  };

  const handlePrevTab = () => {
    const currentIndex = erpModulesList.findIndex(i => i.name === activeTab);
    const prevIndex = (currentIndex - 1 + erpModulesList.length) % erpModulesList.length;
    changeTab(erpModulesList[prevIndex].name);
  };

  return (
    <div className="mt-16 text-left">
      <div className="text-center mb-10">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">Enterprise ERP Solution Dashboards & Telemetry Controls</h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">Explore tailored operational dashboards and real-time process funnels for each ERP module</p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {erpModulesList.map((mod, i) => (
          <button
            key={i}
            onClick={() => changeTab(mod.name)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
              activeTab === mod.name 
              ? 'bg-gradient-to-r from-purple-600 to-rose-600 border-purple-500 text-white shadow-md scale-105 font-bold' 
              : 'bg-white dark:bg-[#050117] border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-400 hover:border-purple-400 dark:hover:border-gray-600 hover:text-purple-600 dark:hover:text-gray-200 shadow-xs'
            }`}
          >
            <mod.icon size={14} className={activeTab === mod.name ? 'text-white' : 'text-purple-600 dark:text-purple-400'} />
            <span className="text-[11px] font-semibold">{mod.name}</span>
          </button>
        ))}
      </div>

      {/* Interactive Dashboard View Container */}
      <div className="relative bg-white dark:bg-[#090624]/70 border border-slate-200/90 dark:border-purple-900/40 rounded-2xl p-6 lg:p-8 overflow-hidden shadow-sm dark:shadow-2xl">
        
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center absolute top-1/2 left-2 right-2 -translate-y-1/2 z-20 pointer-events-none">
          <button 
            onClick={handlePrevTab}
            className="w-9 h-9 rounded-full bg-white/95 dark:bg-black/60 border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-all backdrop-blur-sm shadow-md"
          >
             <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNextTab}
            className="w-9 h-9 rounded-full bg-white/95 dark:bg-black/60 border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-700 dark:text-gray-300 pointer-events-auto hover:bg-purple-600 hover:text-white transition-all backdrop-blur-sm shadow-md"
          >
             <ChevronRight size={18} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-8 relative z-10"
          >
            {/* Left info panel with Modern App Frame Showcase */}
            <div className="lg:w-[42%] flex flex-col justify-between text-left">
               <div>
                  {/* Modern SaaS App Frame Showcase */}
                  <div className="w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#060318] shadow-sm dark:shadow-2xl group transition-all duration-300">
                      {/* Window Controls Top Header */}
                      <div className="bg-slate-100/90 dark:bg-[#0d0728] px-4 py-2.5 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-gray-400 tracking-wider bg-white/80 dark:bg-black/40 px-3 py-0.5 rounded-md border border-slate-200/60 dark:border-gray-800 truncate max-w-[210px]">
                              codigix.erp/{activeTab.toLowerCase().replace(/\s+/g, '-')}
                          </div>
                          <div className="w-8"></div>
                      </div>

                      {/* Dual-Theme Responsive Feature-Specific UI Dashboard Canvas */}
                      <div className="relative w-full h-[220px] bg-slate-50 dark:bg-[#090422] flex items-center justify-center overflow-hidden">
                          <DynamicTabUiCanvas tabName={activeTab} features={data.features} />
                      </div>
                  </div>

                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{data.title}</h4>
                  <p className="text-[12px] text-slate-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                    {data.desc}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-gray-800/60">
                  {data.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400 shrink-0"/>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 leading-tight">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Right Interactive Dashboard Mockup */}
            <div className="lg:w-[58%] bg-slate-50/90 dark:bg-[#030112] border border-slate-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm dark:shadow-inner">
               
               {/* Stats Row */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0c0830] p-3 rounded-xl border border-slate-200/90 dark:border-gray-800/80 shadow-xs">
                      <p className="text-[9px] text-slate-500 dark:text-gray-400 mb-1 leading-tight uppercase font-bold">{stat.label}</p>
                      <h5 className={`text-sm md:text-base font-extrabold ${stat.color || 'text-slate-900 dark:text-white'}`}>{stat.value}</h5>
                      <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold">{stat.chg}</span>
                    </div>
                  ))}
               </div>

               {/* Charts & Funnel Row */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 mt-1">
                  
                  {/* Left Funnel Representation */}
                  <div className="md:col-span-5 bg-white dark:bg-[#0c0830] p-4 rounded-xl border border-slate-200/90 dark:border-gray-800/80 flex flex-col justify-between shadow-xs">
                     <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                        {data.funnelTitle || 'MODULE FUNNEL FLOW'}
                     </p>
                     <div className="flex flex-col gap-2.5 my-auto">
                        {data.funnel.map((step, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                             <div className="flex justify-between items-center text-[10px] text-slate-700 dark:text-gray-300 font-bold">
                                <span>{step.stage}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{step.val}</span>
                             </div>
                             <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full ${step.color}`} style={{ width: `${100 - idx * 22}%` }}></div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Donut & Activity Representation */}
                  <div className="md:col-span-7 bg-white dark:bg-[#0c0830] p-4 rounded-xl border border-slate-200/90 dark:border-gray-800/80 flex flex-col justify-between shadow-xs">
                     <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                        {data.rightCardTitle || 'STAGE ALLOCATION & VELOCITY'}
                     </p>
                     <div className="flex items-center justify-around flex-1 py-2">
                        {/* Donut Simulation with Dynamic Metrics */}
                        <div className="relative w-24 h-24 rounded-full border-[7px] border-purple-600 border-t-pink-500 border-r-indigo-500 flex items-center justify-center shadow-md">
                           <div className="text-center px-1">
                              <span className="text-sm font-extrabold text-slate-900 dark:text-white block leading-none">{data.donutMetric?.val || '94.2%'}</span>
                              <span className="text-[8px] font-bold text-slate-500 dark:text-gray-400 block truncate max-w-[70px] mt-0.5">{data.donutMetric?.label || 'Efficiency'}</span>
                           </div>
                        </div>
                        {/* Dynamic Activity Bars with Values & Labels */}
                        <div className="flex items-end gap-2 h-20 pt-4">
                           {data.bars?.map((bar, bIdx) => (
                             <div key={bIdx} className="flex flex-col items-center gap-1 group relative">
                                <div className={`w-3 bg-purple-600 group-hover:bg-pink-500 ${bar.height} rounded-t transition-all duration-500`}></div>
                                <span className="text-[7.5px] font-bold text-slate-500 dark:text-gray-400 truncate max-w-[28px]">{bar.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="flex justify-between items-center text-[9px] text-slate-500 dark:text-gray-400 border-t border-slate-100 dark:border-gray-800/80 pt-2 mt-2 font-medium">
                        <span>{data.statusText || 'Real-time Telemetry Control'}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Sync
                        </span>
                     </div>
                  </div>

               </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ErpIndustryTabs;
