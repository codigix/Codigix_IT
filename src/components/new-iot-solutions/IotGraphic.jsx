import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Database, Radio, RefreshCw, BarChart2, CheckCircle } from 'lucide-react';

const IotGraphic = ({ activeTab }) => {
  const [liveData, setLiveData] = useState({ temp: 42.5, vibration: 0.12, efficiency: 87.4, count: 1250 });

  // Update telemetry data dynamically in real time
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        temp: +(prev.temp + (Math.random() - 0.5) * 0.4).toFixed(1),
        vibration: +(Math.max(0.05, prev.vibration + (Math.random() - 0.5) * 0.02)).toFixed(3),
        efficiency: +(Math.min(100, Math.max(70, prev.efficiency + (Math.random() - 0.5) * 0.2))).toFixed(1),
        count: prev.count + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine which layout to render based on the active tab
  const getGraphicType = () => {
    if (activeTab.includes('Sensor') || activeTab.includes('Energy')) {
      return 'sensors';
    }
    if (activeTab.includes('Machine') || activeTab.includes('OEE') || activeTab.includes('Production')) {
      return 'oee';
    }
    if (activeTab.includes('RFID') || activeTab.includes('Barcode')) {
      return 'tracking';
    }
    return 'network';
  };

  const graphicType = getGraphicType();

  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#0c0725] to-[#040114] border border-purple-900/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Absolute Decorative Glows */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-red-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]"></div>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">System Status: Live</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
      </div>

      {/* Rendering Layout */}
      <div className="flex-1 flex items-center justify-center my-6 z-10 relative">
        {graphicType === 'sensors' && (
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-[#0e0a30]/50 border border-purple-900/30 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Temperature</span>
                <Activity size={14} className="text-red-500" />
              </div>
              <div className="text-2xl font-bold text-white my-1">{liveData.temp}°C</div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-purple-600" style={{ width: `${(liveData.temp / 80) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-[#0e0a30]/50 border border-purple-900/30 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Vibration</span>
                <Cpu size={14} className="text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white my-1">{liveData.vibration} g</div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: `${liveData.vibration * 100 * 4}%` }}></div>
              </div>
            </div>

            <div className="bg-[#0e0a30]/50 border border-purple-900/30 rounded-xl p-4 flex flex-col justify-between col-span-2 hover:border-red-500/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Telemetry Stream</span>
                <Radio size={14} className="text-red-500 animate-pulse" />
              </div>
              {/* Dynamic waveform graphic */}
              <div className="h-16 flex items-end gap-1 px-1">
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = Math.abs(Math.sin(i * 0.5 + liveData.temp) * 40 + Math.random() * 20);
                  return (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-red-500 to-purple-600 rounded-t-sm transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {graphicType === 'oee' && (
          <div className="flex flex-col items-center justify-center w-full max-w-sm gap-6">
            
            {/* Radial gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="#1f1a3d" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="60" 
                  stroke="url(#oeeGrad)" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={377}
                  strokeDashoffset={377 - (377 * liveData.efficiency) / 100}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="oeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EE001C" />
                    <stop offset="100%" stopColor="#7e22ce" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center z-10">
                <div className="text-3xl font-bold text-white">{liveData.efficiency}%</div>
                <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mt-1">Live OEE</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#0e0a30]/30 border border-gray-800/80 rounded-lg p-2.5 flex items-center gap-3">
                <BarChart2 size={16} className="text-red-500" />
                <div>
                  <div className="text-xs font-bold text-white">{liveData.count}</div>
                  <div className="text-[8px] text-gray-500 uppercase">Part Count</div>
                </div>
              </div>

              <div className="bg-[#0e0a30]/30 border border-gray-800/80 rounded-lg p-2.5 flex items-center gap-3">
                <CheckCircle size={16} className="text-purple-400" />
                <div>
                  <div className="text-xs font-bold text-white">99.2%</div>
                  <div className="text-[8px] text-gray-500 uppercase">Quality Rate</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {graphicType === 'tracking' && (
          <div className="flex flex-col w-full max-w-sm border border-purple-900/20 bg-[#0e0a30]/40 rounded-xl p-4 relative overflow-hidden">
            {/* Sweep scanner effect */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-bounce"></div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Asset Scanner Portal</span>
              <RefreshCw size={12} className="text-purple-400 animate-spin" />
            </div>

            <div className="space-y-3">
              {[
                { id: 'TX-8041', loc: 'Dock Gate 2', status: 'In Transit' },
                { id: 'TX-8042', loc: 'Assembly Line A', status: 'Processing' },
                { id: 'TX-8043', loc: 'Warehouse Bin B4', status: 'Stored' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 bg-[#050112]/80 border border-gray-800/80 rounded-lg">
                  <div className="flex items-center gap-2.5">
                    <Database size={14} className="text-red-500" />
                    <span className="text-xs font-bold text-white">{item.id}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{item.loc}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-purple-950/40 border border-purple-900/40 text-purple-300 rounded font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {graphicType === 'network' && (
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Spinning cybernetic ring */}
            <div className="absolute inset-0 border-2 border-dashed border-red-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-36 h-36 border border-dashed border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
            <div className="absolute w-28 h-28 border-2 border-purple-900/40 rounded-full"></div>

            {/* Floating nodes */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_#EE001C] animate-pulse"></div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_#7e22ce] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_#EE001C] animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_#7e22ce] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            <div className="z-10 bg-[#050112] p-3 rounded-full border border-gray-800 shadow-xl">
              <Cpu size={24} className="text-white animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Footer analytics bar */}
      <div className="flex items-center justify-between text-[9px] text-gray-500 border-t border-gray-800/80 pt-4 z-10">
        <span>Packet Loss: 0.00%</span>
        <span>Latency: 12ms</span>
        <span>Signal: Strong</span>
      </div>

    </div>
  );
};

export default IotGraphic;
