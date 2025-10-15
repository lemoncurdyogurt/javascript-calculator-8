import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    try {
      const input = await this.getSumNumbers();
      const result = this.splitAndSum(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
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
    const numbers = target.split(regex).map(num => Number(num));
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum;
  }

  customSeparator(input) {
    if (input.startsWith('//')) {
      const separatorEndIndex = input.indexOf('\n');
      // \n이 없는 경우 에러 처리
      if (separatorEndIndex === -1) throw new Error('커스텀 구분자 형식 오류');

      const potentialSeperator = input.substring(2, separatorEndIndex);
      // 빈문자열인 경우 에러 처리
      if (potentialSeperator === "") throw new Error('커스텀 구분자 형식 오류');
      const customSeparator = potentialSeperator;

      const numbersPart = input.substring(separatorEndIndex + 1);
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
