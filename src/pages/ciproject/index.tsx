import React from "react";
import { connect } from "react-redux";
import AppCIContainer from "../../layouts/AppCIContainer";
import { Table } from "antd";
import { ciProjectColumns } from "../../utils/tableKeys";
import { data } from "../mockData";
class CIProject extends React.Component {
  pagination = {
    total: data.length,
    pageSize: 2
  };
  render() {
    return (
      <AppCIContainer
      activeSiderMenu='ciproject'
      breadcrumb={[
        { key: 1, text: "项目管理", link: "/ciproject" }
      ]}>
        <Table
          columns={ciProjectColumns}
          dataSource={data}
          pagination={this.pagination}
        />
      </AppCIContainer>
    );
  }
}

export default connect(x => x)(CIProject);
