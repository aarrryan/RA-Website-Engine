import React, { useState, useEffect } from 'react';
import { useCurrentSchedule } from '../../hooks/useCurrentSchedule';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Info, Clock } from 'lucide-react';

export function LiveStatus() {
  const { student } = useAuth();
  const schedule = useCurrentSchedule(student?.division);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();

  let mainHeading = "";
  let subHeading = "";
  let isAlert = false;

  if (schedule.state === 'WEEKEND') {
    mainHeading = "WEEKEND PROTOCOL ACTIVE";
    subHeading = "No scheduled academic activities today.";
  } else if (schedule.state === 'HOLIDAY') {
    mainHeading = "ACADEMIC BREAK";
    subHeading = schedule.currentActivity?.subject || "Holiday";
  } else if (schedule.state === 'AFTER_CLASSES') {
    mainHeading = "THAT'S A WRAP FOR TODAY";
    subHeading = "Academic schedule completed. Tomorrow's preview available in timetable.";
  } else if (hour < 9) {
    mainHeading = "WHAT'S GOING TO HAPPEN TODAY?";
    subHeading = "Upcoming academic schedule for " + student?.division;
  } else {
    mainHeading = "WHAT'S GOING ON RIGHT NOW IN ROBOTICS AND AUTOMATION?";
    subHeading = `Live tracking for ${student?.division}`;
  }

  return (
    <div className="bg-gradient-to-r from-[#101114] to-[#0A0A0C] border border-[#1B1D21] rounded-xl p-6 relative overflow-hidden">
      {/* Decorative pulse line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#00F0FF]"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono text-[#00F0FF] uppercase tracking-widest mb-1 flex items-center">
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full mr-2 animate-pulse"></span>
            System Status
          </h3>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-1">
            {mainHeading}
          </h2>
          <p className="text-sm text-gray-400 font-light">
            {subHeading}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 bg-[#050505] border border-[#1B1D21] px-3 py-2 rounded-lg whitespace-nowrap">
          <Clock className="w-3 h-3" />
          <span>UPDATED {format(time, 'h:mm a')}</span>
        </div>
      </div>
    </div>
  );
}
