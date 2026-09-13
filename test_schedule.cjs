require('ts-node').register({ transpileOnly: true });

const { getSchedulePriority, getAbsoluteOverrides } = require('./src/services/scheduleService.ts');
const { parseISO } = require('date-fns');

function test(timeStr, expectedText) {
  const date = parseISO(timeStr);
  const overrides = getAbsoluteOverrides(date, 'RA-A1');
  const slotIndex = 5; 
  const p = getSchedulePriority(date, 'RA-A1', slotIndex);

  let out = `Normal priority: ${p.level}`;
  if (p.activity) out += ` (${p.activity.subject})`;
  
  if (overrides.length > 0) {
     out += ` | Absolute overrides: ${overrides.length} (e.g. ${overrides[0].activity.subject} at ${overrides[0].startTime})`;
  }

  console.log(`[${timeStr}] -> ${out}`);
}

console.log("=== EXAM TEST ===");
test('2026-10-05T13:29:00', 'Normal schedule / pre-exam');
test('2026-10-05T13:30:00', 'Matrices & Calculus UNIT TEST');
test('2026-10-05T14:19:00', 'Matrices & Calculus UNIT TEST');
test('2026-10-05T14:20:00', 'Exam has ended');

