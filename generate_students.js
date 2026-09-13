const fs = require('fs');

const students = [];

let prnCounter = 26070127001;
let setIdCounter = 260318000;

for (let i = 1; i <= 32; i++) {
  const prn = prnCounter.toString();
  let name = `STUDENT A1-${i}`;
  let email = `student.a1.${i}@sitpune.edu.in`;
  let setId = setIdCounter.toString();
  
  if (prn === '26070127027') {
    name = 'DELISHA PRADHYUMAN RATHOD';
    email = 'delisha.rathod.btech2026@sitpune.edu.in';
    setId = '260318007';
  }
  
  students.push({
    prn,
    setId,
    name,
    email,
    division: 'RA-A1'
  });
  
  prnCounter++;
  if (prn !== '26070127027') setIdCounter++;
}

for (let i = 1; i <= 30; i++) {
  const prn = prnCounter.toString();
  const setId = setIdCounter.toString();
  students.push({
    prn,
    setId,
    name: `STUDENT A2-${i}`,
    email: `student.a2.${i}@sitpune.edu.in`,
    division: 'RA-A2'
  });
  prnCounter++;
  setIdCounter++;
}

for (let i = 1; i <= 31; i++) {
  const prn = prnCounter.toString();
  const setId = setIdCounter.toString();
  students.push({
    prn,
    setId,
    name: `STUDENT A3-${i}`,
    email: `student.a3.${i}@sitpune.edu.in`,
    division: 'RA-A3'
  });
  prnCounter++;
  setIdCounter++;
}

const content = `export interface Student {
  prn: string;
  setId: string;
  name: string;
  email: string;
  division: 'RA-A1' | 'RA-A2' | 'RA-A3';
}

export const students: Student[] = ${JSON.stringify(students, null, 2)};

export function getStudentByPRN(prn: string): Student | null {
  return students.find(s => s.prn === prn) || null;
}
`;

fs.writeFileSync('src/data/students.ts', content);
