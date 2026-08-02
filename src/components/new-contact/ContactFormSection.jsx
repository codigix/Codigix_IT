import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, MessageSquare, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import config from '../../config';
import { trackContactSubmit } from '../../utils/analytics';

const ContactFormSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    cfName: '',
    cfEmail: '',
    cfPhone: '',
    cfSubject: '',
    cfMessage: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send contact inquiry');
      }

      trackContactSubmit(formData);
      setSubmitted(true);
      setFormData({
        cfName: '',
        cfEmail: '',
        cfPhone: '',
        cfSubject: '',
        cfMessage: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12">
      
      {/* Left: Form */}
      <div className="lg:w-2/3 bg-white dark:bg-[#050112] border border-slate-200/90 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl flex flex-col text-left">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">Send Us a Message</h3>
        
        {submitted ? (
          <div className="p-8 my-auto bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/50 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
            <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
            <p className="text-xs text-slate-600 dark:text-gray-300 max-w-md leading-relaxed">
              Thank you for reaching out to Codigix Infotech. Our solution team has received your request and will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="p-3 text-xs bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-xl text-red-650 dark:text-red-400 font-bold">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-gray-300">Full Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  name="cfName"
                  value={formData.cfName}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  className="contact-input w-full rounded-xl px-4 py-3 text-[12px] shadow-xs bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-gray-300">Email Address <span className="text-rose-500">*</span></label>
                <input 
                  type="email" 
                  name="cfEmail"
                  value={formData.cfEmail}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className="contact-input w-full rounded-xl px-4 py-3 text-[12px] shadow-xs bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-gray-300">Phone Number</label>
                <input 
                  type="tel" 
                  name="cfPhone"
                  value={formData.cfPhone}
                  onChange={handleChange}
                  placeholder="Enter your phone number" 
                  className="contact-input w-full rounded-xl px-4 py-3 text-[12px] shadow-xs bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-gray-300">Subject <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  name="cfSubject"
                  value={formData.cfSubject}
                  onChange={handleChange}
                  placeholder="What is this regarding?" 
                  className="contact-input w-full rounded-xl px-4 py-3 text-[12px] shadow-xs bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800" 
                  required 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-gray-300">Message <span className="text-rose-500">*</span></label>
              <textarea 
                name="cfMessage"
                value={formData.cfMessage}
                onChange={handleChange}
                placeholder="Tell us about your project or requirement..." 
                rows="5" 
                className="contact-input w-full rounded-xl px-4 py-3 text-[12px] resize-none shadow-xs bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800" 
                required
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white text-[12px] font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={14} />
              </button>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                 <Lock size={12} className="text-purple-600 dark:text-purple-400" /> We never share your information with third parties.
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Right: Contact Details */}
      <div className="lg:w-1/3 bg-white dark:bg-[#050112] border border-slate-200/90 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm dark:shadow-xl flex flex-col text-left">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">Get in Touch</h3>
        
        <div className="flex flex-col gap-7 flex-1">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center shrink-0">
              <Phone size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold text-slate-900 dark:text-white mb-0.5">Phone</h4>
              <p className="text-[12px] font-bold text-slate-800 dark:text-gray-200 mb-0.5">+91 9112706604</p>
              <p className="text-[9px] text-slate-500 dark:text-gray-400 font-medium">Mon - Sat: 9:30 AM - 6:30 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold text-slate-900 dark:text-white mb-0.5">Email</h4>
              <p className="text-[12px] font-bold text-slate-800 dark:text-gray-200 mb-0.5">info@codigixinfotech.com</p>
              <p className="text-[9px] text-slate-500 dark:text-gray-400 font-medium">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold text-slate-900 dark:text-white mb-0.5">Address</h4>
              <p className="text-[12px] font-bold text-slate-800 dark:text-gray-200 mb-0.5">Office No: 514, 5th Floor, Brahma Sky Uzuri, MIDC, Pimpri-Chinchwad, Maharashtra 411018.</p>
              <p className="text-[9px] text-slate-500 dark:text-gray-400 font-medium">Headquarters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
