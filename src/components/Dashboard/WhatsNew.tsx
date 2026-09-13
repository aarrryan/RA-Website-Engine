import React from 'react';
import { announcements } from '../../data/announcements';
import { academicCalendar } from '../../data/calendar';
import { evaluations } from '../../data/evaluations';
import { Bell, AlertTriangle, ChevronRight, FileText, Calendar as CalendarIcon, Clock, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { isAfter, parseISO, startOfDay, format } from 'date-fns';
import { Link } from 'react-router-dom';

export function WhatsNew() {
  const today = startOfDay(new Date());

  const upcomingAnnouncements = announcements.map(a => ({
    id: a.id,
    type: 'announcement',
    title: a.title,
    subtitle: a.subject,
    date: a.deadline || a.date,
    priority: a.priority,
    icon: <Bell className="w-4 h-4" />,
    color: 'text-[#00F0FF]'
  }));

  const upcomingEvents = academicCalendar
    .filter(e => isAfter(parseISO(e.startDate), today) || parseISO(e.startDate).getTime() === today.getTime())
    .map(e => ({
      id: e.id,
      type: 'calendar',
      title: e.title,
      subtitle: e.type,
      date: e.startDate,
      priority: e.isImportant ? 'high' : 'medium',
      icon: <CalendarIcon className="w-4 h-4" />,
      color: 'text-[#7000FF]'
    }));

  const upcomingEvals = evaluations
    .filter(e => e.status === 'scheduled' && e.startDate && (isAfter(parseISO(e.startDate), today) || parseISO(e.startDate).getTime() === today.getTime()))
    .map(e => ({
      id: e.id,
      type: 'evaluation',
      title: `${e.subject} - ${e.type}`,
      subtitle: 'Assessment',
      date: e.startDate!,
      priority: 'high',
      icon: <Target className="w-4 h-4" />,
      color: 'text-red-400'
    }));

  const combined = [...upcomingAnnouncements, ...upcomingEvents, ...upcomingEvals]
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 5);

  const urgentUpdates = combined.filter(c => c.priority === 'high');

  return (
    <div className="space-y-6">
      {/* Urgent Updates */}
      {urgentUpdates.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
          <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Urgent Priorities
          </h3>
          <div className="space-y-3">
            {urgentUpdates.slice(0, 2).map((update, i) => (
              <div key={`urgent-${update.id}-${i}`} className="bg-[#050505] border border-red-500/20 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{update.title}</h4>
                  <p className="text-xs text-gray-400 font-mono">{update.subtitle}</p>
                </div>
                <div className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded">
                  {format(parseISO(update.date), 'MMM dd')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coming Up */}
      <div className="bg-[#0B0B0D] border border-[#1B1D21] rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Coming Up
          </h3>
          <Link to="/calendar" className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest hover:underline flex items-center">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {combined.map((item, i) => (
            <motion.div 
              key={`${item.type}-${item.id}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group flex gap-4 p-4 bg-[#151619] border border-[#1B1D21] rounded-lg hover:border-gray-600 transition-colors"
            >
              <div className={`hidden sm:flex flex-shrink-0 w-10 h-10 rounded bg-[#101114] border border-[#1B1D21] items-center justify-center transition-colors ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                  <span className="flex-shrink-0 text-[10px] font-mono bg-[#1B1D21] text-gray-300 px-2 py-0.5 rounded border border-[#2A2D35] whitespace-nowrap">
                    {format(parseISO(item.date), 'MMM dd')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
          {combined.length === 0 && (
            <div className="text-center text-gray-500 font-mono text-sm py-4">
              No upcoming activities.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
