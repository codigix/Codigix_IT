import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Loader2,
  Plus
} from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#1A1C2E] flex items-center justify-center p-4 font-admin relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Abstract Shapes */}
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[120%] bg-[#252841] -rotate-[35deg] rounded-[4rem]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-[#252841] -rotate-[35deg] rounded-[4rem]"></div>
        
        {/* Plus Icons */}
        <Plus className="absolute top-[10%] left-[15%] text-slate-700 w-6 h-6 opacity-40" />
        <Plus className="absolute bottom-[20%] left-[5%] text-slate-700 w-4 h-4 opacity-40" />
        <Plus className="absolute top-[30%] right-[10%] text-slate-700 w-5 h-5 opacity-40" />
        <Plus className="absolute bottom-[40%] right-[15%] text-slate-700 w-4 h-4 opacity-40" />
        
        {/* Blurry Circles */}
        <div className="absolute top-[20%] left-[25%] w-4 h-4 rounded-full bg-slate-700/30 blur-[2px]"></div>
        <div className="absolute bottom-[30%] right-[25%] w-8 h-8 rounded-full bg-slate-700/30 blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white tracking-tight italic">gratafy<span className="text-xs align-top ml-0.5">TM</span></h1>
        </div>

        <div className="bg-[#2A2D45]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs" 
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="overflow-hidden rounded-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#E9F0FE] border-none p-2 mb-3 text-slate-900 text-sm  placeholder:text-slate-500   outline-none transition-all border-b border-slate-200"
                placeholder="ADMIN@GRATAFY.COM"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#E9F0FE] border-none p-2 text-slate-900 text-sm  placeholder:text-slate-500 uppercase tracking-wider outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-[#FF1F8B] py-4 rounded-xl  text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Log In</span>
                    <div className="bg-[#00D1FF] rounded-full p-0.5">
                      <ArrowRight className="w-3 h-3 text-white stroke-[4]" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="#" className="text-[10px]  text-[#FF1F8B] uppercase tracking-[0.2em] hover:text-[#FF1F8B]/80 transition-colors">
            Forgot your password?
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
