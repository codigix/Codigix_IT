import React, { useState } from 'react';
import { 
  X, User, Briefcase, Calendar, MapPin, Upload, FileText, CheckCircle2, 
  ArrowRight, ArrowLeft, Bookmark, ShieldCheck, Mail, Phone, Code2, GraduationCap, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobApplyModal = ({ isOpen, onClose, job }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal & Professional
    fullName: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    city: '',
    state: '',
    country: '',
    dob: '',
    gender: 'Male',
    position: job?.title || 'Senior Full Stack Developer',
    department: job?.dept || 'Engineering',
    experience: job?.exp || '3-5 Years',
    currentCompany: '',
    currentDesignation: '',
    noticePeriod: '',

    // Step 2: Resume & Professional
    resumeFile: null,
    keySkills: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverNote: '',

    // Step 3: Education Details
    highestQualification: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science & Engineering',
    university: '',
    passingYear: '2022',
    cgpa: '',

    // Step 4: Declaration
    termsAgreed: false
  });

  if (!isOpen) return null;

  const defaultJob = {
    title: job?.title || 'Senior Full Stack Developer',
    location: job?.location || 'Pune, Maharashtra',
    dept: job?.dept || 'Engineering',
    type: job?.type || 'Full Time',
    exp: job?.exp || '3 – 5 Years',
    openings: '3',
    postedOn: '20 May 2025',
    jobId: 'COD-ENG-245'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resumeFile: e.target.files[0] }));
    }
  };

  const steps = [
    { num: 1, label: 'Personal Details' },
    { num: 2, label: 'Professional Details' },
    { num: 3, label: 'Education Details' },
    { num: 4, label: 'Review & Submit' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-[1100px] bg-[#070417] border border-gray-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-800/80 bg-[#09051f]">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Apply for this Job</h2>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-800/60 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            {/* Success State */}
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center mb-6 text-purple-400">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Submitted Successfully!</h3>
                <p className="text-gray-400 text-sm max-w-md mb-8">
                  Thank you for applying for the <span className="text-purple-400 font-semibold">{defaultJob.title}</span> position at Codigix. Our HR team will review your application and contact you soon.
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-[#7e22ce] hover:bg-[#9333ea] text-white text-xs font-semibold rounded-lg shadow-lg transition-all"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <>
                {/* Stepper Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between relative">
                    {steps.map((s, idx) => (
                      <div key={s.num} className="flex flex-col items-center z-10 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          currentStep >= s.num 
                            ? 'bg-[#7e22ce] text-white shadow-[0_0_15px_rgba(126,34,206,0.6)] border border-purple-400' 
                            : 'bg-gray-800/80 text-gray-500 border border-gray-700'
                        }`}>
                          {currentStep > s.num ? <Check size={14} /> : s.num}
                        </div>
                        <span className={`text-[11px] font-medium mt-2 transition-colors ${
                          currentStep === s.num ? 'text-white' : 'text-gray-500'
                        }`}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                    {/* Stepper Connecting Lines */}
                    <div className="absolute top-4 left-6 right-6 h-[2px] bg-gray-800 -z-0">
                      <div 
                        className="h-full bg-gradient-to-r from-[#7e22ce] to-[#9333ea] transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Form Area (8 Cols) */}
                  <div className="lg:col-span-8 space-y-6">
                    <form onSubmit={handleNext}>
                      {/* STEP 1: Personal & Primary Professional Details */}
                      {currentStep === 1 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          {/* Personal Information Box */}
                          <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                              <User size={16} />
                              <span>Personal Information</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  placeholder="Enter your full name" 
                                  className="modal-input w-full"
                                  value={formData.fullName}
                                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                                  required 
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input 
                                  type="email" 
                                  placeholder="Enter your email address" 
                                  className="modal-input w-full"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  required 
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                                <div className="flex gap-2">
                                  <select 
                                    className="modal-input modal-select w-20 text-center shrink-0"
                                    value={formData.phoneCode}
                                    onChange={(e) => handleInputChange('phoneCode', e.target.value)}
                                  >
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+971">+971</option>
                                  </select>
                                  <input 
                                    type="tel" 
                                    placeholder="Enter mobile number" 
                                    className="modal-input w-full flex-1"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    required 
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Current Location <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-3 gap-2">
                                  <select 
                                    className="modal-input modal-select"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                  >
                                    <option value="">City</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Delhi">Delhi</option>
                                  </select>
                                  <select 
                                    className="modal-input modal-select"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                  >
                                    <option value="">State</option>
                                    <option value="Maharashtra">MH</option>
                                    <option value="Karnataka">KA</option>
                                    <option value="Delhi">DL</option>
                                  </select>
                                  <select 
                                    className="modal-input modal-select"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                  >
                                    <option value="">Country</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                                <div className="relative">
                                  <input 
                                    type="date" 
                                    className="modal-input w-full pr-10 text-gray-300"
                                    value={formData.dob}
                                    onChange={(e) => handleInputChange('dob', e.target.value)}
                                    required 
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-2">Gender <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-4 pt-1">
                                  {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => (
                                    <label key={g} className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                                      <input 
                                        type="radio" 
                                        name="gender" 
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        className="modal-radio"
                                      />
                                      <span>{g}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Professional Details Box */}
                          <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                              <Briefcase size={16} />
                              <span>Professional Details</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Position Applying For <span className="text-red-500">*</span></label>
                                <select 
                                  className="modal-input modal-select w-full"
                                  value={formData.position}
                                  onChange={(e) => handleInputChange('position', e.target.value)}
                                >
                                  <option value="Senior Full Stack Developer">Senior Full Stack Developer</option>
                                  <option value="React.js Developer">React.js Developer</option>
                                  <option value="UI/UX Designer">UI/UX Designer</option>
                                  <option value="Digital Marketing Executive">Digital Marketing Executive</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Department <span className="text-red-500">*</span></label>
                                <select 
                                  className="modal-input modal-select w-full"
                                  value={formData.department}
                                  onChange={(e) => handleInputChange('department', e.target.value)}
                                >
                                  <option value="Engineering">Engineering</option>
                                  <option value="Design">Design</option>
                                  <option value="Marketing">Marketing</option>
                                  <option value="Sales">Sales</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Experience <span className="text-red-500">*</span></label>
                                <select 
                                  className="modal-input modal-select w-full"
                                  value={formData.experience}
                                  onChange={(e) => handleInputChange('experience', e.target.value)}
                                >
                                  <option value="0 - 1 Years">0 – 1 Years</option>
                                  <option value="1 - 3 Years">1 – 3 Years</option>
                                  <option value="3 - 5 Years">3 – 5 Years</option>
                                  <option value="5+ Years">5+ Years</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Current Company</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter current company" 
                                  className="modal-input w-full"
                                  value={formData.currentCompany}
                                  onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Current Designation</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter current designation" 
                                  className="modal-input w-full"
                                  value={formData.currentDesignation}
                                  onChange={(e) => handleInputChange('currentDesignation', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Notice Period <span className="text-red-500">*</span></label>
                                <select 
                                  className="modal-input modal-select w-full"
                                  value={formData.noticePeriod}
                                  onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                                  required
                                >
                                  <option value="">Select notice period</option>
                                  <option value="Immediate">Immediate Joiner</option>
                                  <option value="15 Days">15 Days</option>
                                  <option value="30 Days">30 Days</option>
                                  <option value="60 Days">60 Days</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Resume & Professional Portfolio */}
                      {currentStep === 2 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                              <FileText size={16} />
                              <span>Resume & Attachments</span>
                            </div>

                            {/* Resume Upload Box */}
                            <div>
                              <label className="block text-[11px] text-gray-300 mb-2">Upload Resume / CV (PDF, DOCX) <span className="text-red-500">*</span></label>
                              <label className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/70 bg-purple-950/10 hover:bg-purple-950/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all">
                                <Upload size={32} className="text-purple-400 mb-2" />
                                <span className="text-xs font-semibold text-white">
                                  {formData.resumeFile ? formData.resumeFile.name : 'Click to Upload or Drag & Drop'}
                                </span>
                                <span className="text-[10px] text-gray-500 mt-1">Maximum file size: 10MB</span>
                                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                              </label>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">LinkedIn Profile URL</label>
                                <input 
                                  type="url" 
                                  placeholder="https://linkedin.com/in/username" 
                                  className="modal-input w-full"
                                  value={formData.linkedinUrl}
                                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Portfolio / GitHub URL</label>
                                <input 
                                  type="url" 
                                  placeholder="https://github.com/username" 
                                  className="modal-input w-full"
                                  value={formData.portfolioUrl}
                                  onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-gray-300 mb-1">Key Skills & Technologies</label>
                              <input 
                                type="text" 
                                placeholder="e.g. React, Node.js, TypeScript, PostgreSQL, Tailwind" 
                                className="modal-input w-full"
                                value={formData.keySkills}
                                onChange={(e) => handleInputChange('keySkills', e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-gray-300 mb-1">Cover Note / Why Codigix?</label>
                              <textarea 
                                rows="3"
                                placeholder="Briefly tell us why you are a great fit for this role..." 
                                className="modal-input w-full resize-none"
                                value={formData.coverNote}
                                onChange={(e) => handleInputChange('coverNote', e.target.value)}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: Education Details */}
                      {currentStep === 3 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                              <GraduationCap size={16} />
                              <span>Educational Qualifications</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Highest Qualification <span className="text-red-500">*</span></label>
                                <select 
                                  className="modal-input modal-select w-full"
                                  value={formData.highestQualification}
                                  onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                                >
                                  <option value="Bachelor of Technology (B.Tech)">Bachelor of Technology (B.Tech)</option>
                                  <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                                  <option value="Bachelor of Science (B.Sc CS)">Bachelor of Science (B.Sc CS)</option>
                                  <option value="Master of Technology (M.Tech)">Master of Technology (M.Tech)</option>
                                  <option value="Diploma in Engineering">Diploma in Engineering</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">Specialization / Branch <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. Computer Science, IT" 
                                  className="modal-input w-full"
                                  value={formData.specialization}
                                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                                  required 
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">College / University <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  placeholder="Enter your university or college name" 
                                  className="modal-input w-full"
                                  value={formData.university}
                                  onChange={(e) => handleInputChange('university', e.target.value)}
                                  required 
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] text-gray-300 mb-1">Year of Passing</label>
                                  <select 
                                    className="modal-input modal-select w-full"
                                    value={formData.passingYear}
                                    onChange={(e) => handleInputChange('passingYear', e.target.value)}
                                  >
                                    {['2024', '2023', '2022', '2021', '2020', '2019', '2018'].map(y => (
                                      <option key={y} value={y}>{y}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[11px] text-gray-300 mb-1">CGPA / %</label>
                                  <input 
                                    type="text" 
                                    placeholder="e.g. 8.5 or 82%" 
                                    className="modal-input w-full"
                                    value={formData.cgpa}
                                    onChange={(e) => handleInputChange('cgpa', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: Review & Submit */}
                      {currentStep === 4 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 sm:p-6 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-purple-400 font-bold text-sm flex items-center gap-2">
                                <CheckCircle2 size={16} /> Summary Review
                              </h3>
                              <span className="text-[10px] text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-800/40">Ready to Submit</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-300 bg-black/30 p-4 rounded-lg border border-gray-800">
                              <div><span className="text-gray-500">Name:</span> {formData.fullName || 'N/A'}</div>
                              <div><span className="text-gray-500">Email:</span> {formData.email || 'N/A'}</div>
                              <div><span className="text-gray-500">Phone:</span> {formData.phoneCode} {formData.phone || 'N/A'}</div>
                              <div><span className="text-gray-500">Location:</span> {formData.city ? `${formData.city}, ${formData.state}` : 'N/A'}</div>
                              <div><span className="text-gray-500">Applying For:</span> {formData.position}</div>
                              <div><span className="text-gray-500">Notice Period:</span> {formData.noticePeriod || 'Immediate'}</div>
                              <div><span className="text-gray-500">Education:</span> {formData.highestQualification}</div>
                              <div><span className="text-gray-500">Resume:</span> {formData.resumeFile ? formData.resumeFile.name : 'Attached'}</div>
                            </div>

                            <label className="flex items-start gap-2 pt-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={formData.termsAgreed}
                                onChange={(e) => handleInputChange('termsAgreed', e.target.checked)}
                                className="modal-radio mt-0.5"
                                required
                              />
                              <span className="text-[11px] text-gray-400 leading-snug">
                                I certify that all details provided in this application are accurate and true to the best of my knowledge.
                              </span>
                            </label>
                          </div>
                        </motion.div>
                      )}

                      {/* Bottom Action Controls */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-800/80 mt-6">
                        <button 
                          type="button" 
                          onClick={handleSaveDraft}
                          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-gray-900/60 border border-gray-800 hover:border-gray-700 px-4 py-2.5 rounded-lg"
                        >
                          <Bookmark size={14} />
                          <span>{isSaved ? 'Draft Saved!' : 'Save as Draft'}</span>
                        </button>

                        <div className="text-xs text-gray-500 font-medium">
                          Step {currentStep} of 4
                        </div>

                        <div className="flex items-center gap-3">
                          {currentStep > 1 && (
                            <button 
                              type="button"
                              onClick={handlePrev}
                              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
                            >
                              <ArrowLeft size={14} /> Previous
                            </button>
                          )}
                          <button 
                            type="submit"
                            className="px-6 py-2.5 bg-gradient-to-r from-[#7e22ce] to-[#9333ea] hover:from-[#9333ea] hover:to-[#a855f7] text-white text-xs font-semibold rounded-lg shadow-[0_0_20px_rgba(126,34,206,0.5)] transition-all flex items-center gap-2"
                          >
                            <span>{currentStep === 4 ? 'Submit Application' : 'Next Step'}</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Right Job Summary Sidebar (4 Cols) */}
                  <div className="lg:col-span-4 space-y-5">
                    {/* Job Summary Card */}
                    <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 space-y-4">
                      <h4 className="text-sm font-bold text-white tracking-wide">Job Summary</h4>

                      <div className="flex items-start gap-3 pb-4 border-b border-gray-800">
                        <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                          <Code2 size={20} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white leading-snug">{defaultJob.title}</h5>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} className="text-purple-400" />
                            {defaultJob.location}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1">
                            <span>{defaultJob.dept}</span>
                            <span>|</span>
                            <span>{defaultJob.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5"><Briefcase size={13} className="text-gray-500" /> Experience</span>
                          <span className="font-semibold text-white">{defaultJob.exp}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5"><User size={13} className="text-gray-500" /> Openings</span>
                          <span className="font-semibold text-white">{defaultJob.openings}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gray-500" /> Posted On</span>
                          <span className="font-semibold text-white">{defaultJob.postedOn}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5"><FileText size={13} className="text-gray-500" /> Job ID</span>
                          <span className="font-semibold text-white">{defaultJob.jobId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-[#050114] border border-gray-800/80 rounded-xl p-5 space-y-3">
                      <h4 className="text-xs font-bold text-purple-300">Need Help?</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        If you face any issue while applying, reach out to our HR team.
                      </p>
                      
                      <div className="space-y-2 text-xs pt-1">
                        <a href="mailto:hr@codigixinfotech.com" className="flex items-center gap-2 text-purple-400 hover:underline">
                          <Mail size={14} /> hr@codigixinfotech.com
                        </a>
                        <a href="tel:+911234567890" className="flex items-center gap-2 text-purple-400 hover:underline">
                          <Phone size={14} /> +91 12345 67890
                        </a>
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-500 border-t border-gray-800/80">
                        <ShieldCheck size={14} className="text-purple-400 shrink-0" />
                        <span>Your information is secure and confidential.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JobApplyModal;
