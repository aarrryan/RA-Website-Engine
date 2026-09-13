import React from 'react';
import { Calendar, FileText, Beaker, Database, Bell, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: 'Full Timetable', path: '/timetable', icon: LayoutGrid, color: 'text-[#00F0FF]' },
  { label: 'Calendar', path: '/calendar', icon: Calendar, color: 'text-[#7000FF]' },
  { label: 'Assessments', path: '/evaluations', icon: FileText, color: 'text-red-400' },
  { label: 'Lab Schedules', path: '/labs', icon: Beaker, color: 'text-green-400' },
  { label: 'Announcements', path: '/announcements', icon: Bell, color: 'text-yellow-400' },
  { label: 'Resources', path: '/resources', icon: Database, color: 'text-purple-400' },
];

export function QuickAccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0B0D] border border-[#1B1D21] rounded-xl p-5 sm:p-6 h-full">
      <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6">
        Quick Access
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action, i) => (
          <motion.button
            key={action.label}
            onClick={() => navigate(action.path)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-4 bg-[#151619] border border-[#1B1D21] rounded-lg hover:border-gray-600 hover:bg-[#1A1D24] transition-all group"
          >
            <action.icon className={`w-6 h-6 mb-3 opacity-70 group-hover:opacity-100 ${action.color} transition-opacity`} />
            <span className="text-[10px] font-mono text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors text-center">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
