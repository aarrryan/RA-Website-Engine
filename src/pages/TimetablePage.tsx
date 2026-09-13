import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { TIME_SLOTS, DayOfWeek, Period, Division } from '../data/timetable';
import { getActivityForSlot, getAbsoluteOverrides, AbsoluteOverride } from '../services/scheduleService';
import { format, startOfWeek, addDays, parse } from 'date-fns';
import { Clock, MapPin, User, Calendar as CalendarIcon, Info } from 'lucide-react';

export function TimetablePage() {
  const { student } = useAuth();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedDivision, setSelectedDivision] = useState<Division>(student?.division || 'RA-A1');

  if (!student) return null;

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const divisions: Division[] = ['RA-A1', 'RA-A2', 'RA-A3'];

  // Simulate a current week's dates to allow accurate service processing
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  
  const selectedDate = addDays(weekStart, days.indexOf(selectedDay));

  let schedule: (Period | AbsoluteOverride)[] = TIME_SLOTS.map((slot, index) => ({
    slot,
    activity: getActivityForSlot(selectedDate, selectedDivision, index)
  }));

  const overrides = getAbsoluteOverrides(selectedDate, selectedDivision);
  
  // Inject absolute overrides into schedule
  overrides.forEach(override => {
    schedule.push(override);
  });
  
  // Sort schedule chronologically based on startTime
  schedule.sort((a, b) => {
    const aStart = 'slot' in a ? a.slot.startTime : a.startTime;
    const bStart = 'slot' in b ? b.slot.startTime : b.startTime;
    return aStart.localeCompare(bStart);
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-[#1B1D21] pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white">TIMETABLE</h1>
            <p className="text-sm text-gray-400 mt-1">Priority-Engine Active</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex bg-[#101114] p-1 rounded-lg border border-[#1B1D21] overflow-x-auto w-fit">
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDivision === div
                      ? 'bg-[#7000FF]/10 text-[#7000FF]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
            <div className="flex bg-[#101114] p-1 rounded-lg border border-[#1B1D21] overflow-x-auto w-fit">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDay === day
                      ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {day.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#101114] border border-[#1B1D21] rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-[#1B1D21]">
            {schedule.map((item, index) => {
              const isBreak = item.activity?.type === 'Break' || item.activity?.type === 'Free Period';
              const startTime = 'slot' in item ? item.slot.startTime : item.startTime;
              const endTime = 'slot' in item ? item.slot.endTime : item.endTime;
              const isOverride = !('slot' in item);
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex flex-col sm:flex-row p-4 sm:p-6 transition-colors hover:bg-[#151619] ${
                    isBreak ? 'bg-[#0B0B0D]/50' : ''
                  } ${isOverride ? 'border-l-4 border-yellow-500 bg-yellow-500/5' : ''}`}
                >
                  <div className="sm:w-48 mb-4 sm:mb-0 shrink-0 flex items-center text-sm font-mono text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {startTime} - {endTime}
                  </div>
                  
                  <div className="flex-1">
                    {item.activity ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className={`font-semibold ${isBreak ? 'text-gray-500' : isOverride ? 'text-yellow-500' : 'text-[#00F0FF]'} text-lg`}>
                            {item.activity.subject}
                          </h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-xs text-gray-400 font-mono">
                            {item.activity.venue && (
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {item.activity.venue}
                              </div>
                            )}
                            {item.activity.faculty && (
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {item.activity.faculty}
                              </div>
                            )}
                            <div className="flex items-center text-[#7000FF]">
                              <Info className="w-3 h-3 mr-1" />
                              {item.activity.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600 font-mono text-sm h-full flex items-center">
                        NO SCHEDULED ACTIVITY
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
