const env = process.env.NEXT_ENV;

const config = {
  base: {
    assetPrefix: '',
    api: 'http://localhost:8083',
    socketUrl: 'http://localhost:8084'
    // api: 'https://appci-back.tuya-inc.top:7788',
    // socketUrl: 'https://appci-back.tuya-inc.top:7788',
  },
  pre: {
    assetPrefix: '',
    api: 'https://appci-back.tuya-inc.top:7788',
    socketUrl: 'https://appci-back.tuya-inc.top:7788'
  },
  prod: {
    assetPrefix: '',
    api: 'https://appci-back.tuya-inc.top:7788',
    socketUrl: 'https://appci-back.tuya-inc.top:7788'
  },
};

module.exports = Object.assign(config.base, config[env])
