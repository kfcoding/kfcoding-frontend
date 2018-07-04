import React from 'react';
import { Layout, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import MyHeader from "../Index/Header";
import MyFooter from "../Footer";
import pic from '../../assets/pic.png';
import { emailSignup, currentUser } from "../../services/users";

const FormItem = Form.Item;
const { Content, Sider } = Layout;

const BasicForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      email_address: Form.createFormField({
        ...props.email_address,
        value: props.email_address.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      nickname: Form.createFormField({
        ...props.nickname,
        value: props.nickname.value,
      }),
      city: Form.createFormField({
        ...props.city,
        value: props.city.value,
      }),
      company: Form.createFormField({
        ...props.company,
        value: props.company.value,
      }),
      profession: Form.createFormField({
        ...props.profession,
        value: props.profession.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
  })((props) => {
    const { getFieldDecorator } = props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 16 },
      },
    };

    return (
      <Form>
        <FormItem label='邮箱' {...formItemLayout}>
          {getFieldDecorator('email_address', {
            rules: [{ required: true, message: 'Please input your email address!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
          )}
        </FormItem>

        <FormItem label='密码' {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <FormItem label='昵称' {...formItemLayout}>
          {getFieldDecorator('nickname', {
            rules: [{ required: false }],
          })(
            <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" />
          )}
        </FormItem>

        <FormItem label='城市' {...formItemLayout}>
          {getFieldDecorator('city', {
            rules: [{ required: false }],
          })(
            <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="City" />
          )}
        </FormItem>

        <FormItem label='公司' {...formItemLayout}>
          {getFieldDecorator('company', {
            rules: [{ required: false }],
          })(
            <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Company" />
          )}
        </FormItem>

        <FormItem label='职位' {...formItemLayout}>
          {getFieldDecorator('profession', {
            rules: [{ required: false }],
          })(
            <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Profession" />
          )}
        </FormItem>
      </Form>
    );
  }
);


class WrappedSignUp extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        nickname: {value: ''},
        password: {value: ''},
        email_address: {value: ''},
        city: {value: ''},
        company: {value: ''},
        profession: {value: ''}
      },
    }
  }

  handleSubmit = () => {
    var myDate = new Date();
    console.log(this.state)

    let data = {
      city: this.state.fields.city.value,
      company: this.state.fields.company.value,
      email: this.state.fields.email_address.value,
      name: this.state.fields.nickname.value,
      password: this.state.fields.password.value,
      profession: this.state.fields.profession.value,
    };

    emailSignup(data).then(res => {
      if (res.err) {
        message.error('注册失败，邮箱已注册');
        return;
      }
      localStorage.setItem('token', res.data.result.token);
      message.success('注册成功');
      currentUser().then(res => {
        localStorage.setItem('uid', res.data.result.user.id);
        localStorage.setItem('user', JSON.stringify(res.data.result.user));
        window.location.replace('/home');
      });
    });
  }

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  render(){
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 4,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    return (
      <Layout>
          <MyHeader/>
          <Content style={{ padding: '50px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={400} style={{ background: '#fff', paddingLeft: '20px' }}>
                <div className="img-wrapper" key="image">
                  <img style={{width:'100%' , height:'100%'}} src={pic}/>
                </div>
              </Sider>
              <Content>
                <div style={{ background: '#fff', padding: 24, paddingRight:300, minHeight: 280, overflow: 'auto' }}>
                  <BasicForm {...this.state.fields} onChange={this.handleFormChange}/>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                    <span style={{float: 'right'}}>
                      <a href="/emailentry/signin">已有账号，马上登录！</a>
                    </span>
                  </FormItem>
                </div>
              </Content>
            </Layout>
          </Content>
          <MyFooter/>
        </Layout>
    );
  }
}

export default WrappedSignUp;
