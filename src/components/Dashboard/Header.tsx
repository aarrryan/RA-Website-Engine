import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Activity, User, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { student, logout } = useAuth();
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'TIMETABLE', path: '/timetable' },
    { name: 'CALENDAR', path: '/calendar' },
    { name: 'EVALUATIONS', path: '/evaluations' },
    { name: 'LABS', path: '/labs' },
    { name: 'RESOURCES', path: '/resources' },
    { name: 'ANNOUNCEMENTS', path: '/announcements' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#1B1D21] px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#101114] border border-[#1B1D21]">
            <Activity className="w-4 h-4 text-[#00F0FF]" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-[#050505]"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-widest text-white uppercase">RA BATCH HUB</h1>
            <p className="text-[10px] font-mono text-gray-500 tracking-wider">SIT • PUNE</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-gray-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors hover:text-white ${
                location.pathname === link.path ? 'text-[#00F0FF]' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-mono text-white">{format(time, 'HH:mm:ss')}</p>
            <p className="text-[10px] font-mono text-gray-500 uppercase">{format(time, 'z')}</p>
          </div>

          <div className="flex items-center space-x-3 group cursor-pointer relative">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white">{student?.name.split(' ')[0]}</p>
              <p className="text-[10px] font-mono text-[#00F0FF]">{student?.division}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#151619] border border-[#1B1D21] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00F0FF] transition-all">
              <User className="w-4 h-4" />
            </div>
            
            {/* Simple Dropdown on hover */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#0B0B0D] border border-[#1B1D21] rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
              <div className="p-3 border-b border-[#1B1D21]">
                <p className="text-xs text-white truncate">{student?.name}</p>
                <p className="text-[10px] font-mono text-gray-500 mt-1">PRN: {student?.prn}</p>
              </div>
              <button 
                onClick={logout}
                className="w-full text-left px-3 py-2 text-xs font-mono text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center transition-colors"
              >
                <LogOut className="w-3 h-3 mr-2" />
                DISCONNECT
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
