import { Console } from '@woowacourse/mission-utils';

export function validateInput(input) {
  if (input === undefined) {
    throw new Error('[ERROR] 입력값이 없습니다.');
  }
  //빈 문자열 입력 시 혹은 사용자 입력 없는 경우
  if (input === null || input.trim() === '') {
    Console.print('결과 : 0');
  }
}
