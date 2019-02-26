import moment from 'moment';

/**
 * @param timestamp 时间戳 毫秒
 * @param format 格式 参考moment
 * @param timezone 时区 小时
 * @return string
 */
export const formatTime = (timestamp, format = 'YY-MM-DD HH:mm', timezone = '8') => {
  return moment(timestamp).format(format);
};
