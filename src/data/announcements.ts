export type AnnouncementCategory = 'ACADEMIC' | 'DEADLINE' | 'EXAM' | 'LAB' | 'EVENT' | 'URGENT' | 'GENERAL';

export interface Announcement {
  id: string;
  title: string;
  subject: string;
  description: string;
  date: string;
  deadline?: string;
  category: AnnouncementCategory;
  priority: 'high' | 'medium' | 'low';
}

export const announcements: Announcement[] = [
  {
    id: 'A1',
    title: 'Experiment 2 & 3 Submission',
    subject: 'Programming for Engineers',
    description: 'Complete and submit experiment 2 and 3 reports.',
    date: '2026-09-08',
    deadline: '2026-09-11',
    category: 'LAB',
    priority: 'high'
  },
  {
    id: 'A2',
    title: 'Experiment 4 & 5 Submission',
    subject: 'Basic Electrical and Electronics Engineering',
    description: 'Complete and submit experiment 4 and 5 journals.',
    date: '2026-09-08',
    deadline: '2026-09-15',
    category: 'LAB',
    priority: 'medium'
  },
  {
    id: 'A3',
    title: 'Application-Based Poster + Viva',
    subject: 'Matrices and Calculus',
    description: 'Prepare poster and viva presentation.',
    date: '2026-09-08',
    deadline: '2026-09-15',
    category: 'DEADLINE',
    priority: 'high'
  }
];

