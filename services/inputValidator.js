import { Console } from '@woowacourse/mission-utils';

export function validateInput(input) {
  if (input === null || input === undefined) {
    throw new Error('[ERROR] 입력값이 없습니다.');
  }

  if (input.trim() === '') {
    Console.print('결과 : 0');
  }
}
