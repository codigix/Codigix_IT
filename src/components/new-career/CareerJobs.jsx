import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Briefcase, PenTool, TrendingUp, BarChart, Headphones, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../config';

export const departments = [
  'All Departments',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'HR',
  'Business Development'
];

export const fallbackJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    desc: 'Build scalable web applications with React, Node.js, and cloud services.',
    dept: 'Engineering',
    deptIcon: Briefcase,
    exp: '3-6 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'React.js Developer',
    desc: 'Develop responsive, interactive UI components and design systems.',
    dept: 'Engineering',
    deptIcon: Briefcase,
    exp: '2-4 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    desc: 'Design intuitive wireframes, mockups, and engaging user experiences.',
    dept: 'Design',
    deptIcon: PenTool,
    exp: '2-5 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Digital Marketing Executive',
    desc: 'Plan and execute search engine optimization, content, and ad campaigns.',
    dept: 'Marketing',
    deptIcon: TrendingUp,
    exp: '1-3 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 5,
    title: 'Business Development Executive',
    desc: 'Identify enterprise client opportunities and manage sales pipelines.',
    dept: 'Sales',
    deptIcon: BarChart,
    exp: '1-4 Years',
    location: 'Pune, India',
    type: 'Full-time'
  },
  {
    id: 6,
    title: 'Customer Support Executive',
    desc: 'Provide technical assistance and ensure high client satisfaction.',
    dept: 'Support',
    deptIcon: Headphones,
    exp: '0-2 Years',
    location: 'Pune, India',
    type: 'Full-time'
  }
];

const CareerJobs = ({ activeDepartment, setActiveDepartment, onApply }) => {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/jobs`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
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
                 exp: j.experience || j.exp || 'Not specified',
                 type: j.type || 'Full-time',
                 company: j.company || 'Codigix Infotech',
                 skills: j.skills || '',
                 responsibilities: j.responsibilities || '',
                 qualifications: j.qualifications || '',
              };
            });
            setJobs(mappedJobs);
          } else {
            setJobs(fallbackJobs);
          }
        }
      } catch (err) {
         console.error('Failed to fetch jobs from API, using static data:', err);
         setJobs(fallbackJobs);
      } finally {
         setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = activeDepartment === 'All Departments' 
    ? jobs 
    : jobs.filter(j => j.dept === activeDepartment);

  if (loading) return <div className="py-12 text-center text-slate-500">Loading Job Openings...</div>;

  return (
    <section id="career-jobs" className="py-8 scroll-mt-24 text-left" aria-label="Current Job Openings">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-bold text-purple-650 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-500/10 px-2.5 py-1 rounded border border-purple-200 dark:border-purple-500/20 mb-2 inline-block">
            Open Positions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Explore <span className="text-purple-600 dark:text-purple-400">Current Opportunities</span>
          </h2>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {departments.map(dept => (
          <button 
            key={dept}
            onClick={() => setActiveDepartment(dept)}
            className={`px-4 py-2 text-[11px] font-medium rounded-lg border transition-all shrink-0 ${
              activeDepartment === dept 
                ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20 font-semibold' 
                : 'bg-slate-50 dark:bg-[#050117] border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 hover:border-slate-400 dark:hover:border-gray-600 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const IconComp = job.deptIcon || Briefcase;
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl hover:border-purple-500/50 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 shrink-0">
                        <IconComp size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-purple-650 dark:text-purple-400 block">
                            {job.dept}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-[9px] font-semibold text-slate-600 dark:text-gray-300">
                            {job.type || 'Full-time'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {job.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-gray-400 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-purple-500" />
                      {job.company || 'Codigix Infotech'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-purple-500 shrink-0" /> 
                      {job.location || 'Pune, India'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-purple-500 shrink-0" /> 
                      {job.exp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {job.desc}
                  </p>

                  {job.skills && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.split(',').slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[9px] font-medium border border-slate-200 dark:border-gray-700">
                          {skill.trim()}
                        </span>
                      ))}
                      {job.skills.split(',').length > 4 && (
                         <span className="px-2 py-1 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-[9px] font-medium">
                           +{job.skills.split(',').length - 4} more
                         </span>
                      )}
                    </div>
                  )}

                  {job.qualifications && (
                    <div className="mb-4">
                      <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-gray-400">
                        <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{job.qualifications}</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-gray-800/80 pt-4 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 dark:text-gray-400">
                      {/* Left side empty for balance or we can add a date here later */}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApply(job, 'details')}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 text-xs font-semibold border border-slate-200 dark:border-gray-700 transition-all flex items-center gap-1.5 shrink-0"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onApply(job, 'apply')}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/80 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-800/40 transition-all flex items-center gap-1.5 shrink-0"
                      >
                        Apply Now <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-2 py-12 text-center text-slate-500 dark:text-gray-400">
              No open positions currently listed for this department. Feel free to submit a general application!
            </div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default CareerJobs;
