export const validPasswords = [
  'RA26!Nova#71',
  'RA26!Forge#84',
  'RA26!Pulse#39',
  'RA26!Core#62',
  'RA26!Matrix#57',
  'RA26!Orbit#93',
  'RA26!Mecha#46',
  'RA26!Robo#28',
  'RA26!Vector#75',
  'RA26!Axiom#51'
];

export function isValidPassword(password: string): boolean {
  return validPasswords.includes(password);
}
