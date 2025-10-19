import { extractCustomSeparator } from '../utils/separatorUtils.js';
import { escapeRegExp } from '../utils/stringUtils.js';

export function splitAndSum(input) {
  if (!input) return 0;

  const { customSeparator, numbersPart } = extractCustomSeparator(input);
  const separators = [',', ':'];
  let target = input;

  if (customSeparator) {
    separators.push(escapeRegExp(customSeparator));
    target = numbersPart;
  }

  const regex = new RegExp(separators.join('|'), 'g');
  const numbers = target.split(regex).map(parseAndValidateNumber);
  return numbers.reduce((acc, num) => acc + num, 0);
}

function parseAndValidateNumber(num) {
  const n = Number(num);
  if (isNaN(n)) throw new Error(`[ERROR] 잘못된 입력: ${num}`);
  if (n < 0) throw new Error('[ERROR] 음수는 사용할 수 없습니다.');
  return n;
}
