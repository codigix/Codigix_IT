import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Edit, 
  Briefcase, 
  MapPin, 
  Clock, 
  Building2, 
  Layers, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  LayoutGrid, 
  List, 
  UserCheck, 
  Award, 
  Sparkles,
  FileText,
  ChevronRight
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const fallbackJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    dept: 'Engineering',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '3-6 Years',
    description: 'Build scalable web applications and microservices using React, Node.js, and cloud databases.',
    responsibilities: '• Lead frontend and backend web architecture\n• Code review and mentor junior developers\n• Optimize web application performance and security',
    skills: 'React.js, Node.js, TypeScript, PostgreSQL, AWS',
    qualifications: 'B.Tech / B.E in Computer Science or equivalent',
    requirements: 'Strong problem-solving skills and experience with scalable SaaS apps.'
  },
  {
    id: 2,
    title: 'React.js Developer',
    dept: 'Engineering',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '2-4 Years',
    description: 'Develop responsive and interactive UI components with seamless API integrations.',
    responsibilities: '• Build reusable UI components in React\n• Collaborate with UX/UI designers\n• Ensure high performance across browsers',
    skills: 'React.js, Redux / Zustand, Tailwind CSS, REST APIs',
    qualifications: 'Bachelor degree in CS / IT',
    requirements: 'Proficient in ES6+, CSS Grid, and Git workflow.'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    dept: 'Design',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '2-5 Years',
    description: 'Design intuitive, engaging user interfaces and modern web experience design systems.',
    responsibilities: '• Create wireframes, user flows, and prototypes\n• Design high-fidelity UI interfaces in Figma\n• Conduct user testing and iterate on feedback',
    skills: 'Figma, Adobe XD, Design Systems, Prototyping, Usability Testing',
    qualifications: 'Degree in Design / Fine Arts / CS',
    requirements: 'Strong portfolio showcasing web and mobile application UI/UX.'
  },
  {
    id: 4,
    title: 'Digital Marketing Executive',
    dept: 'Marketing',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1-3 Years',
    description: 'Plan and execute digital marketing campaigns, SEO strategy, and lead generation funnels.',
    responsibilities: '• Manage PPC and social media ad campaigns\n• Optimize website SEO and keyword strategy\n• Analyze conversion metrics and ROI',
    skills: 'SEO, Google Ads, Meta Ads, Content Marketing, Analytics',
    qualifications: 'Degree in Marketing / Business Administration',
    requirements: 'Hands-on experience with ad platforms and analytics tools.'
  },
  {
    id: 5,
    title: 'Business Development Executive',
    dept: 'Sales',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1-4 Years',
    description: 'Identify tech solution opportunities, nurture client leads, and close B2B software deals.',
    responsibilities: '• Generate B2B leads for IT & software services\n• Conduct client requirement discovery meetings\n• Prepare proposals and close contracts',
    skills: 'B2B Sales, Lead Generation, CRM, Negotiation, Presentation',
    qualifications: 'MBA or Bachelor degree',
    requirements: 'Excellent verbal and written communication skills.'
  }
];

const departments = [
  'All',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'HR',
  'Business Development'
];

const JobsAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [previewJob, setPreviewJob] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    dept: 'Engineering',
    company: 'Codigix Infotech',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '2-4 Years',
    description: '',
    responsibilities: '',
    skills: '',
    qualifications: '',
    requirements: ''
  });

  // Fetch Jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/jobs`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(fallbackJobs);
        }
      } else {
        setJobs(fallbackJobs);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs(fallbackJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Form Handlers
  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      dept: 'Engineering',
      company: 'Codigix Infotech',
      location: 'Pune, India',
      type: 'Full-time',
      experience: '2-4 Years',
      description: '',
      responsibilities: '',
      skills: '',
      qualifications: '',
      requirements: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      dept: job.dept || 'Engineering',
      company: job.company || 'Codigix Infotech',
      location: job.location || 'Pune, India',
      type: job.type || 'Full-time',
      experience: job.experience || job.exp || '2-4 Years',
      description: job.description || job.desc || '',
      responsibilities: job.responsibilities || '',
      skills: job.skills || '',
      qualifications: job.qualifications || '',
      requirements: job.requirements || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a job title.');
      return;
    }

    try {
      if (editingJob) {
        // PUT update
        const response = await fetch(`${API_BASE}/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Update failed');
      } else {
        // POST create
        const response = await fetch(`${API_BASE}/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Creation failed');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      console.error('Error saving job:', err);
      // Local optimistic fallback update
      if (editingJob) {
        setJobs(prev => prev.map(j => j.id === editingJob.id ? { ...j, ...formData } : j));
      } else {
        setJobs(prev => [{ id: Date.now(), ...formData }, ...prev]);
      }
      setIsModalOpen(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (job.dept || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (job.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (job.skills || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All' || job.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  // Calculate Metrics
  const totalOpenings = jobs.length;
  const engineeringRoles = jobs.filter(j => j.dept === 'Engineering').length;
  const fulltimeRoles = jobs.filter(j => (j.type || '').toLowerCase().includes('full')).length;
  const totalDepts = new Set(jobs.map(j => j.dept)).size;

  return (
    <div className="p-4 sm:p-8 max-w-[1700px] mx-auto min-h-screen text-slate-900 dark:text-slate-100">
      
      {/* 1. TOP HEADER & METRICS BAR */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Briefcase size={20} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Job Postings Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
            Create, manage, and publish career opportunities for top technical talent.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2 shrink-0 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Post New Job Opening
        </button>
      </div>

      {/* 2. STATS CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Briefcase size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Openings</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalOpenings}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Layers size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Departments</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalDepts}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <UserCheck size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engineering Roles</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{engineeringRoles}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-sm dark:shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Award size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full-Time Roles</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{fulltimeRoles}</h3>
          </div>
        </div>
      </div>

      {/* 3. FILTER & TOOLBAR ROW */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, department, or skills..."
            className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white pl-10 pr-4 py-2 rounded-xl focus:border-purple-500 focus:outline-none text-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Department Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 hidden sm:block" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white px-3 py-2 rounded-xl text-xs focus:border-purple-500 focus:outline-none"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07041a] p-1 rounded-xl border border-slate-200 dark:border-purple-900/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-purple-600 text-white font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* 4. CONTENT AREA: GRID OR TABLE */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="animate-spin text-purple-500" />
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Loading job postings...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 p-8">
          <AlertCircle size={40} className="text-purple-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Job Openings Found</h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new job position.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add First Job
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id}
              className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 p-6 shadow-md dark:shadow-2xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Dept Badge & Job Type */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[10px] uppercase tracking-wider">
                    {job.dept || 'Engineering'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-gray-300 font-semibold text-[10px]">
                    {job.type || 'Full-time'}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {job.title}
                </h3>

                {/* Company & Location */}
                <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-gray-400 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Building2 size={13} className="text-purple-500" />
                    {job.company || 'Codigix Infotech'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-purple-500" />
                    {job.location || 'Pune, India'}
                  </span>
                </div>

                {/* Experience Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/30 text-purple-700 dark:text-purple-300 text-[11px] font-semibold mb-4">
                  <Clock size={13} />
                  <span>Required Experience: {job.experience || job.exp || '2+ Years'}</span>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                  {job.description || job.desc || 'Join our engineering team to build next-generation enterprise solutions.'}
                </p>

                {/* Skills Chips */}
                {job.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.split(',').slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-[10px] font-medium border border-slate-200 dark:border-purple-900/20">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-purple-900/20 flex items-center justify-between gap-2 mt-auto">
                <span className="text-[10px] text-slate-400 font-medium">
                  {job.date_posted ? `Posted ${new Date(job.date_posted).toLocaleDateString()}` : 'Active Posting'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewJob(job)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                    title="Preview Job Details"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(job)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                    title="Edit Job"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        
        /* TABLE VIEW */
        <div className="rounded-2xl bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#07041a] border-b border-slate-200 dark:border-purple-900/30 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Job Title</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20 text-xs">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <p>{job.title}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{job.company || 'Codigix Infotech'}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[10px]">
                        {job.dept || 'Engineering'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-gray-300 font-medium">
                      {job.location || 'Pune, India'}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-gray-300 font-medium">
                      {job.type || 'Full-time'}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-gray-300 font-medium">
                      {job.experience || job.exp || '2+ Years'}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewJob(job)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                          title="Preview"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(job)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CREATE / EDIT JOB MODAL (PORTAL) */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Fill in the details below to publish to your career portal.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-5">
              
              {/* Job Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Job Title *</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors font-medium"
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Department</label>
                  <select
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  >
                    {departments.filter(d => d !== 'All').map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Company Name</label>
                  <input 
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Codigix Infotech"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Location</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Pune, India or Remote"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Job Type</label>
                  <input 
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g. Full-time, Contract, Remote"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Experience & Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Required Experience</label>
                  <input 
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 3-6 Years"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Required Skills (Comma-separated)</label>
                  <input 
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g. React.js, Node.js, TypeScript, AWS"
                    className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Job Summary / Overview</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a brief summary of the role and key objectives..."
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs leading-relaxed transition-colors"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1.5">Key Responsibilities</label>
                <textarea 
                  rows={4}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="List bullet points of responsibilities..."
                  className="w-full bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white rounded-xl p-3 focus:border-purple-500 focus:outline-none text-xs leading-relaxed transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-purple-900/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
                >
                  <Save size={16} /> Save Job Opening
                </button>
              </div>

            </form>

          </div>
        </div>,
        document.body
      )}

      {/* 6. PREVIEW JOB MODAL (PORTAL) */}
      {previewJob && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-auto">
            
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[10px] uppercase">
                  {previewJob.dept || 'Engineering'}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {previewJob.type || 'Full-time'}</span>
              </div>
              <button
                onClick={() => setPreviewJob(null)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-snug">
              {previewJob.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-gray-300 p-4 rounded-xl bg-slate-50 dark:bg-[#07041a] border border-slate-200 dark:border-purple-900/30 mb-6">
              <span className="flex items-center gap-1.5">
                <Building2 size={15} className="text-purple-500" />
                {previewJob.company || 'Codigix Infotech'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-purple-500" />
                {previewJob.location || 'Pune, India'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-purple-500" />
                {previewJob.experience || previewJob.exp || '2+ Years'}
              </span>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Overview</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                {previewJob.description || previewJob.desc || 'No description provided.'}
              </p>
            </div>

            {/* Responsibilities */}
            {previewJob.responsibilities && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Responsibilities</h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {previewJob.responsibilities}
                </p>
              </div>
            )}

            {/* Skills */}
            {previewJob.skills && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {previewJob.skills.split(',').map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 text-xs font-semibold">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-6 border-t border-slate-200 dark:border-purple-900/30 mt-8 flex justify-end">
              <button
                onClick={() => setPreviewJob(null)}
                className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl hover:bg-purple-500 transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default JobsAdmin;
