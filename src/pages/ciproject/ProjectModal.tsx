import React, { PureComponent } from "react";
import { Modal, Form, Input, message } from "antd";
import { addProject, modifyProject } from "../../redux/modules/ciproject";
import * as _ from "lodash";
export interface IProps {
  handleModalVisible;
  handleRefresh;
  form;
  modalVisible;
  record;
}
class ProjectModal extends PureComponent<IProps> {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { record } = this.props;
        if (_.isEmpty(record)) {
          addProject(
            values,
            resp => {
              message.success("添加成功！");
              this.props.handleModalVisible(false);
              this.props.handleRefresh();
            },
            err => {
              message.error(err);
            }
          );
        } else {
          modifyProject(
            { ...values, projectId: record.projectId },
            resp => {
              message.success("修改成功！");
              this.props.handleModalVisible(false);
              this.props.handleRefresh();
            },
            err => {
              message.error(err);
            }
          );
        }
      }
    });
  };

  renderForm() {
    const { form, record } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="项目名称"
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "项目名称不能为空" }],
            initialValue: record.name
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="项目仓库"
        >
          {getFieldDecorator("repo", {
            rules: [{ required: true, message: "项目仓库不能为空" }],
            initialValue: record.repo
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="项目分支"
        >
          {getFieldDecorator("branch", {
            rules: [{ required: true, message: "项目分支不能为空" }],
            initialValue: record.branch
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="项目描述"
        >
          {getFieldDecorator("descr", {
            initialValue: record.descr
          })(<Input.TextArea placeholder="请输入" rows={4} />)}
        </Form.Item>
      </div>
    );
  }

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    return (
      <Modal
        //关闭后子组件内容清空
        destroyOnClose
        title="新增项目"
        visible={modalVisible}
        onOk={this.handleSubmit}
        onCancel={() => handleModalVisible(false)}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}
export default Form.create()(ProjectModal);
