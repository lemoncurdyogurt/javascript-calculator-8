import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    try {
      const input = await this.getSumNumbers();
      const result = this.splitAndSum(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      //에러처리
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
      separators.push(customSeparator);
      target = numbersPart;
    }

    const regex = new RegExp(separators.join('|'));
    const numbers = input.split(regex).map(num => Number(num));
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    return sum;
  }
  
  customSeparator(input) {
    if (input.startsWith('//')) {
      const separatorEndIndex = input.indexOf('\n');
      const customSeparator = input.substring(2, separatorEndIndex);
      const numbersPart = input.substring(separatorEndIndex + 1);
      return { customSeparator, numbersPart };
    }
    return { customSeparator: null, numbersPart: input };
  }
}
export default App;
