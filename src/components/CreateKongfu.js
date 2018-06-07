import React from 'react';
import { Layout, Divider, Button, Steps, message, Form, Input, Upload, Icon, Tag, Tooltip } from 'antd';
import MyHeader from "./Header";
import MyFooter from "./Footer";
import './CreateKongfu.css';
import { createKongfu, getTags } from "../services/kongfu";

const {Content} = Layout;
const Step = Steps.Step;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: false };
  handleChange = (checked) => {
    this.setState({ checked });
    this.props.onChange(this.props.tag, checked)
  }
  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

const BasicForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
      brief: Form.createFormField({
        ...props.brief,
        value: props.brief.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form>
      <FormItem
        label='功夫名称'
        required
      >
        {getFieldDecorator('title', {
          rules: [{required: true, message: '功夫名称不能为空'}],
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        label='功夫描述'
        required
      >
        {getFieldDecorator('brief', {
          rules: [{required: true, message: '功夫描述不能为空'}],
        })(
          <Input/>
        )}
        </FormItem>
    </Form>
  );
})

class CreateKongfu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTags: ['云计算', '大数据'],
      tags: [],

      fields: {
        title: '',
        brief: '',
        surfaceImage: '',
        surfaceBackground: '',
        selectedTags: []
      }
    };
  }

  componentDidMount() {
    getTags().then(res => {
      this.setState({tags: res.data.result.taglist});
    })
  }

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  changeTag = (tag, checked) => {
    for (var i in this.state.fields.selectedTags) {
      if (this.state.fields.selectedTags[i] == tag) {
        if (!checked) {
          this.state.fields.selectedTags.splice(i, 1);
          this.forceUpdate();
          return;
        }
      }
    }

    this.state.fields.selectedTags.push(tag);
    this.forceUpdate();
  }

  done = () => {
    let data = {
      title: this.state.fields.title.value,
      brief: this.state.fields.brief.value,
      level: 'newbie',
      tags: this.state.fields.selectedTags
    };
    createKongfu(data).then(res => {
      if (!res.err) {
        window.location.href = '/home';
      }
    })
  }

  saveFormRef = (formRef) => {
    this.form = formRef;
  }

  render() {

    let valid = this.state.fields.title.value && this.state.fields.brief.value && this.state.fields.selectedTags.length ? true : false;
    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '0 50px'}}>
          <div style={{ background: '#fff', padding: 24, margin: '30px 0', minHeight: 680 }}>
            <Divider style={{fontSize: '28px'}}>创建新功夫</Divider>
            <div style={{width: 800, margin: '0 auto'}}>
              <BasicForm {...this.state.fields} onChange={this.handleFormChange}/>
              <Form.Item
                label='选择标签让别人更容易找到它'
                required
              >
                <div>
                  {this.state.tags.map((tag, index) => {
                    return <MyTag key={tag.id} tag={tag} onChange={this.changeTag}>{tag.name}</MyTag>
                  })}

                </div>
              </Form.Item>
              <Form.Item>
              <Button type="primary" onClick={this.done} disabled={!valid}><Icon type="check" />完成</Button>
              </Form.Item>

            </div>
          </div>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}

export default CreateKongfu;