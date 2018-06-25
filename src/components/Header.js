import React from 'react';
import { Layout, Dropdown, Avatar, Icon, Menu, Popover } from 'antd';
import { getUser } from "../services/users";
import { Link } from 'react-router-dom';
import './Header.css';

const {Header} = Layout;

const menu = (
  <Menu>
    {/*<Menu.Item>*/}
    {/*<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"><Icon type="user"/> 个人信息</a>*/}
    {/*</Menu.Item>*/}
    {/*<Menu.Divider/>*/}
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="//"><Icon type="poweroff"/> 退出</a>
    </Menu.Item>
  </Menu>
);

const createMenu = (
  <Menu>
    <Menu.Item>
      <Link to='/kongfu/create'><Icon type="plus" />创建新功夫</Link>
    </Menu.Item>
  </Menu>
)

class MyHeader extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Header className='header' style={this.props.style}>
        <div className='logo' style={{color: '#fff', fontSize: '24px', marginRight: '30px', float: 'left'}}>
        {this.props.children}
          <Link to="/" style={{color: '#fff'}}><img
            src="//static.cloudwarehub.com/logo-min.png?x-oss-process=style/logo" style={{width: '80px'}}/> 功夫编程</Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['']}
          style={{lineHeight: '64px', float: 'left'}}
        >
          <Menu.Item key="1"><Link to='/library'>功夫图书馆</Link></Menu.Item>
          <Menu.Item key="2" disabled>
            <Popover content='即将上线'>
              编程擂台
            </Popover>
          </Menu.Item>
        </Menu>
        <span style={{float: 'right'}}>

          <Dropdown overlay={createMenu} style={{float: 'right'}}>
            <Icon className='create-btn' type="plus-circle" style={{fontSize: 24, color: 'white', marginTop: '20px', marginRight: 30}}/>
          </Dropdown>
          {/*<Dropdown overlay={menu}>*/}
          <div style={{float: 'right'}}>
            <Link to='/home'>
              <Avatar src={getUser().avatarUrl}></Avatar>
              <span style={{color: '#fff', padding: '0 15px'}}>{getUser().name}</span>
            {/*<Icon type="down" style={{color: '#fff'}}/>*/}
            </Link>
          </div>
          {/*</Dropdown>*/}

        </span>
      </Header>
    )
  }
}

export default MyHeader;