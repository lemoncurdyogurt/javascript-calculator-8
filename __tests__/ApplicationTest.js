import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach(output => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(
      '[ERROR] 음수는 사용할 수 없습니다.',
    );
  });
});

describe('문자열 계산기 추가 테스트', () => {
  test('기본 구분자(쉼표, 콜론) 혼용', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('잘못된 커스텀 구분자 형식 에러', async () => {
    const inputs = ['//;1,2,3'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 커스텀 구분자 형식 오류');
  });

  test('잘못된 입력 문자 포함 시 에러', async () => {
    const inputs = ['1,a,3'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 잘못된 입력: a');
  });

  test('공백 입력 시 0 출력', async () => {
    const inputs = [''];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 0'));
  });

  test('커스텀 구분자 여러 문자 사용', async () => {
    const inputs = ['//***\\n1***2***3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });
});
