import React, { useState, useEffect } from 'react';
import { useCurrentSchedule } from '../../hooks/useCurrentSchedule';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

export function LiveStatus() {
  const { student } = useAuth();
  const schedule = useCurrentSchedule(student?.division);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();

  let mainHeading = '';
  let subHeading = '';

  if (schedule.state === 'WEEKEND') {
    mainHeading = 'WEEKEND PROTOCOL ACTIVE';
    subHeading = 'No scheduled academic activities today.';
  } else if (schedule.state === 'HOLIDAY') {
    mainHeading = 'ACADEMIC BREAK';
    subHeading = schedule.currentActivity?.subject || 'Holiday';
  } else if (schedule.state === 'AFTER_CLASSES') {
    mainHeading = "THAT'S A WRAP FOR TODAY";
    subHeading =
      "Academic schedule completed. Tomorrow's preview available in timetable.";
  } else if (hour < 9) {
    mainHeading = "WHAT'S GOING TO HAPPEN TODAY?";
    subHeading = 'Upcoming academic schedule for ' + student?.division;
  } else {
    mainHeading =
      "WHAT'S GOING ON RIGHT NOW IN ROBOTICS AND AUTOMATION?";
    subHeading = `Live tracking for ${student?.division}`;
  }

  const isLive =
    schedule.state !== 'WEEKEND' &&
    schedule.state !== 'HOLIDAY' &&
    schedule.state !== 'AFTER_CLASSES';

  return (
    <motion.div
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.09]
        bg-white/[0.025]
        backdrop-blur-xl backdrop-saturate-150
        shadow-[0_18px_50px_rgba(0,0,0,0.22)]
      "
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Subtle glass highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

      {/* Very subtle ambient depth */}
      <div className="pointer-events-none absolute -top-32 right-[-5rem] h-64 w-64 rounded-full bg-white/[0.015] blur-3xl" />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Main status information */}
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isLive
                    ? 'bg-emerald-400/90 animate-pulse'
                    : 'bg-gray-500/70'
                }`}
              />

              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500">
                {isLive ? 'LIVE STATUS' : 'SYSTEM STATUS'}
              </span>
            </div>

            <h2 className="max-w-4xl text-lg font-semibold tracking-tight text-white/95 sm:text-xl lg:text-2xl">
              {mainHeading}
            </h2>

            <p className="mt-1.5 text-sm font-light leading-relaxed text-gray-400/85">
              {subHeading}
            </p>
          </div>

          {/* Last updated */}
          <div className="flex shrink-0 items-center self-start sm:self-auto">
            <div
              className="
                flex items-center gap-2
                rounded-lg
                border border-white/[0.07]
                bg-black/[0.16]
                px-3 py-2
                backdrop-blur-md
              "
            >
              <Clock className="h-3.5 w-3.5 text-gray-500" />

              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600">
                  Updated
                </span>

                <span className="text-[10px] font-mono text-gray-400">
                  {format(time, 'h:mm a')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal bottom status line */}
        <div className="mt-5 border-t border-white/[0.05] pt-3">
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest">
            <span className="text-gray-600">
              Robotics & Automation
            </span>

            <span className="text-gray-600">
              {student?.division}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}