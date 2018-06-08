import React from 'react';
import { Layout, Menu, Icon, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import MyHeader from "../Header";
import MyFooter from "../Footer";
import { getAllKongfu, getKongfuByTag, getTags } from "../../services/kongfu";
import Book from "../Book";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TabPane = Tabs.TabPane;

class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      kongfus: [],
      currentTag: null,
      tags: []
    }
  }

  componentDidMount() {
    getAllKongfu().then(res => {
      this.setState({kongfus: res.data.result.kongfus})
    });

    getTags().then(res => {
      this.setState({tags: res.data.result.taglist})
    })
  }

  _getIconType = (name) => {
    switch (name) {
      case '大数据':
        return 'global';
      case '云计算':
        return 'cloud';
      case '操作系统':
        return 'laptop';
      case '机器学习':
        return 'api';
      default:
        return 'database';
    }
  }

  onMenuClick = ({item, key}) => {
    console.log(item, key)
    if (key == 0) {
      getAllKongfu().then(res => {
        this.setState({kongfus: res.data.result.kongfus})
      });
      return;
    }
    getKongfuByTag(key).then(res => {
      this.setState({kongfus: res.data.result.kongfuList.records})
    })
  }

  render() {

    let kongfus = this.state.kongfus.map((kf) => {
      let viewhref = '/kongfu/' + kf.id;
      let edithref = '/editor/' + kf.id;
      return (
        <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}} key={kf.id}>
            <Link to={viewhref} style={{display: 'block', width: '240px', height: '320px'}}>
            <Book key={kf.id} book={kf}/>
            </Link>
        </div>
      )
    });

    let rtags = this.state.tags.map(t => {
      return <Menu.Item key={t.id}><Icon type={this._getIconType(t.name)} />{t.name}</Menu.Item>
    })

    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '50 50px', margin: 50}}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                onClick={this.onMenuClick}
              >
                <Menu.Item key="0"><Icon type="profile" />所有编程秘籍</Menu.Item>
                {rtags}
                  {/*<Menu.Item key="1"><Icon type="global" />大数据</Menu.Item>*/}
                  {/*<Menu.Item key="2"><Icon type="cloud" />云计算</Menu.Item>*/}
                  {/*<Menu.Item key="3"><Icon type="api" />人工智能</Menu.Item>*/}
                {/*<Menu.Item key="4"><Icon type="share-alt" />网络</Menu.Item>*/}
                {/*<Menu.Item key="5"><Icon type="laptop" />操作系统</Menu.Item>*/}
                {/*<Menu.Item key="6"><Icon type="form" />编程语言</Menu.Item>*/}
                {/*<Menu.Item key="7"><Icon type="database" />数据库</Menu.Item>*/}
                {/*<Menu.Item key="8"><Icon type="calculator" />算法</Menu.Item>*/}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div style={{background: '#fff', paddingLeft: 20, minHeight: 680, overflow: 'auto'}}>
                {kongfus.length ?
                  kongfus
                  :
                  <p>暂时还没有该类型的秘籍，你可以<Link to='/kongfu/create'>创建一门编程秘籍</Link></p>
                }

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