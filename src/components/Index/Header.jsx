import React from 'react';
import { Layout, Button } from 'antd';
import { currentUser } from "../../services/users";
import { openWindow } from "../../utils/openWindow";

const { Header } = Layout;

class MyHeader extends React.Component {
    login = () => {
      openWindow(
        'https://github.com/login/oauth/authorize?client_id=1eb243e826a117b3e138&',
        '登录',
        600,
        600
      );
      window.addEventListener('message', (m) => {
        localStorage.setItem('token', m.data.token);
        currentUser().then(res => {
          console.log(res)
          localStorage.setItem('uid', res.data.result.user.id);
          localStorage.setItem('user', JSON.stringify(res.data.result.user));
          window.location.replace('/home');
        });
      })
  }
  render() {
    return (
      <Header className='header ant-layout-indexHeader' style={this.props.style}>
        {this.props.children}
        <span style={{color: '#fff', fontSize: '24px'}}>
          <a href="/" style={{color: '#fff'}}><img src="//static.cloudwarehub.com/logo-min.png?x-oss-process=style/logo" style={{width: '80px'}}/> 功夫编程</a>
        </span>
        <span style={{float: 'right'}}>
            <Button type='primary' icon='github' size='large' onClick={this.login}>Github登录</Button>
        </span>
      </Header>
    )
  }
}

export default MyHeader;
