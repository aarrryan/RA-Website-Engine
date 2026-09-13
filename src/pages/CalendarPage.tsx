import React from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { academicCalendar } from '../data/calendar';
import { format, parseISO, isAfter, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Flag, Clock } from 'lucide-react';

export function CalendarPage() {
  const sortedEvents = [...academicCalendar].sort((a, b) => 
    parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
  );

  const today = startOfDay(new Date());

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-[#1B1D21] pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">ACADEMIC CALENDAR</h1>
          <p className="text-sm text-gray-400 mt-1">AY 2026-27 | Semester I</p>
        </div>

        <div className="bg-[#101114] border border-[#1B1D21] rounded-xl overflow-hidden p-6 relative">
          <div className="absolute top-0 left-8 bottom-0 w-px bg-[#1B1D21] z-0 hidden sm:block"></div>
          
          <div className="space-y-8 relative z-10">
            {sortedEvents.map((event, index) => {
              const eventDate = parseISO(event.startDate);
              const isPast = isAfter(today, eventDate);
              const isCurrent = eventDate.getTime() === today.getTime();

              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex flex-col sm:flex-row gap-4 sm:gap-8 group ${isPast ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div className="sm:w-32 shrink-0 flex sm:justify-end items-start pt-1">
                    <div className="text-right">
                      <div className={`font-mono font-bold ${isCurrent ? 'text-[#00F0FF]' : 'text-white'}`}>
                        {format(eventDate, 'MMM dd')}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {format(eventDate, 'yyyy')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex relative items-start justify-center pt-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      isCurrent ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_10px_#00F0FF]' :
                      event.isImportant ? 'bg-[#7000FF] border-[#7000FF]' : 'bg-[#1B1D21] border-[#101114]'
                    } z-10 transition-colors duration-300`}></div>
                  </div>

                  <div className={`flex-1 bg-[#151619] border ${isCurrent ? 'border-[#00F0FF]/50' : 'border-[#1B1D21] group-hover:border-gray-700'} rounded-lg p-4 transition-all`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-lg font-medium ${isCurrent ? 'text-white' : 'text-gray-200'}`}>
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs font-mono text-gray-400">
                          <span className={`px-2 py-1 rounded bg-[#0B0B0D] border border-[#1B1D21] ${
                            event.type === 'EXAM' ? 'text-red-400' :
                            event.type === 'HOLIDAY' ? 'text-green-400' :
                            event.type === 'TEACHING' ? 'text-[#00F0FF]' : 'text-gray-400'
                          }`}>
                            {event.type}
                          </span>
                          {event.endDate && (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Until {format(parseISO(event.endDate), 'MMM dd')}
                            </span>
                          )}
                        </div>
                      </div>
                      {event.isImportant && (
                        <Flag className="w-4 h-4 text-[#7000FF] shrink-0" />
                      )}
                    </div>
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
