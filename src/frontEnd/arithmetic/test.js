/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 1) {
    return strs[0];
  }

  if (strs.includes('')) {
    return '';
  }

  const minLen = strs.sort((a, b) => a.length - b.length)[0].length;
  // console.log('minLen', minLen)
  let right = 1;
  let str = '';

  while (right <= minLen) {
    str = strs[0].slice(0, right);
    for (let i = 0; i < strs.length; i++) {
      if (!strs[i].startsWith(str)) {
        str = strs[0].slice(0, right - 1);
        console.log('str', str);
        return str;
      }
    }
    right++;
  }

  return str;
};

longestCommonPrefix(['flo', 'flo', 'flo']);
