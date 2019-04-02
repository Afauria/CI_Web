import React, { PureComponent } from "react";
import { Modal, Form, Input, message, version } from "antd";
import { buildModule } from "../../redux/modules/cimodule";
import * as _ from "lodash";
export interface IProps {
  handleModalVisible;
  handleRefresh;
  modalVisible;
  record;
  version;
  form;
}
class BuildModal extends PureComponent<IProps> {
  state = { version: "" };
  handleSubmit = () => {
    const { record, version } = this.props;
    if (_.isEmpty(version)) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          buildModule(
            { moduleId: record.moduleId, ...values },
            resp => {
                message.success("开始构建!");
                this.props.handleModalVisible(false);
                this.props.handleRefresh();
            },
            err => {
                message.error(err);
            }
          );
        }
      });
    } else {
      buildModule(
        { moduleId: record.moduleId, version },
        resp => {
            message.success("开始构建!");
            this.props.handleModalVisible(false);
            this.props.handleRefresh();
        },
        err => {
            message.error(err);
        }
      );
    }
  };

  renderForm() {
    const { version, form } = this.props;
    if (_.isEmpty(version)) {
      const { getFieldDecorator } = form;
      return (
        <div>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            label="组件版本"
          >
            {getFieldDecorator("version", {
              rules: [{ required: true, message: "组件版本不能为空" }]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </div>
      );
    } else {
      return <div>即将构建的版本：{version}</div>;
    }
  }

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    return (
      <Modal
        //关闭后子组件内容清空
        destroyOnClose
        title="构建组件"
        visible={modalVisible}
        onOk={this.handleSubmit}
        onCancel={() => handleModalVisible(false)}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}
export default Form.create()(BuildModal);
