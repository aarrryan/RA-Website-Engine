import React from 'react';
import { useCurrentSchedule } from '../../hooks/useCurrentSchedule';
import { useAuth } from '../../context/AuthContext';
import { TIME_SLOTS } from '../../data/timetable';
import { MapPin, User, Clock, ChevronRight, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

function DivisionCard({
  division,
  isHighlighted,
}: {
  division: 'RA-A1' | 'RA-A2' | 'RA-A3';
  isHighlighted: boolean;
}) {
  const schedule = useCurrentSchedule(division);

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-5 flex flex-col h-full overflow-hidden',
        'backdrop-blur-xl backdrop-saturate-150',
        'transition-all duration-500',
        isHighlighted
          ? [
              'bg-white/[0.045]',
              'border-white/[0.14]',
              'shadow-[0_20px_60px_rgba(0,0,0,0.28)]',
              'hover:bg-white/[0.06]',
              'hover:border-cyan-300/[0.2]',
            ]
          : [
              'bg-white/[0.02]',
              'border-white/[0.07]',
              'opacity-75',
              'hover:opacity-100',
              'hover:bg-white/[0.035]',
              'hover:border-white/[0.12]',
            ]
      )}
    >
      {/* Subtle glass highlight */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px',
          isHighlighted
            ? 'bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
        )}
      />

      {/* Very subtle atmospheric glow */}
      {isHighlighted && (
        <div className="pointer-events-none absolute -top-24 -right-20 w-48 h-48 rounded-full bg-cyan-400/[0.035] blur-3xl" />
      )}

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <h3
          className={cn(
            'text-lg font-bold font-mono tracking-widest flex items-center',
            isHighlighted ? 'text-cyan-300' : 'text-gray-300'
          )}
        >
          <Hash className="w-4 h-4 mr-1 opacity-40" />
          {division}
        </h3>

        {isHighlighted && (
          <span className="text-[10px] font-mono bg-cyan-300/[0.07] text-cyan-300/90 px-2.5 py-1 rounded-full uppercase tracking-wider border border-cyan-300/[0.12] backdrop-blur-sm">
            Your Batch
          </span>
        )}
      </div>

      <div className="relative flex-1 space-y-6">
        {/* NOW Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-red-400/[0.06] border border-red-400/[0.12]">
              <div className="w-1.5 h-1.5 bg-red-400/90 rounded-full animate-pulse" />
            </div>

            <span className="text-[10px] font-mono text-gray-400/80 uppercase tracking-widest">
              {schedule.state === 'BEFORE_CLASSES'
                ? 'STARTING TODAY'
                : 'LIVE NOW'}
            </span>
          </div>

          {schedule.currentActivity ? (
            <div className="relative bg-black/[0.18] border border-white/[0.07] rounded-xl p-4 backdrop-blur-md group hover:bg-white/[0.025] hover:border-white/[0.11] transition-all duration-300">
              <div className="text-[10px] font-mono text-cyan-300/85 mb-1 flex items-center justify-between">
                <span>{schedule.currentActivity.type}</span>

                {schedule.timeRemaining !== undefined &&
                  schedule.state === 'IN_CLASS' && (
                    <span className="text-gray-500">
                      {schedule.timeRemaining}m left
                    </span>
                  )}
              </div>

              <h4 className="text-sm font-semibold text-white/95 mb-3 line-clamp-2">
                {schedule.currentActivity.subject}
              </h4>

              <div className="space-y-1.5">
                {schedule.currentActivity.faculty && (
                  <div className="flex items-center text-xs text-gray-400/85 font-mono">
                    <User className="w-3.5 h-3.5 mr-2 opacity-40" />
                    {schedule.currentActivity.faculty}
                  </div>
                )}

                {schedule.currentActivity.venue && (
                  <div className="flex items-center text-xs text-gray-400/85 font-mono">
                    <MapPin className="w-3.5 h-3.5 mr-2 opacity-40" />
                    {schedule.currentActivity.venue}
                  </div>
                )}

                {schedule.currentSlotIndex !== -1 && (
                  <div className="flex items-center text-xs text-gray-400/85 font-mono">
                    <Clock className="w-3.5 h-3.5 mr-2 opacity-40" />
                    {TIME_SLOTS[schedule.currentSlotIndex].startTime} -{' '}
                    {TIME_SLOTS[schedule.currentSlotIndex].endTime}
                  </div>
                )}
              </div>

              {/* Progress */}
              {schedule.state === 'IN_CLASS' &&
                schedule.timeRemaining !== undefined && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400/30 via-cyan-300/80 to-cyan-200"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            100 - (schedule.timeRemaining / 55) * 100
                          )
                        )}%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                )}
            </div>
          ) : (
            <div className="bg-black/[0.12] border border-white/[0.06] border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center h-[140px] backdrop-blur-md">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                {schedule.state === 'AFTER_CLASSES' ||
                schedule.state === 'WEEKEND'
                  ? 'NO SCHEDULE'
                  : 'FREE PERIOD'}
              </span>

              <span className="text-sm text-gray-400/80">
                {schedule.state === 'AFTER_CLASSES' ||
                schedule.state === 'WEEKEND'
                  ? 'Academic schedule completed.'
                  : 'No activity scheduled.'}
              </span>
            </div>
          )}
        </div>

        {/* NEXT Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-white/[0.035] border border-white/[0.07]">
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>

            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              NEXT UP
            </span>
          </div>

          {schedule.nextActivity ? (
            <div className="bg-black/[0.12] border border-white/[0.06] rounded-xl p-3 relative backdrop-blur-md hover:bg-white/[0.02] transition-colors">
              <div className="text-[9px] font-mono text-gray-500 mb-1 uppercase tracking-wider flex justify-between">
                <span>{schedule.nextActivity.type}</span>

                {schedule.nextSlotIndex !== -1 && (
                  <span>
                    {TIME_SLOTS[schedule.nextSlotIndex].startTime}
                  </span>
                )}
              </div>

              <h4 className="text-xs font-semibold text-gray-300/90 mb-2 truncate">
                {schedule.nextActivity.subject}
              </h4>

              <div className="flex items-center space-x-3">
                {schedule.nextActivity.venue && (
                  <div className="flex items-center text-[10px] text-gray-500 font-mono">
                    <MapPin className="w-3 h-3 mr-1 opacity-40" />
                    {schedule.nextActivity.venue}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-black/[0.1] border border-white/[0.05] border-dashed rounded-xl p-3 text-center backdrop-blur-md">
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
      <DivisionCard
        division="RA-A1"
        isHighlighted={student?.division === 'RA-A1'}
      />

      <DivisionCard
        division="RA-A2"
        isHighlighted={student?.division === 'RA-A2'}
      />

      <DivisionCard
        division="RA-A3"
        isHighlighted={student?.division === 'RA-A3'}
      />
    </div>
  );
}