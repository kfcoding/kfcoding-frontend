import React from 'react';
import { Layout, Divider, Button, Menu, Icon } from 'antd';
import MyHeader from "../Header";
import MyFooter from "../Footer";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class KongfuSettings extends React.Component {
  render() {
    return (
      <Layout>
        <MyHeader/>
        <Content style={{ padding: '50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                  <Menu.Item key="1">基本信息</Menu.Item>
                  <Menu.Item key="2">封面</Menu.Item>

              </Menu>
            </Sider>
            <Content>
              <div style={{ background: '#fff', padding: 24, minHeight: 280, overflow: 'auto' }}>
                123
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