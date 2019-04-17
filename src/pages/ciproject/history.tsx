import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import {
  Table,
  Divider,
  Popconfirm,
  Button,
  message,
  notification,
  Modal
} from "antd";
import { ciProjectHistoryColumns } from "../../utils/tableKeys";
import mergeWithIndex from "../../utils/mergeWithIndex";
import { request } from "../../lib/fetch";
import {
  getProjectHistorySuccess,
  getProjectHistory,
  searchProjectBuildReport
} from "../../redux/modules/projectdetail";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;
class ProjectBuildHistory extends React.Component<any> {
  static async getInitialProps({ req, store, query }) {
    const data = await request.get(
      `api/project/info/${query.projectId}/history`,
      {
        pageNum: PAGE_NUM,
        pageSize: PAGE_SIZE
      }
    );
    store.dispatch(getProjectHistorySuccess(data));
    return { projectId: query.projectId };
  }

  handleRefresh = () => {
    const { pageSize, pageNum } = this.props.ciProject;
    this.props.dispatch(getProjectHistory({ pageSize, pageNum }));
  };

  handleOpenReport = (buildStatus, buildId,buildNum) => {
    searchProjectBuildReport(
      { buildId },
      resp => {
        if (buildStatus == 3) {
          Modal.success({
            title: `构建成功：${buildNum}`,
            content: <pre>{resp}</pre>,
            width: "50%"
          });
        } else if (buildStatus == 4) {
          Modal.error({ title: `构建失败：${buildNum}`, content: resp, width: "50%" });
        }
      },
      err => {
        message.error("请求失败：", err);
      }
    );
  };

  generateColumns() {
    return mergeWithIndex(ciProjectHistoryColumns, {
      4: {
        render: (text, record) => {
          return (
            <span>
              <a
                href="javascript:;"
                onClick={() =>
                  this.handleOpenReport(
                    record.buildStatus,
                    record.projectBuildId,
                    record.buildNum
                  )
                }
              >
                查看日志
              </a>
            </span>
          );
        }
      }
    });
  }

  renderTable() {
    const { total, pageSize, pageNum, list } = this.props.projectHistory;
    const pagination = { total, current: pageNum, pageSize: pageSize };
    const columns = this.generateColumns();
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={pagination => {
          this.props.dispatch(
            getProjectHistory({
              pageNum: pagination.current,
              pageSize: pagination.pageSize
            })
          );
        }}
        rowKey="projectBuildId"
      />
    );
  }

  render() {
    const { projectId } = this.props;
    return (
      <AppCIContainer
        activeSiderMenu="ciprojectdetail"
        breadcrumb={[
          { key: 1, text: "项目管理", link: "/ciproject" },
          {
            key: 2,
            text: "项目详情",
            link: `/ciproject/detail?projectId=${projectId}`
          },
          {
            key: 3,
            text: "项目构建历史",
            link: `/ciproject/history?projectId=${projectId}`
          }
        ]}
      >
        {this.renderTable()}
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(ProjectBuildHistory);
