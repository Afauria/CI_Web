import React from "react";
import { Modal, Form, Input, message } from "antd";
import { addModule } from "../../redux/modules/cimodule";

class ModuleModal extends React.Component<any> {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addModule(
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
      }
    });
  };

  render() {
    const { modalVisible, handleAdd, handleModalVisible, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        //关闭后子组件内容清空
        destroyOnClose
        title="新增组件"
        visible={modalVisible}
        onOk={this.handleSubmit}
        onCancel={() => handleModalVisible(false)}
      >
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="组件名称"
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "组件名称不能为空" }]
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="组件仓库"
        >
          {getFieldDecorator("repo", {
            rules: [{ required: true, message: "组件仓库不能为空" }]
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="组件分支"
        >
          {getFieldDecorator("branch", {
            rules: [{ required: true, message: "组件分支不能为空" }]
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="组件描述"
        >
          {getFieldDecorator("descr")(
            <Input.TextArea placeholder="请输入" rows={4} />
          )}
        </Form.Item>
      </Modal>
    );
  }
}
export default Form.create()(ModuleModal);
