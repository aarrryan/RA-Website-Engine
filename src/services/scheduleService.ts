import { format, isWithinInterval, parseISO, startOfWeek, isSameDay } from 'date-fns';
import { getStandardActivity, DayOfWeek, Division, Activity, TIME_SLOTS } from '../data/timetable';
import { academicCalendar } from '../data/calendar';
import { evaluations } from '../data/evaluations';
import { tinkerLabSchedule, makerLabSchedule } from '../data/labs';

export interface SchedulePriority {
  level: 'holiday' | 'examination' | 'special_event' | 'lab' | 'normal' | 'free';
  activity: Activity | null;
}

export interface AbsoluteOverride {
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  activity: Activity;
}

export function getAbsoluteOverrides(date: Date, division: Division): AbsoluteOverride[] {
  const dateStr = format(date, 'yyyy-MM-dd');
  const overrides: AbsoluteOverride[] = [];

  if (dateStr === '2026-10-05') {
    overrides.push({ startTime: '13:30', endTime: '14:20', activity: { subject: 'Matrices and Calculus', faculty: 'Exam Dept', venue: 'Exam Hall', type: 'Exam' }});
  } else if (dateStr === '2026-10-06') {
    overrides.push({ startTime: '13:30', endTime: '14:20', activity: { subject: 'Programming for Engineers', faculty: 'Exam Dept', venue: 'Exam Hall', type: 'Exam' }});
  } else if (dateStr === '2026-10-07') {
    overrides.push({ startTime: '13:30', endTime: '14:20', activity: { subject: 'Basic Electrical and Electronics Engineering', faculty: 'Exam Dept', venue: 'Exam Hall', type: 'Exam' }});
  } else if (dateStr === '2026-10-08') {
    overrides.push({ startTime: '13:30', endTime: '14:20', activity: { subject: 'Biophysics and Mechanics', faculty: 'Exam Dept', venue: 'Exam Hall', type: 'Exam' }});
  }

  return overrides;
}

export function getActivityForSlot(date: Date, division: Division, slotIndex: number): Activity | null {
  const priority = getSchedulePriority(date, division, slotIndex);
  return priority.activity;
}

export function getSchedulePriority(date: Date, division: Division, slotIndex: number): SchedulePriority {
  const dateStr = format(date, 'yyyy-MM-dd');
  const dayName = format(date, 'EEEE') as DayOfWeek;

  if (date.getDay() === 0) {
    return { level: 'holiday', activity: null };
  }

  const holiday = checkHoliday(dateStr);
  if (holiday) return { level: 'holiday', activity: holiday };

  // Note: We bypass absolute exams here because they don't snap to slotIndex cleanly.
  // The UI that maps by slot will miss them unless they also check getAbsoluteOverrides.

  // 3. SPECIAL EVENT
  const event = checkEvents(dateStr);
  if (event) return { level: 'special_event', activity: event };

  // 4. MAKER LAB / TINKER & IDEA LAB
  const lab = checkLabs(date, dayName, division, slotIndex);
  if (lab) return { level: 'lab', activity: lab };

  // 5. NORMAL TIMETABLE
  const standardActivity = getStandardActivity(dayName, division, slotIndex);
  if (standardActivity) return { level: 'normal', activity: standardActivity };

  // 6. FREE PERIOD
  return { level: 'free', activity: null };
}

function checkHoliday(dateStr: string): Activity | null {
  const event = academicCalendar.find(e => {
    if (e.endDate) {
      return isWithinInterval(parseISO(dateStr), { start: parseISO(e.startDate), end: parseISO(e.endDate) });
    }
    return e.startDate === dateStr;
  });

  if (event && event.type === 'HOLIDAY') {
    return { subject: event.title, faculty: 'University', venue: '', type: 'Break' };
  }
  return null;
}

function checkEvents(dateStr: string): Activity | null {
  const event = academicCalendar.find(e => {
    if (e.endDate) {
      return isWithinInterval(parseISO(dateStr), { start: parseISO(e.startDate), end: parseISO(e.endDate) });
    }
    return e.startDate === dateStr;
  });

  if (event && event.type === 'EVENT') {
    return { subject: event.title, faculty: 'University', venue: '', type: 'Special Activity' };
  }
  return null;
}

function checkLabs(date: Date, dayName: DayOfWeek, division: Division, slotIndex: number): Activity | null {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday of this week
  const weekStartStr = format(weekStart, 'yyyy-MM-dd');

  // Maker Lab - Friday Slot 2
  if (dayName === 'Friday' && slotIndex === 2) {
    const makerSession = makerLabSchedule.find(m => m.dateStr === weekStartStr && m.divisions.includes(division));
    if (makerSession) {
      return { subject: 'Maker Lab', faculty: 'Innovation Dept', venue: 'Maker Space', type: 'Laboratory' };
    }
    return { subject: 'Free (Maker Lab Off-Week)', faculty: '', venue: '', type: 'Free Period' };
  }

  // Tinker Lab - Wednesday/Thursday Slot 5 
  if ((dayName === 'Wednesday' || dayName === 'Thursday') && slotIndex === 5) {
    const tinkerSession = tinkerLabSchedule.find(t => t.dateStr === weekStartStr);
    if (tinkerSession) {
      if (dayName === 'Wednesday' && tinkerSession.wednesday.includes(division)) {
        return { subject: 'Tinker and IDEA Lab', faculty: 'Innovation Dept', venue: 'Drone Lab (6th Floor)', type: 'Laboratory' };
      }
      if (dayName === 'Thursday' && tinkerSession.thursday.includes(division)) {
        return { subject: 'Tinker and IDEA Lab', faculty: 'Innovation Dept', venue: 'Drone Lab (6th Floor)', type: 'Laboratory' };
      }
    }
  }

  return null;
}
