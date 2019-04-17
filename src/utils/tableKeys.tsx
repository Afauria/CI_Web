import { Divider } from "antd";
import { moduleBuildStatusMap, projectBuildStatusMap } from "./statusMap";
import { formatTime } from "./timeFormat";
export const user = [
  {
    title: "昵称",
    dataIndex: "nickdataIndex",
    width: "280px"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    width: "280px"
  },
  {
    title: "id",
    dataIndex: "id",
    width: "280px"
  },
  {
    title: "工号",
    dataIndex: "jobNumber",
    width: "280px"
  },
  {
    title: "操作",
    dataIndex: "handle",
    width: "100px"
  }
];
export const ciModuleColumns = [
  {
    title: "组件名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "分支名",
    dataIndex: "branch",
    key: "branch"
  },
  {
    title: "当前版本",
    dataIndex: "curVersion",
    key: "curVersion"
  },
  {
    title: "工程目录",
    dataIndex: "catalog",
    key: "catalog"
  },
  {
    title: "状态",
    dataIndex: "buildStatus",
    key: "buildStatus",
    render: (text, record) => <span>{moduleBuildStatusMap[text]}</span>
  },
  {
    title: "上次操作时间",
    dataIndex: "gmtUpdate",
    key: "gmtUpdate",
    render: (text, record) => <span>{formatTime(text)}</span>
  },
  {
    title: "操作",
    dataIndex: "others",
    key: "others"
  }
];

export const ciProjectColumns = [
  {
    title: "项目名",
    dataIndex: "name",
    key: "name"
  },
  // {
  //   title: "项目所有者",
  //   dataIndex: "emails",
  //   width: "210px"
  // },
  // {
  //   title: "项目描述",
  //   dataIndex: "desc"
  // },
  {
    title: "分支名",
    dataIndex: "branch",
    key: "branch"
  },
  {
    title: "构建状态",
    dataIndex: "buildStatus",
    key: "buildStatus",
    render: (text, record) => <span>{projectBuildStatusMap[text]}</span>
  },
  {
    title: "集成状态",
    dataIndex: "integrateStatus",
    key: "integrateStatus",
    render: (text, record) => <span>{projectBuildStatusMap[text]}</span>
  },
  {
    title: "上次操作时间",
    dataIndex: "gmtUpdate",
    key: "gmtUpdate",
    render: (text, record) => <span>{formatTime(text)}</span>
  },
  {
    title: "操作",
    dataIndex: "others",
    key: "others"
  }
];

export const projectModuleColumns = [
  {
    title: "组件名称",
    dataIndex: "moduleName",
    key: "moduleName"
  },
  {
    title: "组件版本",
    dataIndex: "version",
    key: "version"
  },
  {
    title: "关联类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "操作",
    dataIndex: "others",
    key: "others"
  }
];

export const ciProjectHistoryColumns = [
  {
    title: "构建Number",
    dataIndex: "buildNum",
    key: "buildNum"
  },
  {
    title: "构建状态",
    dataIndex: "buildStatus",
    key: "buildStatus",
    render: (text, record) => <span style={{color:text==4?"red":""}}>{projectBuildStatusMap[text]}</span>
  },
  {
    title: "构建时间",
    dataIndex: "gmtCreate",
    key: "gmtCreate",
    render: (text, record) => <span>{formatTime(text)}</span>
  },
  {
    title: "构建信息",
    dataIndex: "message",
    key: "message"
  },
  {
    title: "操作",
    dataIndex: "others",
    key: "others"
  }
];
