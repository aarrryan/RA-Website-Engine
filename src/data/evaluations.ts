export interface Evaluation {
  id: string;
  subject: string;
  type: string;
  dateStr: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  status: 'continuous' | 'scheduled';
}

export const evaluations: Evaluation[] = [
  // Matrices and Calculus
  { id: 'E1', subject: 'Matrices and Calculus', type: 'Quiz', dateStr: '24 Aug 2026', startDate: '2026-08-24', status: 'scheduled' },
  { id: 'E2', subject: 'Matrices and Calculus', type: 'Application based poster + viva', dateStr: '15 Sep 2026', startDate: '2026-09-15', status: 'scheduled' },
  { id: 'E3', subject: 'Matrices and Calculus', type: 'Unit Test', dateStr: '05–10 Oct 2026', startDate: '2026-10-05', endDate: '2026-10-10', status: 'scheduled' },
  { id: 'E4', subject: 'Matrices and Calculus', type: 'Class Test', dateStr: '16 Nov 2026', startDate: '2026-11-16', status: 'scheduled' },

  // Programming for Engineers
  { id: 'E5', subject: 'Programming for Engineers', type: 'Unit Test', dateStr: '06 Oct 2026', startDate: '2026-10-06', status: 'scheduled' },
  { id: 'E6', subject: 'Programming for Engineers', type: 'Quiz', dateStr: '10–12 Nov 2026', startDate: '2026-11-10', endDate: '2026-11-12', status: 'scheduled' },

  // Introduction to Environment and Sustainability
  { id: 'E7', subject: 'Introduction to Environment and Sustainability', type: 'Lab Work', dateStr: 'Continuous / Weekly', status: 'continuous' },
  { id: 'E8', subject: 'Introduction to Environment and Sustainability', type: 'Poster + Presentation', dateStr: '25 Nov 2026', startDate: '2026-11-25', status: 'scheduled' },

  // Engineering Graphics and Design
  { id: 'E9', subject: 'Engineering Graphics and Design', type: 'Drawing Sheets', dateStr: '03 Aug–17 Nov 2026', startDate: '2026-08-03', endDate: '2026-11-17', status: 'scheduled' },
  { id: 'E10', subject: 'Engineering Graphics and Design', type: 'Class Test', dateStr: '26–31 Oct 2026', startDate: '2026-10-26', endDate: '2026-10-31', status: 'scheduled' },

  // Basic Electrical and Electronics Engineering
  { id: 'E11', subject: 'Basic Electrical and Electronics Engineering', type: 'Class Test', dateStr: '03 Sep 2026', startDate: '2026-09-03', status: 'scheduled' },
  { id: 'E12', subject: 'Basic Electrical and Electronics Engineering', type: 'Unit Test', dateStr: '05–10 Oct 2026', startDate: '2026-10-05', endDate: '2026-10-10', status: 'scheduled' },
  { id: 'E13', subject: 'Basic Electrical and Electronics Engineering', type: 'Poster Presentation', dateStr: '13 Nov 2026', startDate: '2026-11-13', status: 'scheduled' },
  { id: 'E14', subject: 'Basic Electrical and Electronics Engineering', type: 'Journal + Viva', dateStr: 'Continuous', status: 'continuous' },

  // Biophysics and Mechanics
  { id: 'E15', subject: 'Biophysics and Mechanics', type: 'MCQ 1', dateStr: '27 Aug 2026', startDate: '2026-08-27', status: 'scheduled' },
  { id: 'E16', subject: 'Biophysics and Mechanics', type: 'Unit Test', dateStr: '05–10 Oct 2026', startDate: '2026-10-05', endDate: '2026-10-10', status: 'scheduled' },
  { id: 'E17', subject: 'Biophysics and Mechanics', type: 'MCQ 2', dateStr: '30 Oct 2026', startDate: '2026-10-30', status: 'scheduled' },
  { id: 'E18', subject: 'Biophysics and Mechanics', type: 'Assignment', dateStr: '17 Nov 2026', startDate: '2026-11-17', status: 'scheduled' },

  // Basic Manufacturing Practices
  { id: 'E19', subject: 'Basic Manufacturing Practices', type: 'Lab Work / Practice Models (Part 1)', dateStr: '27 Jul 2026', startDate: '2026-07-27', status: 'scheduled' },
  { id: 'E20', subject: 'Basic Manufacturing Practices', type: 'Journal Submission + Viva', dateStr: 'Continuous', status: 'continuous' },
  { id: 'E21', subject: 'Basic Manufacturing Practices', type: 'Lab Work / Practice Models (Part 2)', dateStr: '21 Nov 2026', startDate: '2026-11-21', status: 'scheduled' },

  // Tinker and IDEA Lab
  { id: 'E22', subject: 'Tinker and IDEA Lab', type: 'Hands-on Activity', dateStr: 'Weekly', status: 'continuous' },
  { id: 'E23', subject: 'Tinker and IDEA Lab', type: 'Mini-project', dateStr: 'During lab examination schedule', status: 'scheduled' },

  // Creative Thinking
  { id: 'E24', subject: 'Creative Thinking', type: 'Project', dateStr: '11 Nov 2026', startDate: '2026-11-11', status: 'scheduled' }
];
