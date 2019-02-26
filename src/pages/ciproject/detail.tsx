import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Divider } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { projectinfo } from "../mockData";
import ProjectInfo from "./ProjectInfo";
import ProjectModule from "./ProjectModule";
class Detail extends React.Component {
  render() {
    return (
      <AppCIContainer
        activeSiderMenu="ciprojectdetail"
        breadcrumb={[
          { key: 1, text: "项目管理", link: "/ciproject" },
          { key: 2, text: "项目详情", link: "/ciproject/detail" }
        ]}
      >
        <ProjectInfo info={projectinfo} />
        <Divider style={{ marginBottom: 32 }} />
        <ProjectModule />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(Detail);
