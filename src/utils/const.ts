export const COMMON = 'COMMON';

export const APP_CI = {
  PLATFORM: {
    iOS: 1,
    Android: 2,
  },

  TYPE: {
    COMMON: 1, // 公版组件
    SPEC: 2, // 定制组件
  },
};

// export const pageSize = 3;
export const pageSize = 20;
export const pageNum = 1;

export const MAX_PAGE_SIZE = 1000;

export const RC = 'rc';

export const APP_COMPONENT_STATUS = {
  // 1-新增 2-修改 3-删除 4-构建 5-构建正式版
  ADD: 1,
  UPDATE: 2,
  DELETE: 3,
  BUILD: 4,
  OFFICIALBUILD: 5,
};
