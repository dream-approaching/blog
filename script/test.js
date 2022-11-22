// 定义颜色
const clc = {
  green: (text) => `\x1B[32m${text}\x1B[0m`,
  yellow: (text) => `\x1B[33m${text}\x1B[0m`,
  red: (text) => `\x1B[31m${text}\x1B[0m`,
};

// 使用
console.log(clc.green('这是绿色'));
// console.log(clc.yellow('这是黄色'));
// console.log(clc.red('这是红色'));
// console.log('\x1B[32m1234\x1B[0m');
console.log('这是黄色');

console.log('\x1b[36m', 'sometext', '\x1b[0m');
// console.log('%c zjs 这是红色:', 'color: #fff;background: #b457ff;', '这是红色');
