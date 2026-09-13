export interface TinkerLabSchedule {
  week: number;
  dateStr: string;
  wednesday: string[]; // Divisions
  thursday: string[];  // Divisions
}

// Data exactly as specified in the prompt
export const tinkerLabSchedule: TinkerLabSchedule[] = [
  { week: 1, dateStr: '2026-07-27', wednesday: ['RA-A3'], thursday: ['RA-A1'] },
  { week: 2, dateStr: '2026-08-03', wednesday: ['RA-A2', 'RA-A3'], thursday: [] }, // Thursday specified as "RA-related rotation as specified in source", treating empty/unknown gracefully
  { week: 3, dateStr: '2026-08-10', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 4, dateStr: '2026-08-17', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 5, dateStr: '2026-08-24', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 6, dateStr: '2026-08-31', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 7, dateStr: '2026-09-07', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 8, dateStr: '2026-09-14', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 9, dateStr: '2026-09-21', wednesday: ['RA-A2', 'RA-A3', 'RA-A1'], thursday: [] },
  { week: 10, dateStr: '2026-09-28', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 11, dateStr: '2026-10-05', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 12, dateStr: '2026-10-12', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 13, dateStr: '2026-10-19', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] },
  { week: 14, dateStr: '2026-10-26', wednesday: ['RA-A1', 'RA-A2', 'RA-A3'], thursday: [] }
  // Weeks 15 & 16 have no RA entries.
];

export interface MakerLabSchedule {
  dateStr: string; // YYYY-MM-DD
  divisions: string[];
}

export const makerLabSchedule: MakerLabSchedule[] = [
  // First rotation (assumed RA-A1 based on order, but prompt just says RA-A1, RA-A2, RA-A3 and then lists dates. 
  // I will map them as groups. Actually, let's just make sure Maker lab is shown for the divisions.)
  // "Dates include: Jul 27, Aug 17, Sep 07, Sep 28, Oct 05, Oct 26, Nov 16"
  { dateStr: '2026-07-27', divisions: ['RA-A1'] },
  { dateStr: '2026-08-17', divisions: ['RA-A1'] },
  { dateStr: '2026-09-07', divisions: ['RA-A1'] },
  { dateStr: '2026-09-28', divisions: ['RA-A1'] },
  { dateStr: '2026-10-05', divisions: ['RA-A1'] },
  { dateStr: '2026-10-26', divisions: ['RA-A1'] },
  { dateStr: '2026-11-16', divisions: ['RA-A1'] },

  // Second rotation
  { dateStr: '2026-07-13', divisions: ['RA-A2'] },
  { dateStr: '2026-08-03', divisions: ['RA-A2'] },
  { dateStr: '2026-08-24', divisions: ['RA-A2'] },
  { dateStr: '2026-09-14', divisions: ['RA-A2'] },
  { dateStr: '2026-10-12', divisions: ['RA-A2'] },
  { dateStr: '2026-11-02', divisions: ['RA-A2'] },
  { dateStr: '2026-11-23', divisions: ['RA-A2'] },

  // Third rotation
  { dateStr: '2026-07-20', divisions: ['RA-A3'] },
  { dateStr: '2026-08-10', divisions: ['RA-A3'] },
  { dateStr: '2026-08-31', divisions: ['RA-A3'] },
  { dateStr: '2026-09-21', divisions: ['RA-A3'] },
  { dateStr: '2026-10-19', divisions: ['RA-A3'] },
  { dateStr: '2026-11-09', divisions: ['RA-A3'] },
  { dateStr: '2026-11-30', divisions: ['RA-A3'] }
];
