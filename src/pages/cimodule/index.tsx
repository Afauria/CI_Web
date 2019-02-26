import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Table, Button, Divider, message } from "antd";
import { ciModuleColumns } from "../../utils/tableKeys";
// import { data } from "../mockData";
import {
  getModuleListSuccess,
  getModuleList,
  removeModule
} from "../../redux/modules/cimodule";
import styles from "../index.scss";
import { request } from "../../lib/fetch";
import ModuleModal from "./ModuleModal";
import mergeWithIndex from "../../utils/mergeWithIndex";
import Item from "../../../node_modules/antd/lib/list/Item";
import { modulesBuildStatusMap } from "../../utils/statusMap";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;

class CIModule extends React.Component<any> {
  state = { modalVisible: false };
  static async getInitialProps({ req, store }) {
    const data = await request.get("api/module/list", {
      pageNum: PAGE_NUM,
      pageSize: PAGE_SIZE
    });
    store.dispatch(getModuleListSuccess(data));
    return {};
  }

  constructor(props) {
    super(props);
  }

  handleRefresh = () => {
    const { pageSize, pageNum } = this.props.ciModule;
    this.props.dispatch(getModuleList({ pageSize, pageNum }));
  };

  handleModalVisible = flag => {
    this.setState({ modalVisible: flag });
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
              <a href="javascript:;">构建</a>
              <Divider type="vertical" />
              <a href="javascript:;">正式构建</a>
              <Divider type="vertical" />
              <a href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => this.handleRemove(record.moduleId)}
              >
                删除
              </a>
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
    const { modalVisible } = this.state;
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
        />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(CIModule);
