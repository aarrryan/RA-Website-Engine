import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

export function Greeting() {
  const { student } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  };

  const firstName = student?.name.split(' ')[0] || 'Student';

  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
        {getGreeting()}, <span className="font-semibold text-[#00F0FF]">{firstName}</span>.
      </h2>
      <p className="text-sm font-mono text-gray-400">
        {format(new Date(), 'EEEE · d MMMM yyyy')}
      </p>
    </div>
  );
}
