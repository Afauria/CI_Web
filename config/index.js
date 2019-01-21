const env = process.env.NEXT_ENV;

const config = {
  base: {
    assetPrefix: '',
    api: 'http://192.168.13.218:4918',
    socketUrl: 'http://192.168.13.218:4918',
    autoMatchApi: 'http://10.0.200.38:7084'
    // api: 'https://appci-back.tuya-inc.top:7788',
    // socketUrl: 'https://appci-back.tuya-inc.top:7788',
  },
  pre: {
    assetPrefix: '',
    api: 'https://appci-back.tuya-inc.top:7788',
    socketUrl: 'https://appci-back.tuya-inc.top:7788',
    autoMatchApi: 'http://10.0.200.38:7084'
  },
  prod: {
    assetPrefix: '',
    api: 'https://appci-back.tuya-inc.top:7788',
    socketUrl: 'https://appci-back.tuya-inc.top:7788',
    autoMatchApi: 'http://10.0.200.38:7084'
  },
};

module.exports = Object.assign(config.base, config[env])
