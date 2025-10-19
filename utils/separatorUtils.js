export function extractCustomSeparator(input) {
  if (!input.startsWith('//')) {
    return { customSeparator: null, numbersPart: input };
  }
  
  const separatorEndIndex = input.indexOf('\\n');
  //커스텀 구분자 형식 오류 처리
  if (separatorEndIndex === -1)
    throw new Error('[ERROR] 커스텀 구분자 형식 오류');
  
  const customSeparator = input.substring(2, separatorEndIndex);
  //빈 커스텀 구분자 오류 처리
  if (customSeparator === '')
    throw new Error('[ERROR] 커스텀 구분자 형식 오류');

  const numbersPart = input.substring(separatorEndIndex + 2);
  return { customSeparator, numbersPart };
}