import { Console } from '@woowacourse/mission-utils';
import { splitAndSum } from '../services/calculatorServices.js';
import { validateInput } from '../services/inputValidator.js';

class App {
  async run() {
    try {
      const input = await this.getSumNumbers();
      const result = splitAndSum(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`${error.message}`);
      throw error;
    }
  }
  async getSumNumbers() {
    const input =
      await Console.readLineAsync('덧셈할 문자열을 입력해주세요.\n');
    validateInput(input);
    return input?.trim() === '' ? null : input;
  }
}
export default App;
