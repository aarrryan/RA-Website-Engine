import React from 'react';
import { useCurrentSchedule, ScheduleStatus } from '../../hooks/useCurrentSchedule';
import { useAuth } from '../../context/AuthContext';
import { Division, TIME_SLOTS } from '../../data/timetable';
import { MapPin, User, Clock, ChevronRight, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

function DivisionCard({ division, isHighlighted }: { division: Division, isHighlighted: boolean }) {
  const schedule = useCurrentSchedule(division);

  return (
    <div className={cn(
      "relative rounded-xl border p-5 flex flex-col h-full overflow-hidden transition-all duration-300",
      isHighlighted 
        ? "bg-[#0B0B0D] border-[#00F0FF]/30 shadow-[0_0_30px_rgba(0,240,255,0.05)]" 
        : "bg-[#0B0B0D] border-[#1B1D21] opacity-60 hover:opacity-100"
    )}>
      {isHighlighted && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF] to-[#00F0FF]/0 opacity-50"></div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h3 className={cn(
          "text-lg font-bold font-mono tracking-widest flex items-center",
          isHighlighted ? "text-[#00F0FF]" : "text-gray-300"
        )}>
          <Hash className="w-4 h-4 mr-1 opacity-50" />
          {division}
        </h3>
        {isHighlighted && (
          <span className="text-[10px] font-mono bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-1 rounded uppercase tracking-wider border border-[#00F0FF]/20">
            Your Batch
          </span>
        )}
      </div>

      <div className="flex-1 space-y-6">
        {/* NOW Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-red-500/10 border border-red-500/20">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              {schedule.state === 'BEFORE_CLASSES' ? 'STARTING TODAY' : 'LIVE NOW'}
            </span>
          </div>
          
          {schedule.currentActivity ? (
            <div className="bg-[#151619] border border-[#1B1D21] rounded-lg p-4 relative group hover:border-gray-600 transition-colors">
              <div className="text-[10px] font-mono text-[#00F0FF] mb-1 flex items-center justify-between">
                <span>{schedule.currentActivity.type}</span>
                {schedule.timeRemaining !== undefined && schedule.state === 'IN_CLASS' && (
                   <span className="text-gray-500">{schedule.timeRemaining}m left</span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white mb-3 line-clamp-2">
                {schedule.currentActivity.subject}
              </h4>
              
              <div className="space-y-1.5">
                {schedule.currentActivity.faculty && (
                  <div className="flex items-center text-xs text-gray-400 font-mono">
                    <User className="w-3.5 h-3.5 mr-2 opacity-50" />
                    {schedule.currentActivity.faculty}
                  </div>
                )}
                {schedule.currentActivity.venue && (
                  <div className="flex items-center text-xs text-gray-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 mr-2 opacity-50" />
                    {schedule.currentActivity.venue}
                  </div>
                )}
                {schedule.currentSlotIndex !== -1 && (
                  <div className="flex items-center text-xs text-gray-400 font-mono">
                    <Clock className="w-3.5 h-3.5 mr-2 opacity-50" />
                    {TIME_SLOTS[schedule.currentSlotIndex].startTime} - {TIME_SLOTS[schedule.currentSlotIndex].endTime}
                  </div>
                )}
              </div>
              
              {/* Progress Bar for Active Class */}
              {schedule.state === 'IN_CLASS' && schedule.timeRemaining !== undefined && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#050505]">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#00F0FF]/50 to-[#00F0FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, Math.min(100, 100 - (schedule.timeRemaining / 55) * 100))}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#151619]/50 border border-[#1B1D21] border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-[140px]">
               <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                 {schedule.state === 'AFTER_CLASSES' || schedule.state === 'WEEKEND' ? 'NO SCHEDULE' : 'FREE PERIOD'}
               </span>
               <span className="text-sm text-gray-400">
                 {schedule.state === 'AFTER_CLASSES' || schedule.state === 'WEEKEND' ? 'Academic schedule completed.' : 'No activity scheduled.'}
               </span>
            </div>
          )}
        </div>

        {/* NEXT Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
             <div className="flex items-center justify-center w-5 h-5 rounded bg-gray-800 border border-gray-700">
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              NEXT UP
            </span>
          </div>

          {schedule.nextActivity ? (
            <div className="bg-[#050505] border border-[#1B1D21] rounded-lg p-3 relative">
               <div className="text-[9px] font-mono text-gray-500 mb-1 uppercase tracking-wider flex justify-between">
                <span>{schedule.nextActivity.type}</span>
                {schedule.nextSlotIndex !== -1 && (
                  <span>{TIME_SLOTS[schedule.nextSlotIndex].startTime}</span>
                )}
              </div>
              <h4 className="text-xs font-semibold text-gray-300 mb-2 truncate">
                {schedule.nextActivity.subject}
              </h4>
              <div className="flex items-center space-x-3">
                {schedule.nextActivity.venue && (
                  <div className="flex items-center text-[10px] text-gray-500 font-mono">
                    <MapPin className="w-3 h-3 mr-1 opacity-50" />
                    {schedule.nextActivity.venue}
                  </div>
                )}
              </div>
            </div>
          ) : (
             <div className="bg-[#050505] border border-[#1B1D21] border-dashed rounded-lg p-3 text-center">
               <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                 No further activities
               </span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DivisionCards() {
  const { student } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DivisionCard division="RA-A1" isHighlighted={student?.division === 'RA-A1'} />
      <DivisionCard division="RA-A2" isHighlighted={student?.division === 'RA-A2'} />
      <DivisionCard division="RA-A3" isHighlighted={student?.division === 'RA-A3'} />
    </div>
  );
}
