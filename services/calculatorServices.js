import { extractCustomSeparator } from '../utils/separatorUtils.js';
import { escapeRegExp } from '../utils/stringUtils.js';

export function splitAndSum(input) {
  if (!input) return 0;

  const { customSeparator, numbersPart } = extractCustomSeparator(input);
  const separators = [',', ':'];
  let target = input;

  if (customSeparator) {
    //커스텀 구분자 배열에 추가
    separators.push(escapeRegExp(customSeparator));
    target = numbersPart;
  }
  //여러 구분자에 대해 정규식 생성
  const regex = new RegExp(separators.join('|'), 'g');
  const numbers = target.split(regex).map(parseAndValidateNumber);
  return numbers.reduce((acc, num) => acc + num, 0);
}

function parseAndValidateNumber(num) {
  const n = Number(num);
  //구분자 외 다른 구분자가 들어오는 경우 NaN 처리
  if (isNaN(n)) throw new Error(`[ERROR] 잘못된 입력: ${num}`);
  //음수 처리
  if (n < 0) throw new Error('[ERROR] 음수는 사용할 수 없습니다.');
  return n;
}
