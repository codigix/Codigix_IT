import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getDefaultData } from './iotTabData';

// Industrial IoT & Sensor Monitoring: Live Sensor Matrix
const IotSensorSimulator = () => {
  const [sensors, setSensors] = useState([
    { name: 'Temp_01', val: 24.2, unit: '°C' },
    { name: 'Press_02', val: 101.3, unit: 'kPa' },
    { name: 'Vibr_03', val: 0.12, unit: 'g' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSensors(prev => prev.map(s => {
        const delta = (Math.random() - 0.5) * (s.unit === '°C' ? 0.4 : s.unit === 'kPa' ? 0.6 : 0.02);
        return { ...s, val: parseFloat((s.val + delta).toFixed(2)) };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-rose-500 font-bold uppercase tracking-wider">LIVE_SENSOR_MATRIX</span>
        <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
      </div>

      <div className="space-y-2">
        {sensors.map((s, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800 p-2.5 rounded-lg">
            <span className="text-slate-500 dark:text-gray-400">{s.name}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{s.val} <span className="text-[9px] text-slate-450 dark:text-gray-500">{s.unit}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Machine Monitoring, PLC, SCADA: Live Command Stream
const MachineTelemetrySimulator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { log: '[MODBUS/TCP] Reading coil inputs. Status: 0x00 (Normal).' },
    { log: '[TELEMETRY] Connection established with Asset #902. Ingesting raw values... OK' },
    { log: '[EDGE] Encrypting with TLS 1.3. Streaming to datalake S3 endpoint...' },
    { log: '[ANALYTICS] Operations dashboard ready. OEE score updated: 94.2%.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left h-[180px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">stream_verify.sh</span>
        <span className="nh-led-active bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-1.5">
        <div className="text-slate-500 dark:text-gray-600">// active Modbus stream</div>
        <div className="text-slate-900 dark:text-white font-bold">{steps[activeStep].log}</div>
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Status: <span className="text-green-400 font-bold">CONNECTED</span>
      </div>
    </div>
  );
};

// Production Monitoring: Line Speed Graph & Item Counter
const ProductionMonitoringSimulator = () => {
  const [count, setCount] = useState(14850);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-purple-400 font-bold uppercase tracking-wider">PRODUCTION_COUNTER</span>
        <span className="nh-led-active bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-gray-400">Total Units Produced</span>
          <span className="text-slate-900 dark:text-white font-bold">{count} units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-gray-400">Line Efficiency</span>
          <span className="text-green-600 dark:text-green-400 font-bold">98.2% (Target Exceeded)</span>
        </div>
      </div>

      <div className="h-10 bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800 rounded-lg relative overflow-hidden flex items-end">
        <svg className="w-full h-full px-1" viewBox="0 0 200 40" preserveAspectRatio="none">
          <path d="M0,35 L40,15 L80,25 L120,5 L160,20 L200,10" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

// OEE Dashboard: concentric dials
const OeeDashboardSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-rose-500 font-bold uppercase tracking-wider">OEE_CORE_ENGINE</span>
        <span className="nh-led-active bg-red-500 shadow-[0_0_8px_#f43f5e]"></span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Availability', val: '98.2%', color: 'text-green-400' },
          { label: 'Performance', val: '94.8%', color: 'text-cyan-400' },
          { label: 'Quality', val: '99.7%', color: 'text-purple-400' }
        ].map((oee, i) => (
          <div key={i} className="border border-slate-200 dark:border-gray-800 rounded-lg p-2.5 bg-slate-50 dark:bg-[#050117] text-center space-y-1">
            <span className="text-[8px] text-slate-500 dark:text-gray-500 uppercase block">{oee.label}</span>
            <span className={`text-sm font-bold ${oee.color}`}>{oee.val}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800/80 pt-3 text-center">
        <span className="text-gray-600 block text-[8px] uppercase">Overall Equipment Effectiveness</span>
        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-wider animate-pulse">94.3% OEE</span>
      </div>
    </div>
  );
};

// RFID Tracking: scan logs
const RfidTrackingSimulator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    'TAG_SCAN: Node #390A. Location: Zone B. Status: OK',
    'TAG_SCAN: Node #390B. Location: Zone B. Status: OK',
    'TAG_SCAN: Node #802E. Location: Zone A. Status: OK',
    'TAG_SCAN: Node #401F. Location: Dock 1. Status: Dispatched'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-orange-400 font-bold uppercase tracking-wider">RFID_PASS_GATE</span>
        <span className="nh-led-active bg-orange-400 shadow-[0_0_8px_#fb923c]"></span>
      </div>

      <div className="bg-slate-50 dark:bg-[#050117] p-3 border border-slate-200 dark:border-gray-800 rounded-lg text-slate-900 dark:text-white font-bold h-12 flex items-center">
        {steps[activeStep]}
      </div>

      <div className="text-[8px] text-gray-600 text-right">
        Verification: <span className="text-green-400">PASSED</span>
      </div>
    </div>
  );
};

// Barcode Automation Scanner
const BarcodeAutomationSimulator = () => {
  const [activeBar, setActiveBar] = useState(89010720014);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBar(b => (b === 89010720014 ? 78902041235 : 89010720014));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-pink-400 font-bold uppercase tracking-wider">BARCODE_PARSER_CORE</span>
        <span className="nh-led-active bg-pink-400 shadow-[0_0_8px_#f472b6]"></span>
      </div>

      <div className="space-y-1 flex flex-col justify-center bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800 p-3 rounded-lg text-slate-900 dark:text-white font-bold">
        <div>SCANNED BARCODE: {activeBar}</div>
        <div className="text-green-600 dark:text-green-400 text-[8px]">DESERIALIZATION: SUCCESSFUL</div>
      </div>
    </div>
  );
};

// Energy Monitoring: Load wave plotter
const EnergyMonitoringSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left h-[180px] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-yellow-500 font-bold uppercase tracking-wider">ENERGY_GRID_LOAD</span>
        <span className="nh-led-active bg-yellow-500 shadow-[0_0_8px_#eab308]"></span>
      </div>

      <div className="h-16 bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800 rounded-lg relative overflow-hidden flex items-end">
        <svg className="w-full h-full px-2" viewBox="0 0 200 80" preserveAspectRatio="none">
          <path d="M0,70 L30,40 L60,60 L90,20 L120,50 L150,30 L180,65 L200,45" fill="none" stroke="#eab308" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex justify-between text-slate-500 dark:text-gray-500 text-[8px]">
        <span>Demand load: 450 kW</span>
        <span className="text-green-600 dark:text-green-400 font-bold">Peak tariff alert: FALSE</span>
      </div>
    </div>
  );
};

// Predictive Maintenance: Vibration critical alert
const PredictiveMaintenanceSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-red-500 font-bold uppercase tracking-wider">PREDICTIVE_MAINT_ALERTS</span>
        <span className="nh-led-active bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 border border-red-500/20 dark:border-red-500/30 p-3 rounded-lg text-rose-950 dark:text-white font-bold space-y-1">
        <div className="text-red-600 dark:text-red-400">WARNING: Conveyor Motor #4 Vibration Critical</div>
        <div className="text-slate-500 dark:text-gray-400 text-[8px]">Remaining Useful Life (RUL): 14.2 Hours</div>
      </div>
    </div>
  );
};

// Remote Equipment Monitoring: GPS Map Plotter
const RemoteEquipmentSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-cyan-400 font-bold uppercase tracking-wider">GPS_MAP_TRACKER</span>
        <span className="nh-led-active bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
      </div>

      <div className="space-y-2 bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800 p-3 rounded-lg text-slate-900 dark:text-white font-bold">
        <div>FLEET LAT: 34.0522, LON: -118.2437</div>
        <div className="text-[8px] text-slate-500 dark:text-gray-500">SPEED: 55 mph. EST ARRIVAL: 12 mins.</div>
      </div>
    </div>
  );
};

// Digital Twin: Concentric sync rings
const DigitalTwinSimulator = () => {
  return (
    <div className="w-full max-w-sm border border-gray-800 bg-[#07041a] rounded-2xl p-4 shadow-2xl font-mono text-[10px] space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <span className="text-violet-400 font-bold uppercase tracking-wider">DIGITAL_TWIN_SYNC</span>
        <span className="nh-led-active bg-violet-400 shadow-[0_0_8px_#a78bfa]"></span>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full border border-dashed border-violet-400/40 animate-spin flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-dashed border-blue-400/50 animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

// Default rotating dynamic wireframe
const DefaultIotVisualizer = () => {
  return (
    <div className="w-full max-w-sm aspect-square relative flex items-center justify-center p-6">
      <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-red-500/20 animate-spin-slow"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-blue-400/30 animate-spin-reverse"></div>

      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-600/30 via-purple-600/20 to-blue-600/30 border border-red-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(238,0,28,0.25)]">
        <div className="absolute w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />

        {/* Network / Router SVG Outline */}
        <svg className="w-10 h-10 text-white drop-shadow-[0_0_12px_#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.57M12 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A13.916 13.916 0 0015 11.57M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
};

const renderIotSandboxWidget = (tab) => {
  switch (tab) {
    case 'Industrial IoT':
    case 'Sensor Monitoring':
      return <IotSensorSimulator />;
    case 'Machine Monitoring':
    case 'PLC Integration':
    case 'SCADA Integration':
      return <MachineTelemetrySimulator />;
    case 'Production Monitoring':
      return <ProductionMonitoringSimulator />;
    case 'OEE Dashboard':
      return <OeeDashboardSimulator />;
    case 'RFID Tracking':
      return <RfidTrackingSimulator />;
    case 'Barcode Automation':
      return <BarcodeAutomationSimulator />;
    case 'Energy Monitoring':
      return <EnergyMonitoringSimulator />;
    case 'Predictive Maintenance':
      return <PredictiveMaintenanceSimulator />;
    case 'Remote Equipment Monitoring':
      return <RemoteEquipmentSimulator />;
    case 'Digital Twin':
      return <DigitalTwinSimulator />;
    default:
      return <DefaultIotVisualizer />;
  }
};

const IotHero = ({ activeTab }) => {
  const navigate = useNavigate();
  const data = getDefaultData(activeTab);

  return (
    <div className="relative">

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* Left text */}
        <div className="lg:w-1/2 z-10 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400 font-medium">
                  <li>
                    <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
                  </li>
                  <li className="text-slate-400 dark:text-gray-600">&gt;</li>
                  <li>
                    <Link to="/iot-solutions" className="hover:text-rose-500 transition-colors">IoT Solutions</Link>
                  </li>
                  <li className="text-slate-400 dark:text-gray-600">&gt;</li>
                  <li className="text-rose-600 dark:text-rose-400 font-extrabold" aria-current="page">
                    {activeTab}
                  </li>
                </ol>
              </nav>

              <span className="ai-tag mb-4">IoT PLATFORM</span>
              <h1 className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.1] mb-6">
                {data.heroTitle} <span className="iot-text-gradient">{data.heroHighlight}</span>
              </h1>

              <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-10 max-w-lg">
                {data.heroDesc}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigate('/contact')}
              aria-label="Book an Industrial IoT Consultation with Codigix"
              className="px-6 py-3 bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:from-[#d30018] hover:to-[#6b1fb0] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Book Consultation <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              aria-label="Schedule a Live IoT System Demo with Codigix"
              className="px-6 py-3 bg-transparent border border-slate-350 dark:border-gray-700 hover:border-purple-500 text-slate-800 dark:text-white text-[12px] font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-500/10"
            >
              Schedule Demo <Calendar size={14} />
            </button>
          </motion.div>
        </div>

        {/* Right Content -> Dynamic Specific Visuals */}
        <div className="lg:w-1/2 relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`iot-sandbox-${activeTab}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full flex items-center justify-center"
            >
              {renderIotSandboxWidget(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        key={`stats-${activeTab}`}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
      >
        {data.metrics && data.metrics.map((metric, idx) => {
          const MetricIcon = metric.icon;
          return (
            <div key={idx} className="bg-white dark:bg-[#090624]/50 border border-slate-200 dark:border-gray-800/60 rounded-xl p-5 flex items-center gap-4 hover:border-red-500/30 transition-colors text-left shadow-sm dark:shadow-none">
              <div className="p-3 bg-red-500/10 rounded-lg text-[#EE001C] shrink-0">
                <MetricIcon size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{metric.value}</h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wide">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
};

export default IotHero;
