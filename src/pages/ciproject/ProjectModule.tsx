import React from "react";
import { Table, Divider, Popconfirm, Select, message } from "antd";
import styles from "../index.scss";
import { projectModuleColumns } from "../../utils/tableKeys";
import { data } from "../mockData";
import mergeWithIndex from "../../utils/mergeWithIndex";
import {
  searchModuleVersions,
  modifyProjectModuleVersion
} from "../../redux/modules/projectdetail";
export interface IProps {
  modules;
}
export default class ProjectModule extends React.Component<IProps> {
  state = {
    versionOptions: []
  };
  handleRemove = () => {};

  handleChangeVersion = (moduleBuildId, linkId) => {
    console.log(moduleBuildId);
    modifyProjectModuleVersion(
      { linkId, moduleBuildId },
      resp => {
        console.log(resp);
      },
      err => {}
    );
  };

  handleSearchVersion = moduleId => {
    searchModuleVersions(
      { moduleId },
      resp => {
        const options = resp.map(item => {
          return (
            <Select.Option key={item.moduleBuildId}>
              {item.version}
            </Select.Option>
          );
        });
        this.setState({ versionOptions: options });
      },
      err => {
        message.error("查询组件版本失败", err);
      }
    );
  };

  generateColumns() {
    return mergeWithIndex(projectModuleColumns, {
      1: {
        render: (text, record) => {
          return (
            <Select
              style={{ width: "50%" }}
              placeholder="Please select"
              defaultValue={record.version}
              onChange={moduleBuildId =>
                this.handleChangeVersion(moduleBuildId, record.linkId)
              }
              onFocus={() => this.handleSearchVersion(record.moduleId)}
            >
              {this.state.versionOptions}
            </Select>
          );
        }
      },
      2: {
        render: (text, record) => {
          return (
            <span>
              <Popconfirm
                title="确定删除"
                onConfirm={() => {
                  this.handleRemove();
                }}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          );
        }
      }
    });
  }
  render() {
    const columns = this.generateColumns();
    const { modules } = this.props;
    return (
      <div>
        <div className={styles.infoTitle}>项目组件</div>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          dataSource={modules}
          columns={columns}
          rowKey="moduleName"
        />
      </div>
    );
  }
}
