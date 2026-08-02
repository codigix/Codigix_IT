import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, PlusCircle, PenTool, TrendingUp, BarChart, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:5000/api';

const departments = [
  'All Departments',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'HR',
  'Business Development'
];

const fallbackJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    desc: 'Build scalable web applications',
    dept: 'Engineering',
    deptIcon: Briefcase,
    exp: '3-6 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'React.js Developer',
    desc: 'Develop responsive and interactive UI',
    dept: 'Engineering',
    deptIcon: Briefcase,
    exp: '2-4 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    desc: 'Design intuitive and engaging experiences',
    dept: 'Design',
    deptIcon: PenTool,
    exp: '2-5 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Digital Marketing Executive',
    desc: 'Plan and execute digital marketing campaigns',
    dept: 'Marketing',
    deptIcon: TrendingUp,
    exp: '1-3 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 5,
    title: 'Business Development Executive',
    desc: 'Identify opportunities and build client relationships',
    dept: 'Sales',
    deptIcon: BarChart,
    exp: '1-4 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 6,
    title: 'Customer Support Executive',
    desc: 'Provide excellent support and resolve queries',
    dept: 'Support',
    deptIcon: Headphones,
    exp: '0-2 Years',
    location: 'Pune, India',
    type: 'Full-time'
  }
];

const CareerJobs = ({ activeDepartment, setActiveDepartment, onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE}/jobs`);
        if (response.ok) {
          const data = await response.json();
          const mappedJobs = data.map(j => {
             let icon = Briefcase;
             if(j.dept === 'Design') icon = PenTool;
             if(j.dept === 'Marketing') icon = TrendingUp;
             if(j.dept === 'Sales') icon = BarChart;
             if(j.dept === 'Support') icon = Headphones;
             
             return {
                ...j,
                deptIcon: icon,
                desc: j.description || j.desc || 'Join our growing team',
                exp: j.experience || j.exp || 'Not specified'
             };
          });
          setJobs(mappedJobs);
        }
      } catch (err) {
         console.error('Failed to fetch jobs', err);
      } finally {
         setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const displayJobs = jobs.length > 0 ? jobs : fallbackJobs;

  const filteredJobs = activeDepartment === 'All Departments' 
    ? displayJobs 
    : displayJobs.filter(job => job.dept === activeDepartment);

  return (
    <div className="py-8 mb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Open Positions</h2>
        <div className="text-purple-650 dark:text-purple-400 text-[11px] font-medium flex items-center gap-1 cursor-pointer hover:text-purple-500 transition-colors">
          View All Jobs <ArrowRight size={14} />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border border-slate-200 dark:border-gray-800/80 rounded-xl p-2 mb-8 bg-slate-50 dark:bg-[#050112]">
        <div className="flex gap-2 overflow-x-auto w-full hide-scrollbar">
           {departments.map((dept, idx) => (
             <button 
               key={idx}
               onClick={() => setActiveDepartment(dept)}
               className={`px-4 py-2 text-[11px] font-medium rounded-lg border transition-all shrink-0 flex-1 ${
                 activeDepartment === dept 
                   ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20 font-semibold' 
                   : 'bg-white dark:bg-[#050117] border-slate-200 dark:border-gray-800 text-slate-550 dark:text-gray-400 hover:border-slate-400 dark:hover:border-gray-600 hover:text-slate-900 dark:hover:text-gray-250'
               }`}
             >
               {dept}
             </button>
           ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {filteredJobs.map((job) => (
            <motion.div
              layout
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:shadow-sm transition-all duration-300"
            >
              {/* Job Title & Desc */}
              <div className="md:w-1/4">
                <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-500 leading-snug">{job.desc}</p>
              </div>

              {/* Meta Info */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-gray-300">
                    <job.deptIcon size={14} className="text-slate-400 dark:text-gray-500" />
                    {job.dept}
                 </div>
                 <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-gray-300">
                    <PlusCircle size={14} className="text-slate-400 dark:text-gray-550" />
                    {job.exp}
                 </div>
                 <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-gray-300">
                    <MapPin size={14} className="text-slate-400 dark:text-gray-550" />
                    {job.location}
                 </div>
                 <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-gray-300">
                    <Briefcase size={14} className="text-slate-400 dark:text-gray-550" />
                    {job.type}
                 </div>
              </div>

              {/* Apply Button */}
              <div className="shrink-0">
                  <button 
                    onClick={() => onApply && onApply(job)}
                    className="w-full md:w-auto px-6 py-2 bg-purple-50 dark:bg-transparent border border-purple-200 dark:border-purple-500/30 hover:border-purple-500 hover:bg-purple-600 hover:text-white text-purple-750 dark:text-purple-400 text-[11px] font-medium rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default CareerJobs;
