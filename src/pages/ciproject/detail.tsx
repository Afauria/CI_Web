import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Divider, notification, Button } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { projectinfo } from "../mockData";
import ProjectInfo from "./ProjectInfo";
import ProjectModule from "./ProjectModule";
import * as io from "socket.io-client";
import {
  getProjectInfoSuccess,
  getProjectInfo
} from "../../redux/modules/projectdetail";
import { request } from "../../lib/fetch";
import styles from "../index.scss";

class Detail extends React.Component<any> {
  static async getInitialProps({ req, store, query }) {
    const data = await request.get("api/project/info/" + query.projectId);
    store.dispatch(getProjectInfoSuccess(data));
    return {};
  }

  componentDidMount() {
    const socket = io(this.props.socketUrl + "?clientId=2", {
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("ws:connected!!session:", socket.id);

      socket.on("event_project", data => {
        this.handleRefresh();
        console.log("ws:receive project event");

        if (data.success) {
          notification.success({
            message: data.msg,
            description: "操作成功"
          });
        } else {
          notification.error({
            message: data.msg,
            description: "操作失败"
          });
        }
      });
    });

    socket.on("force-disconnect", () => {
      socket.disconnect();
    });
  }

  handleRefresh = () => {
    this.props.dispatch(getProjectInfo(this.props.projectInfo.projectId));
  };

  handleModalVisible = visible => {};

  renderActions() {
    return (
        <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          icon="plus"
          type="dashed"
          onClick={() => this.handleModalVisible(true)}
        >
          新增组件
        </Button>
    );
  }

  render() {
    const { projectInfo } = this.props;
    return (
      <AppCIContainer
        activeSiderMenu="ciprojectdetail"
        breadcrumb={[
          { key: 1, text: "项目管理", link: "/ciproject" },
          {
            key: 2,
            text: "项目详情",
            link: `/ciproject/detail?projectId=${projectInfo.projectId}`
          }
        ]}
      >
        
        <ProjectInfo info={projectInfo} />
        <Divider style={{ marginBottom: 32 }} />
        <ProjectModule modules={projectInfo.modules} />
        {this.renderActions()}
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(Detail);
