import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    try {
      const input = await this.getSumNumbers();
      const result = this.splitAndSum(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`${error.message}`);
      throw error;
    }
  }
  async getSumNumbers() {
    const input =
      await Console.readLineAsync('덧셈할 문자열을 입력해주세요.\n');

    if (!input || input.trim() === '') {
      Console.print('결과 : 0');
      return null;
    }
    return input;
  }

  splitAndSum(input) {
    if (!input) return 0;

    const { customSeparator, numbersPart } = this.customSeparator(input);
    const separators = [',', ':'];

    let target = input;
    if (customSeparator) {
      separators.push(this.escapeRegExp(customSeparator));
      target = numbersPart;
    }

    const regex = new RegExp(separators.join('|'), 'g');
    const numbers = target.split(regex).map(num => {
      const n = Number(num);
      // 음수인 경우 에러 처리
      if (n < 0) throw new Error('[ERROR] 음수는 사용할 수 없습니다.');
      // 정해진 구분자가 아닌 문자가 포함된 경우 에러 처리
      if (isNaN(n)) throw new Error(`[ERROR] 잘못된 입력: ${num}`);
      return n;
    });

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum;
  }

  customSeparator(input) {
    if (input.startsWith('//')) {
      const separatorEndIndex = input.indexOf('\\n');
      // \n이 없는 경우 에러 처리
      if (separatorEndIndex === -1) throw new Error('[ERROR] 커스텀 구분자 형식 오류');

      const potentialSeperator = input.substring(2, separatorEndIndex);
      // 빈문자열인 경우 에러 처리
      if (potentialSeperator === '') throw new Error('[ERROR] 커스텀 구분자 형식 오류');
      const customSeparator = potentialSeperator;

      const numbersPart = input.substring(separatorEndIndex + 2);
      return { customSeparator, numbersPart };
    }
    return { customSeparator: null, numbersPart: input };
  }

  //정규식 특수문자 이스케이프 처리
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
export default App;
