import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class CreateKongfuModal extends React.Component {

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="新功夫"
        okText="开练"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="功夫名称">
            {getFieldDecorator('title', {
              rules: [{required: true, message: '功夫名称不能为空'}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="功夫描述">
            {getFieldDecorator('brief')(<Input type="textarea"/>)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const FormWrapper = Form.create()(CreateKongfuModal)

export default FormWrapper;