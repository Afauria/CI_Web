import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Table, message, Modal } from "antd";
import { ciModuleHistoryColumns } from "../../utils/tableKeys";
import mergeWithIndex from "../../utils/mergeWithIndex";
import { request } from "../../lib/fetch";
import { searchModuleBuildReport } from "../../redux/modules/cimodule";
import {
  getModuleHistory,
  getModuleHistorySuccess
} from "../../redux/modules/cimodule";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;
class ModuleBuildHistory extends React.Component<any> {
  static async getInitialProps({ req, store, query }) {
    const data = await request.get(`api/module/history`, {
      moduleId: query.moduleId,
      pageNum: PAGE_NUM,
      pageSize: PAGE_SIZE
    });
    store.dispatch(getModuleHistorySuccess(data));
    return { moduleId: query.moduleId };
  }

  handleRefresh = () => {
    const { pageSize, pageNum } = this.props.moduleHistory;
    const { moduleId } = this.props;
    this.props.dispatch(getModuleHistory({ moduleId, pageSize, pageNum }));
  };

  handleOpenReport = (buildStatus, buildId, buildNum) => {
    searchModuleBuildReport(
      { buildId },
      resp => {
        if (buildStatus == 3) {
          Modal.success({
            title: `构建成功：${buildNum}`,
            content: <pre>{resp}</pre>,
            width: "70%",
            maskClosable: true
          });
        } else if (buildStatus == 4) {
          Modal.error({
            title: `构建失败：${buildNum}`,
            content: <pre>{resp}</pre>,
            width: "70%",
            maskClosable: true
          });
        }
      },
      err => {
        message.error("请求失败：", err);
      }
    );
  };

  generateColumns() {
    return mergeWithIndex(ciModuleHistoryColumns, {
      4: {
        render: (text, record) => {
          return (
            <span>
              <a
                href="javascript:;"
                onClick={() =>
                  this.handleOpenReport(
                    record.buildStatus,
                    record.moduleBuildId,
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
    const { total, pageSize, pageNum, list } = this.props.moduleHistory;
    const { moduleId } = this.props;
    const pagination = { total, current: pageNum, pageSize: pageSize };
    const columns = this.generateColumns();
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={pagination => {
          this.props.dispatch(
            getModuleHistory({
              moduleId,
              pageNum: pagination.current,
              pageSize: pagination.pageSize
            })
          );
        }}
        rowKey="moduleBuildId"
      />
    );
  }

  render() {
    const { moduleId } = this.props;
    return (
      <AppCIContainer
        activeSiderMenu="cimodule"
        breadcrumb={[
          { key: 1, text: "组件管理", link: "/cimodule" },
          {
            key: 2,
            text: "组件构建历史",
            link: `/cimodule/history?moduleId=${moduleId}`
          }
        ]}
      >
        {this.renderTable()}
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(ModuleBuildHistory);
