import React from 'react';
import { Layout, Menu, Icon, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import MyHeader from "../Header";
import MyFooter from "../Footer";
import { getAllKongfu } from "../../services/kongfu";
import Book from "../Book";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TabPane = Tabs.TabPane;

class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      kongfus: []
    }
  }

  componentDidMount() {
    getAllKongfu().then(res => {
      this.setState({kongfus: res.data.result.kongfus})
    })
  }

  render() {

    let kongfus = this.state.kongfus.map((kf) => {
      let viewhref = '/reader/' + kf.id;
      let edithref = '/editor/' + kf.id;
      return (
        <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}} key={kf.id}>
            <Link to={viewhref} style={{display: 'block', width: '240px', height: '320px'}}>
            <Book key={kf.id} book={kf}/>
            </Link>
        </div>
      )
    });

    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '50 50px', margin: 50}}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                  <Menu.Item key="1"><Icon type="global" />大数据</Menu.Item>
                  <Menu.Item key="2"><Icon type="cloud" />云计算</Menu.Item>
                  <Menu.Item key="3"><Icon type="api" />人工智能</Menu.Item>
                <Menu.Item key="4"><Icon type="share-alt" />网络</Menu.Item>
                <Menu.Item key="5"><Icon type="laptop" />操作系统</Menu.Item>
                <Menu.Item key="6"><Icon type="form" />编程语言</Menu.Item>
                <Menu.Item key="7"><Icon type="database" />数据库</Menu.Item>
                <Menu.Item key="8"><Icon type="calculator" />算法</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div style={{background: '#fff', paddingLeft: 20, minHeight: 680, overflow: 'auto'}}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span><Icon type="rocket" />最新</span>} key="1">
                    {kongfus}
                  </TabPane>
                </Tabs>

              </div>
            </Content>
          </Layout>

        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}

export default Library;