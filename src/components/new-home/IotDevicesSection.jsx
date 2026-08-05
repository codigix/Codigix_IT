import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const devices = [
  { name: 'Temperature Sensors', image: '/assets/images/new-home/iot_temp_sensor.webp' },
  { name: 'Pressure Sensors', image: '/assets/images/new-home/iot_pressure_sensor.webp' },
  { name: 'Vibration Sensors', image: '/assets/images/new-home/iot_vibration_sensor.webp' },
  { name: 'PLC Controllers', image: '/assets/images/new-home/iot_plc_controller.webp' },
  { name: 'Raspberry Pi', image: '/assets/images/new-home/iot_raspberry_pi.webp' },
  { name: 'ESP32 / ESP8266', image: '/assets/images/new-home/iot_esp32.webp' },
  { name: 'RFID Readers', image: '/assets/images/new-home/iot_rfid_reader.webp' },
  { name: 'Barcode Scanner', image: '/assets/images/new-home/iot_barcode_scanner.webp' },
  { name: 'Industrial Gateway', image: '/assets/images/new-home/iot_gateway_icon.webp' },
  { name: 'Camera Modules', image: '/assets/images/new-home/iot_camera_module.webp' },
];

const deviceTelemetry = {
  'Temperature Sensors': { val: '24.8 °C', metric: 'Temperature', status: 'Streaming', color: '#f43f5e', wave: 'M0,15 C20,5 40,25 60,10 C80,-5 100,30 120,15 C140,0 160,20 180,15' },
  'Pressure Sensors': { val: '101.4 kPa', metric: 'Pressure', status: 'Streaming', color: '#3b82f6', wave: 'M0,15 C10,0 20,30 30,15 C40,0 50,30 60,15 C70,0 80,30 90,15 C100,0 110,30 120,15 C130,0 140,30 150,15 T180,15' },
  'Vibration Sensors': { val: '0.12 g', metric: 'Acceleration', status: 'Streaming', color: '#eab308', wave: 'M0,15 C5,5 10,25 15,15 C20,5 25,25 30,15 T60,15 T90,15 T120,15 T150,15 T180,15' },
  'PLC Controllers': { val: '24/32 active', metric: 'Registers', status: 'Modbus/TCP', color: '#10b981', wave: 'M0,5 L30,5 L30,25 L60,25 L60,5 L90,5 L90,25 L120,25 L120,5 L150,5 L150,25 L180,25' },
  'Raspberry Pi': { val: '42.6 °C', metric: 'CPU Temp', status: 'Running', color: '#a855f7', wave: 'M0,15 C30,12 60,18 90,15 C120,12 150,18 180,15' },
  'ESP32 / ESP8266': { val: '-64 dBm', metric: 'RSSI Signal', status: 'Connected', color: '#06b6d4', wave: 'M0,25 L30,20 L60,10 L90,15 L120,5 L150,10 L180,2' },
  'RFID Readers': { val: '#E2004B', metric: 'Last Tag ID', status: 'Polled', color: '#ec4899', wave: 'M0,15 L60,15 L60,5 L70,25 L80,15 L180,15' },
  'Barcode Scanner': { val: 'EAN-13 Ok', metric: 'Decoder State', status: 'Triggered', color: '#f43f5e', wave: 'M0,15 L50,15 L55,5 L60,25 L65,15 L180,15' },
  'Industrial Gateway': { val: '5.2 KB/s', metric: 'Throughput', status: 'Online', color: '#3b82f6', wave: 'M0,15 Q30,5 60,25 T120,15 T180,15' },
  'Camera Modules': { val: '30 FPS', metric: 'Capture Rate', status: 'RTMP Stream', color: '#10b981', wave: 'M0,15 C20,10 40,20 60,15 C80,10 100,20 120,15 C140,10 160,20 180,15' }
};

const IotDevicesSection = () => {
  const [selectedDevice, setSelectedDevice] = useState('Temperature Sensors');

  const telemetry = deviceTelemetry[selectedDevice] || deviceTelemetry['Temperature Sensors'];

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50/30 via-slate-50 to-white dark:from-[#0d0b21] dark:via-[#0d0b21] dark:to-[#0d0b21] relative transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Side: Device Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 order-2 lg:order-1">
            {devices.map((device, index) => {
              const isSelected = device.name === selectedDevice;
              return (
                <motion.div
                  key={index}
                  onClick={() => setSelectedDevice(device.name)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  viewport={{ once: true }}
                  className={`flex flex-col items-center justify-center p-3 lg:p-4 bg-white dark:bg-[#090624]/95 border rounded-2xl transition-all duration-300 group cursor-pointer shadow-sm aspect-[4/5] w-full relative overflow-hidden ${isSelected
                      ? 'border-blue-500 bg-blue-50/90 dark:bg-[#110c38] shadow-[0_8px_25px_rgba(59,130,246,0.2)]'
                      : 'border-slate-200 dark:border-gray-800/80 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-[#110c38]'
                    }`}
                >
                  {/* Pulsing LED Active status */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className={`nh-led-active ${isSelected ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`}></span>
                    <span className="text-[7px] text-green-600 dark:text-green-400 font-bold tracking-widest uppercase hidden group-hover:inline-block">LIVE</span>
                  </div>

                  <div className="w-full h-16 lg:h-20 mb-3 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <img
                      src={device.image}
                      alt={`Codigix Industrial IoT ${device.name} Integration`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-transform duration-300 group-hover:scale-110 relative z-10"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[9px] lg:text-[10px] text-center text-slate-700 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white font-extrabold leading-tight px-0.5 uppercase tracking-wider transition-colors duration-300">
                    {device.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Middle: IoT Integrations Text */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-6 lg:pl-4 flex flex-col justify-center text-left">
            <span className="text-purple-600 dark:text-purple-500 font-bold tracking-wider text-[11px] sm:text-xs uppercase">CONNECTED DEVICES. REAL IMPACT.</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">IoT Devices & Integrations</h2>
            <p className="text-slate-650 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              We integrate industrial IoT devices and sensors to collect real-time data and turn it into actionable insights.
            </p>

            <div>
              <Link to="/iot-solutions" aria-label="Explore Industrial IoT Solutions by Codigix Infotech">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors mt-2 text-sm shadow-[0_0_15px_rgba(225,29,72,0.3)] cursor-pointer"
                >
                  Explore IoT Solutions <ArrowRight size={18} />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Right Side: Live Telemetry stream visual graph panel - High-contrast dark console */}
          <div className="lg:col-span-2 order-3 flex flex-col justify-center">
            <div className="w-full border border-purple-900/40 dark:border-gray-800/80 bg-[#0c0828] dark:bg-[#07041a] rounded-2xl p-4 shadow-[0_15px_40px_rgba(139,92,246,0.12)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.5)] font-mono text-[10px] space-y-3 keep-dark">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
                <span className="text-gray-400 font-bold uppercase tracking-wider">telemetry_rx.bin</span>
                <span className="nh-led-active bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
              </div>

              <div>
                <div className="text-gray-500">// Target device</div>
                <div className="text-xs font-bold text-white uppercase truncate">{selectedDevice}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-b border-purple-900/40 py-2">
                <div>
                  <div className="text-gray-500">Metric</div>
                  <div className="text-[10px] font-bold text-gray-300 truncate">{telemetry.metric}</div>
                </div>
                <div>
                  <div className="text-gray-500">Value</div>
                  <div className="text-[10px] font-bold text-white animate-pulse truncate" style={{ color: telemetry.color }}>{telemetry.val}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-500">// Signal waves</div>
                <div className="h-12 border border-purple-900/40 bg-[#060318] rounded-lg mt-1 flex items-center justify-center relative overflow-hidden">
                  <svg className="w-full h-8 px-2 opacity-90" viewBox="0 0 180 30" preserveAspectRatio="none">
                    <path
                      d={telemetry.wave}
                      fill="none"
                      stroke={telemetry.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,200;200,0;0,200"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>

              <div className="text-[8px] text-gray-500 text-right">
                status: <span className="text-green-400 font-bold uppercase">{telemetry.status}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IotDevicesSection;
