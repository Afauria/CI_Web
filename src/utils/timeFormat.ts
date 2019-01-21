import moment from 'moment';

/**
 * @param timestamp 时间戳 毫秒
 * @param format 格式 参考moment
 * @param timezone 时区 小时
 * @return string
 */
export const formatTime = (timestamp, format = 'YY/MM/DD HH:mm', timezone = '8') => {
  const timeOffset = parseInt(timezone, 10) * 60 * 60 * 1000;
  return moment.utc(timestamp + timeOffset).format(format);
};

export const getTimestamp = (dateString, timezone = '8') => {
  return +moment(dateString).utcOffset(+timezone).format('x');
};
