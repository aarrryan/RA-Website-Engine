import { useState, useEffect } from 'react';
import { format, parse, isBefore, isAfter, startOfDay } from 'date-fns';
import { TIME_SLOTS, Activity, DayOfWeek, Division } from '../data/timetable';
import { getSchedulePriority, getAbsoluteOverrides } from '../services/scheduleService';

export type ScheduleState = 'BEFORE_CLASSES' | 'IN_CLASS' | 'BREAK' | 'FREE_PERIOD' | 'AFTER_CLASSES' | 'WEEKEND' | 'HOLIDAY';

export interface ScheduleStatus {
  state: ScheduleState;
  currentActivity: Activity | null;
  nextActivity: Activity | null;
  currentSlotIndex: number; // -1 if not inside standard slot
  nextSlotIndex: number;
  timeRemaining?: number; 
}

export function useCurrentSchedule(division: Division | undefined, customDate?: Date) {
  const [status, setStatus] = useState<ScheduleStatus>({
    state: 'WEEKEND',
    currentActivity: null,
    nextActivity: null,
    currentSlotIndex: -1,
    nextSlotIndex: -1,
  });

  useEffect(() => {
    if (!division) return;
    
    const updateSchedule = () => {
      const now = customDate || new Date();
      const todayStart = startOfDay(now);
      
      const dayPriority = getSchedulePriority(now, division, 0);
      if (dayPriority.level === 'holiday') {
        setStatus({
          state: dayPriority.activity ? 'HOLIDAY' : 'WEEKEND',
          currentActivity: dayPriority.activity,
          nextActivity: null,
          currentSlotIndex: -1,
          nextSlotIndex: -1
        });
        return;
      }

      let currentState: ScheduleState = 'BEFORE_CLASSES';
      let currentActivity: Activity | null = null;
      let nextActivity: Activity | null = null;
      let currentSlotIndex = -1;
      let nextSlotIndex = -1;
      let timeRemaining = 0;

      const firstSlotStart = parse(TIME_SLOTS[0].startTime, 'HH:mm', todayStart);
      const lastSlotEnd = parse(TIME_SLOTS[TIME_SLOTS.length - 1].endTime, 'HH:mm', todayStart);

      const overrides = getAbsoluteOverrides(now, division);
      let insideOverride = false;
      let nextOverride = null;

      for (const override of overrides) {
        const oStart = parse(override.startTime, 'HH:mm', todayStart);
        const oEnd = parse(override.endTime, 'HH:mm', todayStart);
        if (now >= oStart && now < oEnd) {
          insideOverride = true;
          currentState = 'IN_CLASS';
          currentActivity = override.activity;
          timeRemaining = (oEnd.getTime() - now.getTime()) / 60000;
        } else if (now < oStart && (!nextOverride || oStart < parse(nextOverride.startTime, 'HH:mm', todayStart))) {
          nextOverride = override;
        }
      }

      if (insideOverride) {
        // If we are currently inside an absolute override, we find the NEXT activity (could be next slot or next override)
        for (let i = 0; i < TIME_SLOTS.length; i++) {
          const slotStart = parse(TIME_SLOTS[i].startTime, 'HH:mm', todayStart);
          if (now < slotStart) {
            const act = getSchedulePriority(now, division, i).activity;
            if (act && act.type !== 'Break' && act.type !== 'Free Period') {
              nextActivity = act;
              nextSlotIndex = i;
              break;
            }
          }
        }
        // Replace nextActivity with nextOverride if nextOverride is earlier
        if (nextOverride) {
          const nextOverStart = parse(nextOverride.startTime, 'HH:mm', todayStart);
          if (!nextActivity || nextOverStart < parse(TIME_SLOTS[nextSlotIndex].startTime, 'HH:mm', todayStart)) {
            nextActivity = nextOverride.activity;
            nextSlotIndex = -1;
          }
        }
      } else {
        if (isBefore(now, firstSlotStart)) {
          currentState = 'BEFORE_CLASSES';
          nextSlotIndex = 0;
          for (let i = 0; i < TIME_SLOTS.length; i++) {
            const act = getSchedulePriority(now, division, i).activity;
            if (act && act.type !== 'Break' && act.type !== 'Free Period') {
              nextActivity = act;
              nextSlotIndex = i;
              break;
            }
          }
          if (nextOverride) {
             const nextOverStart = parse(nextOverride.startTime, 'HH:mm', todayStart);
             if (!nextActivity || nextOverStart < parse(TIME_SLOTS[nextSlotIndex].startTime, 'HH:mm', todayStart)) {
                nextActivity = nextOverride.activity;
                nextSlotIndex = -1;
             }
          }
        } else if (isAfter(now, lastSlotEnd)) {
          currentState = 'AFTER_CLASSES';
        } else {
          for (let i = 0; i < TIME_SLOTS.length; i++) {
            const slotStart = parse(TIME_SLOTS[i].startTime, 'HH:mm', todayStart);
            const slotEnd = parse(TIME_SLOTS[i].endTime, 'HH:mm', todayStart);
            if (now >= slotStart && now < slotEnd) {
              currentSlotIndex = i;
              const priority = getSchedulePriority(now, division, i);
              currentActivity = priority.activity;
              timeRemaining = (slotEnd.getTime() - now.getTime()) / 60000;
              
              if (priority.level === 'holiday' || priority.level === 'special_event') {
                  currentState = priority.level === 'holiday' ? 'HOLIDAY' : 'IN_CLASS';
              } else if (currentActivity?.type === 'Break') {
                currentState = 'BREAK';
              } else if (currentActivity) {
                currentState = 'IN_CLASS';
              } else {
                currentState = 'FREE_PERIOD';
              }
              break;
            } else if (now < slotStart && currentSlotIndex === -1) {
                currentState = 'FREE_PERIOD'; 
                break;
            }
          }
          
          for (let i = currentSlotIndex === -1 ? 0 : currentSlotIndex + 1; i < TIME_SLOTS.length; i++) {
            const slotStart = parse(TIME_SLOTS[i].startTime, 'HH:mm', todayStart);
            if (now < slotStart) {
              const act = getSchedulePriority(now, division, i).activity;
              if (act && act.type !== 'Break' && act.type !== 'Free Period') {
                nextActivity = act;
                nextSlotIndex = i;
                break;
              }
            }
          }
          
          if (nextOverride) {
            const nextOverStart = parse(nextOverride.startTime, 'HH:mm', todayStart);
            if (!nextActivity || nextOverStart < parse(TIME_SLOTS[nextSlotIndex].startTime, 'HH:mm', todayStart)) {
               nextActivity = nextOverride.activity;
               nextSlotIndex = -1;
            }
          }

          if (currentSlotIndex !== -1 && currentState !== 'IN_CLASS' && currentState !== 'BREAK' && !nextActivity) {
              currentState = 'AFTER_CLASSES';
          }
        }
      }

      setStatus({
        state: currentState,
        currentActivity,
        nextActivity,
        currentSlotIndex,
        nextSlotIndex,
        timeRemaining: Math.floor(timeRemaining)
      });
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 60000); 
    return () => clearInterval(interval);
  }, [division, customDate]);

  return status;
}
