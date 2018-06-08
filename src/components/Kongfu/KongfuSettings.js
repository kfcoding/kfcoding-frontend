import React from 'react';
import { Layout, Divider, Button, Steps, message, Form, Input, Upload, Icon, Tag, Menu, Switch } from 'antd';
import MyHeader from "../Header";
import MyFooter from "../Footer";
import { createKongfu, getKongfu, getTags, updateKongfu } from "../../services/kongfu";
import Book from "../Book";
import { getUser } from "../../services/users";

const FormItem = Form.Item;
const { CheckableTag } = Tag;
const { Content, Sider } = Layout;

class MyTag extends React.Component {

  state = { checked: this.props.checked == true ? true : false };
  handleChange = (checked) => {
    this.setState({ checked });
    this.props.onChange(this.props.tag, checked)
  }
  render() {console.log(this.props.checked)
    return <CheckableTag {...this.props} checked={this.props.checked} onChange={this.handleChange} />;
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

class KongfuSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kongfu_id: this.props.match.params.kongfu_id,
      kongfu: {
        title: ''
      },
      tags: [],

      fields: {
        title: {
          value: ''
        },
        brief: '',
        surfaceImage: '',
        surfaceBackground: '',
        tags: []
      },
      status: 'public'
    }
  }

  componentDidMount() {
    getKongfu(this.state.kongfu_id).then(res => {console.log('ok',res.data.result.kongfu.tags);
      this.setState({kongfu: res.data.result.kongfu});
      this.setState({fields: {
        title: {value: res.data.result.kongfu.title},
        brief: {value: res.data.result.kongfu.brief},
        tags: res.data.result.kongfu.tags
      }});
    })
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
    for (var i in this.state.fields.tags) {
      if (this.state.fields.tags[i].id == tag.id) {
        if (!checked) {
          this.state.fields.tags.splice(i, 1);
          this.forceUpdate();
          return;
        }
      }
    }

    this.state.fields.tags.push(tag);
    this.forceUpdate();
  }

  done = () => {
    let data = {
      id: this.state.kongfu.id,
      title: this.state.fields.title.value,
      brief: this.state.fields.brief.value,
      level: 'newbie',
      tags: this.state.fields.tags,
      status: this.state.kongfu.status
    };
    updateKongfu(data).then(res => {
      if (!res.err) {
        window.location.href = '/home';
      }
    })
  };

  _checkTagChecked = (tag) => {
    for (var i in this.state.fields.tags) {
      if (this.state.fields.tags[i].id == tag.id) {
        console.log('check', tag)
        return true;
      }
    }
    return false;
  }

  onChangePublish = (checked) => {
    let kongfu = this.state.kongfu;
    if (checked) {
      kongfu.status = 'public';
    } else {
      kongfu.status = 'private';
    }
    this.setState({kongfu: kongfu});
  }

  render() {
    let valid = this.state.fields.title.value && this.state.fields.brief.value && this.state.fields.tags.length ? true : false;

    return (
      <Layout>
        <MyHeader/>
        <Content style={{ padding: '50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={300} style={{ background: '#fff', paddingLeft: '30px' }}>
              <div style={{overflow: 'visible', padding: '0 0 30px 0'}}>
                <a href='#' style={{display: 'block'}}>
                  <Book book={this.state.kongfu}/>
                </a>
              </div>
            </Sider>
            <Content>
              <div style={{ background: '#fff', padding: 24, minHeight: 280, overflow: 'auto' }}>
                <BasicForm {...this.state.fields} onChange={this.handleFormChange}/>
                <Form.Item
                  label='选择标签让别人更容易找到它'
                  required
                >
                  <div>
                    {this.state.tags.map((tag, index) => {
                      return <MyTag key={tag.id} tag={tag} onChange={this.changeTag} checked={this._checkTagChecked(tag)}>{tag.name}</MyTag>
                    })}
                  </div>
                </Form.Item>
                <Form.Item
                  label='是否发布'
                >
                  <Switch checked={this.state.kongfu.status == 'public'} onChange={this.onChangePublish} />,
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.done} disabled={!valid}><Icon type="check" />完成</Button>
                </Form.Item>
              </div>
            </Content>

          </Layout>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}

export default KongfuSettings;