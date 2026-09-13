import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Terminal, Fingerprint, Activity as ActivityIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function LoginScreen() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Simulate slight network delay for effect
  setTimeout(() => {
    const result = login(prn, password);

    if (!result.success) {
      setError(result.error || 'Authentication failed');
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate('/');
  }, 1200);
};

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #1B1D21 1px, transparent 1px), linear-gradient(to bottom, #1B1D21 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-[#050505]/80 to-[#050505] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md p-8"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00F0FF] blur-md opacity-20 rounded-full animate-pulse"></div>
              <ActivityIcon className="w-12 h-12 text-[#00F0FF] relative z-10" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            ROBOTICS & AUTOMATION
          </h1>
          <h2 className="text-xl tracking-wider text-gray-400 font-light">
            BATCH HUB
          </h2>
          <div className="mt-4 flex items-center justify-center space-x-3 text-xs text-[#00F0FF] font-mono tracking-widest">
            <span>SIT</span>
            <span>•</span>
            <span>B.TECH</span>
            <span>•</span>
            <span>2026–30</span>
            <span>•</span>
            <span>SEM I</span>
          </div>
        </div>

        <div className="bg-[#0B0B0D] border border-[#1B1D21] p-8 rounded-xl shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center">
                <Terminal className="w-3 h-3 mr-2" />
                PRN Identifier
              </label>
              <input
                type="text"
                value={prn}
                onChange={(e) => setPrn(e.target.value)}
                className="w-full bg-[#151619] border border-[#1B1D21] focus:border-[#00F0FF] rounded-lg px-4 py-3 text-white outline-none transition-colors duration-300 font-mono"
                placeholder="Enter your PRN"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center">
                <Fingerprint className="w-3 h-3 mr-2" />
                Access Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#151619] border border-[#1B1D21] focus:border-[#00F0FF] rounded-lg px-4 py-3 text-white outline-none transition-colors duration-300 font-mono tracking-widest"
                placeholder="Enter shared access password"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-xs font-mono bg-red-500/10 border border-red-500/20 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-[#00F0FF] text-black font-bold tracking-widest py-4 rounded-lg uppercase transition-all duration-300 relative overflow-hidden group",
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#33F3FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              )}
            >
              <span className={cn("relative z-10 flex items-center justify-center", loading ? "opacity-0" : "opacity-100")}>
                ENTER HUB
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {!loading && (
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out z-0"></div>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center flex items-center justify-center space-x-2 text-[10px] font-mono text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>SYSTEM ONLINE • ACADEMIC HUB READY</span>
        </div>
      </motion.div>
    </div>
  );
}
