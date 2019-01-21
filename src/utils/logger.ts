import { isNode } from './env';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { isDev } = publicRuntimeConfig;

const config = {
  appenders: {
    next: {
      type: isDev ? 'console' : 'dateFile',
      filename: 'logs/next.log',
      maxLogSize: 10485760,
      backups: 5
    }
  },
  categories: { default: { appenders: ['next'], level: isDev ? 'debug' : 'error' }},
}

let client

if (isNode) {
  const log4js = require('log4js')
  log4js.configure(config);
  client = log4js.getLogger();
}

export default client;
