import React from "react";
import { Table, Divider, Popconfirm, Select, message, Button } from "antd";
import styles from "../index.scss";
import { projectModuleColumns } from "../../utils/tableKeys";
import mergeWithIndex from "../../utils/mergeWithIndex";
import * as _ from "lodash";
import {
  searchModuleVersions,
  searchModulesName,
  searchProjectModules,
  addProjectModule,
  removeProjectModule
} from "../../redux/modules/projectdetail";
import { linkTypeMap } from "../../utils/statusMap";
export interface IProps {
  projectId;
}
export default class ProjectModule extends React.Component<IProps> {
  linkTypeOptions = Object.keys(linkTypeMap).map(item => {
    return <Select.Option key={item}>{linkTypeMap[+item]}</Select.Option>;
  });

  state = {
    versionOptions: [],
    modules: [],
    modulesName: [],
    newModules: []
  };
  // 需要给元素设置key值，通过key值进行修改，不能直接通过数组索引修改。
  // 因为react会根据key值进行复用。导致视图出错
  // 这里key值使用唯一标识，类似数据库主键，自增长，删除元素不会影响key值
  localCount = 0;
  emptyModule = {
    moduleName: "",
    version: "",
    moduleId: 0,
    moduleBuildId: 0,
    editable: true,
    isNew: true,
    type: 1
  };
  constructor(props) {
    super(props);
    this.handleRefresh();
  }

  handleRefresh = () => {
    const { projectId } = this.props;
    const { modules } = this.state;
    const newModules = modules.filter(item => {
      return item.isNew;
    });
    searchProjectModules(
      { projectId },
      resp => {
        const modules = resp.map((item, idx) => {
          return {
            ...item,
            editable: false,
            isNew: false,
            key: this.localCount++
          };
        });
        this.setState({ modules: modules.concat(newModules) });
      },
      err => {
        message.error("查询项目组件失败：" + err);
      }
    );
    searchModulesName(
      { projectId },
      resp => {
        const options = resp.map(item => {
          return <Select.Option key={item.moduleId}>{item.name}</Select.Option>;
        });
        this.setState({ modulesName: options });
      },
      err => {
        message.error("查询组件名称失败：" + err);
      }
    );
  };

  getRowByKey(data, key) {
    return data.filter(item => item.key === key)[0];
  }

  handleChangeModule = (moduleId, option, key) => {
    const { modules } = this.state;
    const target = this.getRowByKey(modules, key);
    target.moduleId = moduleId;
    target.moduleName = option.props.children;
    this.setState({ modules });
  };

  handleChangeVersion = (moduleBuildId, option, key) => {
    const { modules } = this.state;
    const target = this.getRowByKey(modules, key);
    target.moduleBuildId = moduleBuildId;
    target.version = option.props.children;
    this.setState({ modules });
  };

  handleChangeLinkType = (linkType, option, key) => {
    const { modules } = this.state;
    const target = this.getRowByKey(modules, key);
    target.type = linkType;
    this.setState({ modules });
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

  handleAddModule = () => {
    const { modules } = this.state;
    modules.push({ ...this.emptyModule, key: this.localCount++ });
    this.setState({ modules });
  };

  doAddModule = (moduleBuildId, key) => {
    const { projectId } = this.props;
    const { modules } = this.state;
    const target = this.getRowByKey(modules, key);
    if (moduleBuildId == 0) {
      message.error("请填写完整的组件信息。");
    } else {
      addProjectModule(
        { projectId, moduleBuildId, type: +target.type },
        resp => {
          target.isNew = false;
          this.setState({ modules });
          this.handleRefresh();
          message.success("保存项目组件成功！");
        },
        err => {
          message.error("保存项目组件失败：" + err);
        }
      );
    }
  };

  handleEdit = key => {
    const { modules } = this.state;
    const target = this.getRowByKey(modules, key);
    target.editable = true;
    this.setState({ modules });
  };

  handleRemove = (moduleBuildId, isNew: boolean, key) => {
    const { projectId } = this.props;
    if (isNew) {
      const { modules } = this.state;
      //根据key值过滤掉移除的元素，得到新的数组
      const newData = modules.filter(item => item.key !== key);
      this.setState({ modules: newData });
    } else {
      removeProjectModule(
        { projectId, moduleBuildId },
        resp => {
          this.handleRefresh();
          message.success("删除项目组件成功！");
        },
        err => {
          message.error("删除项目组件失败：" + err);
        }
      );
    }
  };

  generateColumns() {
    return mergeWithIndex(projectModuleColumns, {
      0: {
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                showSearch
                style={{ width: "50%" }}
                placeholder="Please select"
                defaultValue={record.moduleName}
                onChange={(moduleId, option) =>
                  this.handleChangeModule(moduleId, option, record.key)
                }
              >
                {this.state.modulesName}
              </Select>
            );
          } else {
            return <div>{text}</div>;
          }
        }
      },
      1: {
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                style={{ width: "50%" }}
                placeholder="Please select"
                defaultValue={record.version}
                onChange={(moduleBuildId, option) =>
                  this.handleChangeVersion(moduleBuildId, option, record.key)
                }
                onFocus={() => this.handleSearchVersion(record.moduleId)}
              >
                {this.state.versionOptions}
              </Select>
            );
          } else {
            return <div>{text}</div>;
          }
        }
      },
      2: {
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                style={{ width: "50%" }}
                placeholder="Please select"
                defaultValue={linkTypeMap[record.type]}
                onChange={(linkType, option) =>
                  this.handleChangeLinkType(linkType, option, record.key)
                }
              >
                {this.linkTypeOptions}
              </Select>
            );
          } else {
            return <div>{linkTypeMap[text]}</div>;
          }
        }
      },
      3: {
        render: (text, record) => {
          return (
            <span>
              {record.editable ? (
                <a
                  href="javascript:;"
                  onClick={() =>
                    this.doAddModule(record.moduleBuildId, record.key)
                  }
                >
                  保存
                </a>
              ) : (
                <a
                  href="javascript:;"
                  onClick={() => this.handleEdit(record.key)}
                >
                  编辑
                </a>
              )}

              <Divider type="vertical" />
              <Popconfirm
                title="确定删除"
                onConfirm={() => {
                  this.handleRemove(
                    record.moduleBuildId,
                    record.isNew,
                    record.key
                  );
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
    const { modules } = this.state;

    return (
      <div>
        <div className={styles.infoTitle}>项目组件</div>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          dataSource={modules}
          columns={columns}
          rowKey="key"
        />
        <Button
          style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
          icon="plus"
          type="dashed"
          onClick={() => this.handleAddModule()}
        >
          新增组件
        </Button>
      </div>
    );
  }
}
