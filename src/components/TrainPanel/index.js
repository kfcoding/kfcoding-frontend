import React from 'react';
import { Tabs, Icon, Menu, Dropdown } from 'antd';
import Term from '../Term';
import { createTerminal, createCloudware } from "../../services/kongfu";
import './style.css';
import Cloudware from "./Cloudware";

const TabPane = Tabs.TabPane;

class TrainPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      panes: [],
      terminalIdx: 1,
      activeKey: '1',
    }
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = (type) => {
    const panes = this.state.panes;
    let idx = this.state.terminalIdx++;
    const activeKey = idx + '';
    if (type == 'daocloud.io/shaoling/kfcoding-rstudio-latest:master') {
      createCloudware(type).then(res => {
        console.log(res)
        panes.push({
          title: 'Rstudio-' + idx,
          content: <Cloudware ws={'ws://' + res.data.result.webSocketAddress} pod={res.data.result.podResult.metadata.name}/>,
          key: idx + ''
        })
        this.setState({panes, activeKey})
      })
      return;
    }
    createTerminal(type).then(res => {
      console.log(res);//return;
      let name = type;
      if (type == 'busybox') {
        name = 'Linux工具库';
      } else if (type == 'nginx') {
        name = 'Nginx服务器'
      } else if (type == 'node') {
        name = 'Nodejs环境'
      } else if (type == 'kfcoding.com/git:v1.0') {
        name = 'Git'
      }
      panes.push({
        title: name + '-' + idx,
        content: <Term ws={res.data.result.WsAddr} style={{height: '100%'}}/>,
        key: idx + ''
      })
      this.setState({panes, activeKey})
    })

  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({panes, activeKey});
  }

  onChangeTab = (activeKey) => {
    this.setState({activeKey})
  }

  onExtraClick = ({key}) => {
    this.add(key)
  }

  render() {
    const menu = (
      <Menu onClick={this.onExtraClick}>
        <Menu.Item key="busybox">
          Linux工具库
        </Menu.Item>
        <Menu.Item key="python">
          Python环境
        </Menu.Item>
        <Menu.Item key="node">Nodejs环境</Menu.Item>
        <Menu.Item key="nginx">Nginx服务器</Menu.Item>
        <Menu.Item key='kfcoding.com/git:v1.0'>Git环境</Menu.Item>
        <Menu.Item key='daocloud.io/shaoling/kfcoding-rstudio-latest:master'>Rstudio(GUI)</Menu.Item>
      </Menu>
    );

    let extra = (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" style={{fontSize: '20px', marginRight: 10}} href="#">
          <Icon type="plus-square-o"/>
        </a>
      </Dropdown>
    )
    return (
      <div style={{background: '#000', height: 'calc(100vh - 64px)'}}>
        <Tabs
          hideAdd
          onChange={this.onChangeTab}
          activeKey={this.state.activeKey}
          defaultActiveKey="1"
          type="editable-card"
          onEdit={this.onEdit}
          tabBarExtraContent={extra}
          style={{height: '100%'}}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} style={{height: '100%'}}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}

export default TrainPanel;