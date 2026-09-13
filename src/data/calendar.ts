export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  type: 'HOLIDAY' | 'EXAM' | 'EVENT' | 'TEACHING';
  isImportant?: boolean;
}

export const academicCalendar: CalendarEvent[] = [
  { id: '1', title: 'Induction Registration and Session Commencement', startDate: '2026-07-20', type: 'EVENT' },
  { id: '2', title: 'Teaching Schedule Starts', startDate: '2026-07-27', type: 'TEACHING' },
  { id: '3', title: 'Unit Test period', startDate: '2026-10-05', endDate: '2026-10-10', type: 'EXAM', isImportant: true },
  { id: '4', title: 'Techfest & Cultural Fest', startDate: '2026-10-16', endDate: '2026-10-17', type: 'EVENT', isImportant: true },
  { id: '5', title: 'Exam Form Filling starts (tentative)', startDate: '2026-11-02', type: 'EVENT' },
  { id: '6', title: 'Diwali Vacation', startDate: '2026-11-06', endDate: '2026-11-11', type: 'HOLIDAY', isImportant: true },
  { id: '7', title: 'Exam Form Filling ends (without fine)', startDate: '2026-11-16', type: 'EVENT' },
  { id: '8', title: 'Teaching Schedule / Practical Exam', startDate: '2026-11-23', endDate: '2026-11-28', type: 'EXAM' },
  { id: '9', title: 'Extended Exam Form Filling ends', startDate: '2026-11-27', type: 'EVENT' },
  { id: '10', title: 'Final CNG/TNG', startDate: '2026-11-28', type: 'EVENT' },
  { id: '11', title: 'Preparatory Leave', startDate: '2026-11-30', endDate: '2026-12-05', type: 'HOLIDAY' },
  { id: '12', title: 'End Semester Examination (ESE ODD 2026)', startDate: '2026-12-07', endDate: '2026-12-13', type: 'EXAM', isImportant: true },
  { id: '13', title: 'Teaching Learning Schedule / Career Essentials / VAC', startDate: '2026-12-14', endDate: '2026-12-19', type: 'TEACHING' },
  { id: '14', title: 'Vacation', startDate: '2026-12-21', endDate: '2026-12-31', type: 'HOLIDAY' },
  { id: '15', title: 'Next session commencement', startDate: '2027-01-04', type: 'EVENT' }
];
