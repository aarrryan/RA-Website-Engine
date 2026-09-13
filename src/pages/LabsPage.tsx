import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { tinkerLabSchedule, makerLabSchedule } from '../data/labs';
import { Beaker, Settings, CheckCircle2, Circle } from 'lucide-react';
import { format, parseISO, isBefore, isSameDay } from 'date-fns';

export function LabsPage() {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState<'tinker' | 'maker'>('tinker');

  if (!student) return null;

  const today = new Date();

  // Process Tinker Lab Data
  const myTinkerSessions = tinkerLabSchedule.filter(s => 
    s.wednesday.includes(student.division) || s.thursday.includes(student.division)
  );

  // Process Maker Lab Data
  const myMakerSessions = makerLabSchedule.filter(s => 
    s.divisions.includes(student.division)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-[#1B1D21] pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">LABORATORY SCHEDULES</h1>
          <p className="text-sm text-gray-400 mt-1">Tinker, IDEA, and Maker Lab Rotations for {student.division}</p>
        </div>

        <div className="flex bg-[#101114] p-1 rounded-lg border border-[#1B1D21] w-fit">
          <button
            onClick={() => setActiveTab('tinker')}
            className={`flex items-center px-6 py-2 text-xs font-mono font-medium rounded-md transition-all ${
              activeTab === 'tinker'
                ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Beaker className="w-4 h-4 mr-2" />
            TINKER & IDEA LAB
          </button>
          <button
            onClick={() => setActiveTab('maker')}
            className={`flex items-center px-6 py-2 text-xs font-mono font-medium rounded-md transition-all ${
              activeTab === 'maker'
                ? 'bg-[#7000FF]/10 text-[#7000FF]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            MAKER LAB
          </button>
        </div>

        <div className="bg-[#101114] border border-[#1B1D21] rounded-xl overflow-hidden">
          {activeTab === 'tinker' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-white mb-6">Your Tinker Lab Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myTinkerSessions.map((session, i) => {
                  const date = parseISO(session.dateStr);
                  const isPast = isBefore(date, today) && !isSameDay(date, today);
                  const isToday = isSameDay(date, today);
                  const dayAssigned = session.wednesday.includes(student.division) ? 'Wednesday' : 'Thursday';

                  return (
                    <motion.div
                      key={session.week}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        isToday ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50' : 
                        isPast ? 'bg-[#0B0B0D] border-[#1B1D21] opacity-50' : 
                        'bg-[#151619] border-[#1B1D21]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-500">WEEK {session.week}</span>
                        {isPast ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className={`text-xl font-bold ${isToday ? 'text-[#00F0FF]' : 'text-white'}`}>
                        {format(date, 'MMM dd')}
                      </div>
                      <div className="text-sm text-gray-400 mt-1 font-mono">
                        {dayAssigned} Session
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'maker' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-white mb-6">Your Maker Lab Rotations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myMakerSessions.map((session, i) => {
                  const date = parseISO(session.dateStr);
                  const isPast = isBefore(date, today) && !isSameDay(date, today);
                  const isToday = isSameDay(date, today);

                  return (
                    <motion.div
                      key={session.dateStr}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        isToday ? 'bg-[#7000FF]/10 border-[#7000FF]/50' : 
                        isPast ? 'bg-[#0B0B0D] border-[#1B1D21] opacity-50' : 
                        'bg-[#151619] border-[#1B1D21]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-500">FRIDAY SLOT 2</span>
                        {isPast ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className={`text-xl font-bold ${isToday ? 'text-[#7000FF]' : 'text-white'}`}>
                        {format(date, 'MMM dd, yyyy')}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
