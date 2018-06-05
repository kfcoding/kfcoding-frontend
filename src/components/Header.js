import React from 'react';
import { Layout, Dropdown, Avatar, Icon, Menu } from 'antd';
import { getUser} from "../services/users";
import logo from '../assets/logo-min.png';

const { Header } = Layout;

const menu = (
  <Menu style={{marginTop: '10px'}}>
    {/*<Menu.Item>*/}
    {/*<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"><Icon type="user"/> 个人信息</a>*/}
    {/*</Menu.Item>*/}
    {/*<Menu.Divider/>*/}
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="//"><Icon type="poweroff"/> 退出</a>
    </Menu.Item>
  </Menu>
);

class MyHeader extends React.Component {
  render() {
    return (
      <Header className='header' style={this.props.style}>
        {this.props.children}
        <span style={{color: '#fff', fontSize: '24px'}}>
          <a href="/library" style={{color: '#fff'}}><img src="//static.cloudwarehub.com/logo-min.png?x-oss-process=style/logo" style={{width: '80px'}}/> 功夫编程</a>
        </span>
        <span style={{float: 'right'}}>
          {/*<Dropdown overlay={menu}>*/}
            <a className="ant-dropdown-link" href="/home">
              <Avatar src={ getUser().avatarUrl}></Avatar>
              <span style={{color: '#fff', padding: '0 15px'}}>{ getUser().name }</span>
              {/*<Icon type="down" style={{color: '#fff'}}/>*/}
            </a>
          {/*</Dropdown>*/}

        </span>
      </Header>
    )
  }
}

export default MyHeader;