import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import {
  Table,
  Button,
  Divider,
  message,
  Popconfirm,
  notification
} from "antd";
import { ciModuleColumns } from "../../utils/tableKeys";
// import { data } from "../mockData";
import {
  getModuleListSuccess,
  getModuleList,
  removeModule,
  modifyModule,
  searchBuildVersion
} from "../../redux/modules/cimodule";
import styles from "../index.scss";
import { request } from "../../lib/fetch";
import ModuleModal from "./ModuleModal";
import mergeWithIndex from "../../utils/mergeWithIndex";
import * as io from "socket.io-client";
import BuildModal from "./BuildModal";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;

class CIModule extends React.Component<any> {
  state = {
    modalVisible: false,
    selectRecord: {},
    buildModalVisible: false,
    version: ""
  };
  
  static async getInitialProps({ req, store }) {
    const data = await request.get("api/module/list", {
      pageNum: PAGE_NUM,
      pageSize: PAGE_SIZE
    });
    store.dispatch(getModuleListSuccess(data));
    return {};
  }

  componentDidMount() {
    const socket = io(this.props.socketUrl + "?clientId=2", {
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("ws:connected!!session:", socket.id);

      socket.on("event_module", data => {
        this.handleRefresh();
        console.log("ws:receive module event");

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
    const { pageSize, pageNum } = this.props.ciModule;
    this.props.dispatch(getModuleList({ pageSize, pageNum }));
  };

  handleModalVisible = (visible: boolean, record = {}) => {
    this.setState({ modalVisible: visible, selectRecord: record });
  };

  handleRemove = moduleId => {
    removeModule(
      { moduleId },
      resp => {
        message.success("删除成功！");
        this.handleRefresh();
      },
      err => message.error(err)
    );
  };

  handleBuildModalVisible = (
    visible: boolean,
    record = {},
    curVersion = "",
    rcFlag: boolean
  ) => {
    if (visible) {
      searchBuildVersion(
        { curVersion, rcFlag },
        resp => {
          this.setState({ version: resp });
        },
        err => {
          this.setState({ version: '' });
          message.error(err);
        }
      );
    }
    this.setState({
      buildModalVisible: visible,
      selectRecord: record
    });
  };

  renderActions() {
    return (
      <div className={styles.actions}>
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.handleModalVisible(true)}
        >
          新建
        </Button>
      </div>
    );
  }

  generateColumns() {
    return mergeWithIndex(ciModuleColumns, {
      6: {
        render: (text, record) => {
          return (
            <span>
              <a
                href="javascript:;"
                onClick={() =>
                  this.handleBuildModalVisible(
                    true,
                    record,
                    record.curVersion,
                    true
                  )
                }
              >
                构建
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() =>
                  this.handleBuildModalVisible(
                    true,
                    record,
                    record.curVersion,
                    false
                  )
                }
              >
                正式构建
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => this.handleModalVisible(true, record)}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除？"
                onConfirm={() => this.handleRemove(record.moduleId)}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          );
        }
      }
    });
  }

  renderTable() {
    const { total, pageSize, pageNum, list } = this.props.ciModule;
    const pagination = { total, current: pageNum, pageSize: pageSize };
    list.forEach((item, index) => {
      item.key = index;
    });
    const columns = this.generateColumns();
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={pagination => {
          this.props.dispatch(
            getModuleList({
              pageNum: pagination.current,
              pageSize: pagination.pageSize
            })
          );
        }}
      />
    );
  }

  render() {
    const { modalVisible, buildModalVisible } = this.state;
    return (
      <AppCIContainer
        activeSiderMenu="cimodule"
        breadcrumb={[{ key: 1, text: "组件管理", link: "/cimodule" }]}
      >
        {this.renderActions()}
        {this.renderTable()}
        <ModuleModal
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
          handleRefresh={this.handleRefresh}
          record={this.state.selectRecord}
        />
        <BuildModal
          modalVisible={buildModalVisible}
          handleModalVisible={this.handleBuildModalVisible}
          handleRefresh={this.handleRefresh}
          record={this.state.selectRecord}
          version={this.state.version}
        />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(CIModule);
