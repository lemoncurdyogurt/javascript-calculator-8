import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    try {
      await this.getSumNumbers();
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
      return;
    }
  }
}

export default App;
