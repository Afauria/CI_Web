import { CommonLayout } from "../common";
import { HEADER_MENU } from "../common/menu";
const SIDE_MENU = [
  {
    key: "cimodule",
    text: "组件管理",
    link: "/cimodule",
    icon: "block"
  },
  {
    key: "ciproject",
    text: "项目管理",
    link: "/ciproject",
    icon: "cluster"
  }
  // {
  //   key: "apps",
  //   text: "工程管理",
  //   link: "/apps",
  //   icon: "deployment-unit"
  //   icon: "gateway"
  // }
];

const AppCIContainer = props => {
  const {
    breadcrumb=[],
    children,
    activeSiderMenu
  } = props;
  return (
    <CommonLayout
      header={HEADER_MENU || []}
      sidemenu={SIDE_MENU || []}
      breadcrumb={breadcrumb}
      headerActive="app_ci"
      activeSiderMenu={activeSiderMenu}
    >
      {children}
    </CommonLayout>
  );
};

export default AppCIContainer;
