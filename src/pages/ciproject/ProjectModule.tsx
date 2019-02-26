import React from "react";
import { Table } from "antd";
import styles from "../index.scss";
import {projectModuleColumns} from "../../utils/tableKeys";
import {data} from "../mockData";
export default class ProjectModule extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.infoTitle}>项目组件</div>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          dataSource={data}
          columns={projectModuleColumns}
          rowKey="id"
        />
      </div>
    );
  }
}
