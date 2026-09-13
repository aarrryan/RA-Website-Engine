import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Beaker, Calendar, FileText, Bell, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { academicCalendar } from '../../data/calendar';
import { evaluations } from '../../data/evaluations';
import { announcements } from '../../data/announcements';
import { getStandardActivity, TIME_SLOTS, DayOfWeek, Division } from '../../data/timetable';
import { students } from '../../data/students';
import { tinkerLabSchedule, makerLabSchedule } from '../../data/labs';

export function GlobalSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [isMac, setIsMac] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().includes('mac'));
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
      if (e.key === 'Escape') {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const q = query.toLowerCase();

  // 1. Dynamic Timetable Indexing (Unique Subjects, Faculty, Venues)
  const timetableSet = new Set<string>();
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const divisions: Division[] = ['RA-A1', 'RA-A2', 'RA-A3'];
  
  days.forEach(d => {
    divisions.forEach(div => {
      TIME_SLOTS.forEach((_, i) => {
        const act = getStandardActivity(d, div, i);
        if (act && act.type !== 'Break' && act.type !== 'Free Period') {
          timetableSet.add(JSON.stringify({ subject: act.subject, faculty: act.faculty, venue: act.venue, type: act.type }));
        }
      });
    });
  });

  const timetableEntries = Array.from(timetableSet).map(s => JSON.parse(s));
  const matchedTimetable = q ? timetableEntries.filter(t => 
    t.subject.toLowerCase().includes(q) || 
    t.faculty.toLowerCase().includes(q) || 
    t.venue.toLowerCase().includes(q) || 
    t.type.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedEvents = q ? academicCalendar.filter(e => e.title.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)).slice(0, 3) : [];
  const matchedEvals = q ? evaluations.filter(e => e.subject.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)).slice(0, 3) : [];
  const matchedAnnouncements = q ? announcements.filter(a => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)).slice(0, 3) : [];
  const matchedStudents = q ? students.filter(s => s.name.toLowerCase().includes(q) || s.prn.includes(q) || s.setId.includes(q) || s.division.toLowerCase().includes(q)).slice(0, 3) : [];

  // Labs Indexing
  const labsIndex = [
    { title: 'Tinker and IDEA Lab', desc: 'Drone Lab (6th Floor)', tags: 'tinker idea lab wednesday thursday' },
    { title: 'Maker Lab', desc: 'Maker Space', tags: 'maker lab friday' }
  ];
  const matchedLabs = q ? labsIndex.filter(l => l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q) || l.tags.includes(q)).slice(0, 2) : [];

  const handleSelect = (path: string) => {
    navigate(path);
    setIsFocused(false);
    setQuery('');
  };

  const hasResults = matchedEvents.length > 0 || matchedEvals.length > 0 || matchedAnnouncements.length > 0 || matchedStudents.length > 0 || matchedTimetable.length > 0 || matchedLabs.length > 0;

  return (
    <div className="relative">
      <div 
        className={`flex items-center bg-[#0B0B0D] border rounded-lg transition-colors duration-300 ${
          isFocused ? 'border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-[#1B1D21] hover:border-gray-600'
        }`}
      >
        <SearchIcon className={`w-5 h-5 ml-4 transition-colors ${isFocused ? 'text-[#00F0FF]' : 'text-gray-500'}`} />
        <input
          id="global-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search curriculum, calendar, labs, or students..."
          className="w-full bg-transparent border-none text-sm text-white px-4 py-4 outline-none font-sans placeholder-gray-600"
        />
        <div className="mr-4 hidden sm:flex items-center space-x-1 text-[10px] font-mono text-gray-600 uppercase tracking-widest bg-[#151619] border border-[#1B1D21] px-2 py-1 rounded">
          <span>{isMac ? '⌘' : 'CTRL'}</span><span>K</span>
        </div>
      </div>
      
      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 w-full mt-2 bg-[#0B0B0D] border border-[#1B1D21] rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {!hasResults ? (
              <div className="p-8 text-center text-gray-500 text-sm font-mono">
                No results found for "{query}"
              </div>
            ) : (
              <div className="py-2 max-h-[60vh] overflow-y-auto">
                {matchedStudents.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Students</div>
                    {matchedStudents.map(s => (
                      <button key={s.prn} onClick={() => handleSelect('/')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <User className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{s.name}</p>
                          <p className="text-xs text-gray-500 font-mono">PRN: {s.prn} • SET: {s.setId} • {s.division}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {matchedTimetable.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Timetable</div>
                    {matchedTimetable.map((t, i) => (
                      <button key={`t-${i}`} onClick={() => handleSelect('/timetable')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <MapPin className="w-4 h-4 text-green-400 mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{t.subject}</p>
                          <p className="text-xs text-gray-500 font-mono">{t.venue ? `${t.venue} • ` : ''}{t.faculty} • {t.type}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {matchedLabs.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Labs</div>
                    {matchedLabs.map((l, i) => (
                      <button key={`l-${i}`} onClick={() => handleSelect('/labs')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <Beaker className="w-4 h-4 text-pink-400 mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{l.title}</p>
                          <p className="text-xs text-gray-500 font-mono">{l.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {matchedEvents.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Calendar Events</div>
                    {matchedEvents.map(event => (
                      <button key={event.id} onClick={() => handleSelect('/calendar')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <Calendar className="w-4 h-4 text-[#00F0FF] mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{event.title}</p>
                          <p className="text-xs text-gray-500 font-mono">{event.startDate} • {event.type}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {matchedEvals.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Evaluations</div>
                    {matchedEvals.map(ev => (
                      <button key={ev.id} onClick={() => handleSelect('/evaluations')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <FileText className="w-4 h-4 text-[#7000FF] mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{ev.subject}</p>
                          <p className="text-xs text-gray-500 font-mono">{ev.type} • {ev.dateStr}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {matchedAnnouncements.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Announcements</div>
                    {matchedAnnouncements.map(ann => (
                      <button key={ann.id} onClick={() => handleSelect('/announcements')} className="w-full text-left px-4 py-2 hover:bg-[#151619] flex items-center transition-colors">
                        <Bell className="w-4 h-4 text-yellow-400 mr-3 shrink-0" />
                        <div>
                          <p className="text-sm text-white">{ann.title}</p>
                          <p className="text-xs text-gray-500 font-mono">{ann.subject}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
