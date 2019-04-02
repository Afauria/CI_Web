import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import {
  Table,
  Divider,
  Popconfirm,
  Button,
  message,
  notification
} from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { data } from "../mockData";
import {
  getProjectList,
  getProjectListSuccess,
  removeProject
} from "../../redux/modules/ciproject";
import mergeWithIndex from "../../utils/mergeWithIndex";
import { request } from "../../lib/fetch";
import styles from "../index.scss";
import ProjectModal from "./ProjectModal";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;
class CIProject extends React.Component<any> {
  state = {
    modalVisible: false,
    selectRecord: {}
  };

  static async getInitialProps({ req, store }) {
    const data = await request.get("api/project/list", {
      pageNum: PAGE_NUM,
      pageSize: PAGE_SIZE
    });
    store.dispatch(getProjectListSuccess(data));
    return {};
  }

  handleRefresh = () => {
    const { pageSize, pageNum } = this.props.ciProject;
    this.props.dispatch(getProjectList({ pageSize, pageNum }));
  };

  handleRemove = projectId => {
    removeProject(
      { projectId },
      resp => {
        message.success("删除成功！");
        this.handleRefresh();
      },
      err => message.error(err)
    );
  };

  handleModalVisible = (visible: boolean, record = {}) => {
    this.setState({ modalVisible: visible, selectRecord: record });
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
    return mergeWithIndex(ciProjectColumns, {
      5: {
        render: (text, record) => {
          return (
            <span>
              <a href="/ciproject/detail">详情</a>
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
                onConfirm={() => this.handleRemove(record.projectId)}
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
    const { total, pageSize, pageNum, list } = this.props.ciProject;
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
            getProjectList({
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
        activeSiderMenu="ciproject"
        breadcrumb={[{ key: 1, text: "项目管理", link: "/ciproject" }]}
      >
        {this.renderActions()}
        {this.renderTable()}
        <ProjectModal
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
          handleRefresh={this.handleRefresh}
          record={this.state.selectRecord}
        />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(CIProject);
