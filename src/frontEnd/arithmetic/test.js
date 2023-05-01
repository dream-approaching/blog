function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  const m = num1.length;
  const n = num2.length;

  // 两个数相乘的结果的最大长度为 m + n
  const pos = Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    const x = +num1[i];
    for (let j = n - 1; j >= 0; j--) {
      const y = +num2[j];
      // 两个数相乘的结果
      const product = x * y;
      // p1 为两个数相乘的结果的位置
      const p1 = i + j;
      // p2 为两个数相乘的结果的位置的下一个位置
      const p2 = i + j + 1;
      const sum = product + pos[p2];

      pos[p1] += Math.floor(sum / 10);
      pos[p2] = sum % 10;
    }
  }

  console.log('%c  pos:', 'color: #0e93e0;background: #aaefe5;', pos);
  let result = '';
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] !== 0 || result !== '') {
      result += pos[i];
    }
  }
  // `${Number(pos.join(''))}`
  console.log(
    '%c  `${Number(pos.join())}`:',
    'color: #0e93e0;background: #aaefe5;',
    `${Number(pos.join(''))}`,
  );
  console.log('%c  result:', 'color: #0e93e0;background: #aaefe5;', result);
  return result === '' ? '0' : result;
}

multiply('123', '456');
