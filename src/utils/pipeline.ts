export default (...funcs) => value =>
  funcs.reduce((val, fun) => fun(val), value);

// intersperse :: array -> item -> array
// [x1, x2, x3] -> y -> [x1, y, x2, y, x3]
export const intersperse = (arr, sep) =>
  [].concat(...arr.map(e => [sep, e])).slice(1);

export const interComponent = (arr, fun) =>
  [].concat(...arr.map((e, idx) => [fun(arr, e, idx), e])).slice(1);
