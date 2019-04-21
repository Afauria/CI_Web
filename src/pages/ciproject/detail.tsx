import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Divider, notification, Button, Popconfirm, message } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { projectinfo } from "../mockData";
import ProjectInfo from "./ProjectInfo";
import ProjectModule from "./ProjectModule";
import * as io from "socket.io-client";
import {
  getProjectInfoSuccess,
  getProjectInfo,
  integrateProject
} from "../../redux/modules/projectdetail";
import { request } from "../../lib/fetch";
import styles from "../index.scss";
import { buildProject } from "../../redux/modules/ciproject";

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

  handleBuildProject = () => {
    const { projectInfo } = this.props;
    buildProject(
      { projectId: projectInfo.projectId },
      resp => {
        message.success("开始构建!");
        this.handleRefresh();
      },
      err => {
        message.error(err);
      }
    );
  };

  handleIntegrateProject = () => {
    const { projectInfo } = this.props;
    integrateProject(
      { projectId: projectInfo.projectId },
      resp => {
        message.success("开始集成!");
        this.handleRefresh();
      },
      err => {
        message.error(err);
      }
    );
  };
  
  renderActions() {
    const { projectInfo } = this.props;
    return (
      <div className={styles.actions}>
        <Popconfirm
          title="确定构建"
          onConfirm={() => {
            this.handleBuildProject();
          }}
        >
          <Button className={styles["actions-btn"]} type="primary">
            构建
          </Button>
        </Popconfirm>
        <Popconfirm
          title="确定集成"
          onConfirm={() => {
            this.handleIntegrateProject();
          }}
        >
          <Button className={styles["actions-btn"]} type="primary">
            集成
          </Button>
        </Popconfirm>
        <Button className={styles["actions-btn"]} type="primary">
          <a href={`/ciproject/history?projectId=${projectInfo.projectId}`}>构建历史</a>
        </Button>
      </div>
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
        {this.renderActions()}
        <ProjectInfo info={projectInfo} />
        <Divider style={{ marginBottom: 32 }} />
        <ProjectModule projectId={projectInfo.projectId} />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(Detail);
