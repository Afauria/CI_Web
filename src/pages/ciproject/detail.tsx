import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Divider, notification } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { projectinfo } from "../mockData";
import ProjectInfo from "./ProjectInfo";
import ProjectModule from "./ProjectModule";
import * as io from "socket.io-client";

class Detail extends React.Component<any> {
  componentDidMount() {
    const socket = io(this.props.socketUrl + "?clientId=1", {
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

  handleRefresh = () => {};

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
