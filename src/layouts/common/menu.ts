export const HEADER_MENU = [
  {
    id: "app-ci",
    text: "CI平台",
    submenu: [
      {
        id: "app_ci_ios",
        text: "iOS",
        link: "/ios"
      },
      {
        id: "app_ci_android",
        text: "Android",
        link: "/android"
      }
    ]
  },
  {
    id: "config-center",
    link: "/config-center",
    text: "配置中心"
  },
  {
    id: "app-router",
    // link: "http://tuya-client-server.local:6066/",
    link: "/router_config",
    text: "短链平台"
  },
  {
    id: "client-blog",
    link: "http://tuya-client-server.local:4000/blog/",
    text: "博客"
  },
  {
    id: "odm-system",
    link: "/odm-system",
    text: "ODM管理后台"
  },
  {
    id: "subsys-entry",
    text: "工具",
    submenu: [
      {
        id: "auto_match",
        text: "自动配网",
        link: "/auto_match"
      }
    ]
  }
];
