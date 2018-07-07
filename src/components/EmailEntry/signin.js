import React from 'react';
import { Layout, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import MyHeader from "../Index/Header";
import MyFooter from "../Footer";
import pic from '../../assets/pic.png';
import { emailSignin, currentUser } from "../../services/users";

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
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
  })((props) => {
    const { getFieldDecorator } = props.form;
    return (
      <Form className="login-form">
        <FormItem label='邮箱'>
          {getFieldDecorator('email_address', {
            rules: [{ required: true, message: 'Please input your email address!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem label='密码'>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <span style={{float: 'right'}}>
            <a className="login-form-forgot" href="">忘记密码</a>
          </span>
        </FormItem>
      </Form>
    );
  }
);


class WrappedSignin extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email_address: {value: ''},
        password: {value: ''}
      }
    };
  }

  handleSubmit = () => {
    let data = {
      credenceName: this.state.fields.email_address.value,
      credenceCode: this.state.fields.password.value,
	  authType: 'password'
    };
    emailSignin(data).then(res => {
      if (res.err) {
        message.error('账号或密码错误');
        return;
      }
      localStorage.setItem('token', res.data.result.token);
      message.success('登录成功');
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
                  <FormItem>
                    <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                      登录
                    </Button>
                    <span style={{float: 'right'}}>
                      <a href="/emailentry/signup">还没账号，马上注册！</a>
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

export default WrappedSignin;
