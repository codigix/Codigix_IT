import React from 'react';
import { Phone, Mail, MapPin, Globe, MessageSquare, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactFormSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12">
      
      {/* Left: Form */}
      <div className="lg:w-2/3 bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-8">Send Us a Message</h3>
        
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-gray-300">Full Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter your full name" className="contact-input w-full rounded-lg px-4 py-3 text-[12px]" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-gray-300">Email Address <span className="text-red-500">*</span></label>
              <input type="email" placeholder="Enter your email" className="contact-input w-full rounded-lg px-4 py-3 text-[12px]" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-gray-300">Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" className="contact-input w-full rounded-lg px-4 py-3 text-[12px]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-gray-300">Company Name</label>
              <input type="text" placeholder="Enter your company name" className="contact-input w-full rounded-lg px-4 py-3 text-[12px]" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-gray-300">Subject <span className="text-red-500">*</span></label>
            <input type="text" placeholder="What is this regarding?" className="contact-input w-full rounded-lg px-4 py-3 text-[12px]" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-gray-300">Message <span className="text-red-500">*</span></label>
            <textarea placeholder="Tell us about your project or requirement..." rows="5" className="contact-input w-full rounded-lg px-4 py-3 text-[12px] resize-none" required></textarea>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <button type="button" className="w-full sm:w-auto px-8 py-3 bg-[#7e22ce] hover:bg-[#9333ea] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(126,34,206,0.4)] transition-all flex items-center justify-center gap-2">
              Send Message <ArrowRight size={14} />
            </button>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
               <Lock size={12} /> We never share your information with third parties.
            </div>
          </div>
        </form>
      </div>

      {/* Right: Contact Details */}
      <div className="lg:w-1/3 bg-[#050112] border border-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-8">Get in Touch</h3>
        
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Phone size={16} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white mb-1">Phone</h4>
              <p className="text-[12px] text-gray-300 mb-0.5">+91 12345 67890</p>
              <p className="text-[9px] text-gray-500">Mon - Sat: 9:30 AM - 6:30 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white mb-1">Email</h4>
              <p className="text-[12px] text-gray-300 mb-0.5">info@codigixinfotech.com</p>
              <p className="text-[9px] text-gray-500">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white mb-1">Address</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Codigix Infotech Pvt. Ltd.<br/>
                Office No. 501, 5th Floor,<br/>
                Tech Park One, Kharadi,<br/>
                Pune - 411014, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white mb-1">Skype</h4>
              <p className="text-[12px] text-gray-300">codigix.infotech</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Globe size={16} className="text-purple-400" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-white mb-1">Website</h4>
              <p className="text-[12px] text-gray-300">www.codigixinfotech.com</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactFormSection;
