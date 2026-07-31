import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { getDefaultData } from './iotTabData';

const useCaseLogs = {
  'Predictive Maintenance': '[PLC_MONITOR] Anomaly warning: Vibration threshold critical on conveyor motor #4.',
  'Quality Control': '[GATEWAY_RX] Quality check trigger: Camera modules at 30 FPS. Accuracy check: 99.8%.',
  'OEE Optimization': '[CORE_ENGINE] Calculations update: Performance = 94.8%, Availability = 98.2%.',
  'Remote Monitoring': '[CELLULAR_GATEWAY] Stream status: Active. Ingress bandwidth: 5.2 KB/s.',
  'Energy Grid': '[ENERGY_LOG] Load forecast check: Demand load 450 kW. Peak tariff alert: FALSE.',
  'Sensor Mapping': '[LIVE_GRID] Ingesting multi-channel nodes. Temperature: 24.2°C, Pressure: 101.3 kPa.',
  'Asset Routing': '[BARCODE_DECODER] Last scanned: 89010720014. Status: Valid.',
  'Fleet Tracking': '[FLEET_TELEMETRY] Coordinates sync: LAT 34.05, LON -118.24. Speed: 55 mph.'
};

const IotCapabilitiesAndUseCases = ({ activeTab }) => {
  const data = getDefaultData(activeTab);
  const capabilities = data.capabilities || [];
  const useCases = data.useCases || [];

  const [selectedUc, setSelectedUc] = useState(useCases[0]?.name || '');

  const logText = useCaseLogs[selectedUc] || `[GATEWAY_RX] Select a use case card to focus telemetry mapping.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Key Capabilities */}
      <div className="bg-[#090624]/30 border border-gray-800/60 rounded-xl p-6 hover:border-gray-700/80 transition-colors text-left">
        <h4 className="text-sm font-bold text-white mb-6 flex items-center justify-between">
          <span>Key Capabilities</span>
          <span className="text-[10px] text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/40">{activeTab}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-3">
          {capabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#050117]/50 border border-gray-800/50 rounded-lg p-2.5 hover:border-rose-500/30 transition-colors">
              <CheckCircle2 size={14} className="text-rose-500 shrink-0" />
              <span className="text-[11px] text-gray-300 font-medium">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-[#090624]/30 border border-gray-800/60 rounded-xl p-6 hover:border-gray-700/80 transition-colors text-left flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white mb-6">Use Cases Across Industries</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {useCases.map((uc, i) => {
              const UcIcon = uc.icon;
              const isSelected = uc.name === selectedUc;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedUc(uc.name)}
                  className="flex flex-col items-center text-center gap-2 group cursor-pointer"
                >
                  <div className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_12px_rgba(244,63,94,0.25)]' : 'bg-[#050117] border-gray-800/80 group-hover:border-rose-500/50 group-hover:bg-rose-500/10'
                  }`}>
                    <UcIcon size={20} className="text-rose-400" />
                  </div>
                  <span className={`text-[10px] transition-colors leading-tight truncate w-full ${isSelected ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{uc.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live gateway diagnostic log monitor */}
        <div className="mt-6 border border-gray-850 bg-[#07041a] rounded-xl p-3 shadow-md font-mono text-[9px]">
          <div className="flex items-center justify-between border-b border-gray-800/60 pb-1.5 mb-1.5">
            <span className="text-gray-500 font-bold uppercase">telemetry_rx_status</span>
            <span className="nh-led-active bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
          </div>
          <div className="h-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedUc}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="text-rose-300 font-semibold truncate w-full"
              >
                {logText}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IotCapabilitiesAndUseCases;
