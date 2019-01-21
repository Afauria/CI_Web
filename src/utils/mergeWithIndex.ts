export default (arr, obj = {}) => arr.map((it, idx) => {
  const other = obj[idx] || {};
  return { ...it, ...other };
});
