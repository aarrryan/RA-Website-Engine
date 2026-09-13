export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Division = 'RA-A1' | 'RA-A2' | 'RA-A3';
export type ActivityType = 'Theory Lecture' | 'Laboratory' | 'Practical' | 'Tutorial' | 'Exam' | 'Break' | 'Free Period' | 'Special Activity' | 'No Scheduled Activity';

export interface TimeSlot {
  startTime: string; // HH:mm format (24h)
  endTime: string;
}

export interface Activity {
  subject: string;
  faculty: string;
  venue: string;
  type: ActivityType;
}

export interface Period {
  slot: TimeSlot;
  activity: Activity | null; // null if free period/break
}

export const TIME_SLOTS: TimeSlot[] = [
  { startTime: '09:00', endTime: '09:55' },
  { startTime: '09:55', endTime: '10:50' },
  { startTime: '10:50', endTime: '11:45' },
  { startTime: '11:45', endTime: '12:40' },
  { startTime: '12:40', endTime: '13:35' }, // Lunch
  { startTime: '13:35', endTime: '14:30' },
  { startTime: '14:30', endTime: '15:25' },
  { startTime: '15:25', endTime: '16:20' }
];

export function getStandardActivity(day: DayOfWeek, division: Division, slotIndex: number): Activity | null {
  const d = day.toLowerCase();
  
  if (slotIndex === 4) {
    return { subject: 'Lunch', faculty: '', venue: '', type: 'Break' };
  }

  if (d === 'monday') {
    if (slotIndex === 0 || slotIndex === 1) {
      if (division === 'RA-A1') return { subject: 'Basic Manufacturing Practices', faculty: '', venue: 'Workshop', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Basic Manufacturing Practices', faculty: '', venue: 'C108', type: 'Theory Lecture' };
      if (division === 'RA-A3') return { subject: 'Basic Manufacturing Practices', faculty: '', venue: 'CL I', type: 'Laboratory' };
    }
    if (slotIndex === 2) return { subject: 'ELH', faculty: '', venue: '', type: 'Theory Lecture' };
    if (slotIndex === 5) {
      if (division === 'RA-A1') return { subject: 'Introduction to Environment and Sustainability', faculty: 'SAN', venue: 'DSAL', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Basic Manufacturing Practices', faculty: 'SKR', venue: 'Workshop', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Matrices and Calculus', faculty: 'SBE', venue: 'C108', type: 'Theory Lecture' };
    }
    if (slotIndex === 6) {
      if (division === 'RA-A1') return { subject: 'Introduction to Environment and Sustainability', faculty: 'SAN', venue: 'DSAL', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Basic Manufacturing Practices', faculty: 'SKR', venue: 'Workshop', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Matrices and Calculus', faculty: 'SBE', venue: 'C108', type: 'Theory Lecture' };
    }
  }

  if (d === 'tuesday') {
    if (slotIndex === 0) {
      return { subject: 'Programming for Engineers / Biophysics and Mechanics', faculty: 'MOA / RYE', venue: 'A101', type: 'Theory Lecture' };
    }
    if (slotIndex === 1 || slotIndex === 2) {
      if (division === 'RA-A1') return { subject: 'Programming for Engineers', faculty: 'MOA', venue: 'SML', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Introduction to Environment and Sustainability', faculty: 'SAN', venue: 'MRL', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Basic Electrical and Electronics Engineering', faculty: 'SAZ', venue: 'IIOT&MRL', type: 'Laboratory' };
    }
    if (slotIndex === 3) return { subject: 'ELH', faculty: '', venue: '', type: 'Theory Lecture' };
    if (slotIndex === 5 || slotIndex === 6) {
      if (division === 'RA-A1') return { subject: 'Matrices and Calculus', faculty: 'SBE', venue: 'D302', type: 'Theory Lecture' };
      if (division === 'RA-A2') return { subject: 'Basic Manufacturing Practices', faculty: 'SKR', venue: 'Workshop', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Engineering Graphics and Design', faculty: 'NKR', venue: 'CL II', type: 'Laboratory' };
    }
  }

  if (d === 'wednesday') {
    if (slotIndex === 0) return { subject: 'Matrices and Calculus', faculty: 'JGD', venue: 'A101', type: 'Theory Lecture' };
    if (slotIndex === 1) return { subject: 'ELH', faculty: '', venue: '', type: 'Theory Lecture' };
    if (slotIndex === 2 || slotIndex === 3) {
      if (division === 'RA-A1') return { subject: 'Engineering Graphics and Design', faculty: 'NKR', venue: 'MRL', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Programming for Engineers', faculty: 'MOA', venue: 'SML', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Basic Manufacturing Practices', faculty: '', venue: 'Workshop', type: 'Laboratory' };
    }
    if (slotIndex === 5) {
      return { subject: 'Creative Thinking', faculty: 'RPA', venue: 'C108', type: 'Theory Lecture' };
    }
  }

  if (d === 'thursday') {
    if (slotIndex === 0) return { subject: 'Engineering Graphics and Design', faculty: 'AKB', venue: 'C108', type: 'Theory Lecture' };
    if (slotIndex === 1) return { subject: 'ELH', faculty: '', venue: '', type: 'Theory Lecture' };
    if (slotIndex === 2) return { subject: 'Basic Electrical and Electronics Engineering', faculty: 'SAZ', venue: 'D302', type: 'Theory Lecture' };
    if (slotIndex === 5 || slotIndex === 6) {
      if (division === 'RA-A1') return { subject: 'Basic Electrical and Electronics Engineering', faculty: 'SAZ', venue: 'IIOT&MRL', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Engineering Graphics and Design', faculty: 'NKR', venue: 'CCL', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Basic Manufacturing Practices', faculty: 'HKC', venue: 'Workshop', type: 'Laboratory' };
    }
    if (slotIndex === 7) return { subject: 'Biophysics and Mechanics', faculty: 'RYE', venue: 'D302', type: 'Theory Lecture' };
  }

  if (d === 'friday') {
    if (slotIndex === 0 || slotIndex === 1) {
      if (division === 'RA-A1') return { subject: 'Basic Manufacturing Practices', faculty: 'AKB', venue: 'Workshop', type: 'Laboratory' };
      if (division === 'RA-A2') return { subject: 'Basic Electrical and Electronics Engineering', faculty: 'SAZ', venue: 'IIOT&MRL', type: 'Laboratory' };
      if (division === 'RA-A3') return { subject: 'Programming for Engineers', faculty: 'MOA', venue: 'SML', type: 'Laboratory' };
    }
    if (slotIndex === 2) return { subject: 'MAKER LAB', faculty: '', venue: '', type: 'Laboratory' };
    if (slotIndex === 5 || slotIndex === 6) {
      if (division === 'RA-A1') return { subject: 'Biophysics and Mechanics', faculty: 'RYE', venue: 'D302', type: 'Theory Lecture' };
      if (division === 'RA-A2') return { subject: 'Matrices and Calculus', faculty: 'JGD', venue: 'C108', type: 'Theory Lecture' };
      if (division === 'RA-A3') return { subject: 'Basic Electrical and Electronics Engineering', faculty: 'SAZ', venue: 'C108', type: 'Theory Lecture' };
    }
    if (slotIndex === 7) return { subject: 'Mentor Mentee', faculty: '', venue: 'A102', type: 'Special Activity' };
  }

  return null;
}
