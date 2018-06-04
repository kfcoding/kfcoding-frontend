import React from 'react';
import { Tabs, Icon, Menu, Dropdown } from 'antd';
import Term from '../Term';
import { createTerminal } from "../../services/kongfu";

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
    createTerminal(type).then(res => {
      console.log(res);//return;
      panes.push({
        title: type + '-' + idx,
        content: <Term ws={res.data.result.WsAddr}/>,
        key: idx + ''
      })
      this.setState({panes, activeKey})
    })
    // createTerminal('terminal-' + idx).then(res => {
    //   console.log(res);//return;
    //   setTimeout(() => {
    //
    //     let panel = {
    //       title: 'Terminal ' + idx,
    //       content: <Term ws={res.data.result.WsAddr}/>,
    //       key: idx + ''
    //     }
    //     panes.push(panel);
    //     this.setState({panes, activeKey});
    //   }, 2000)
    //
    // })
    // fetch('http://terminal.wss.kfcoding.com/api/v1/pod/kfcoding-alpha/terminal-' + idx + '/shell/application').then(res => {
    //   console.log(res);//return;
    //   res.text().then(res => {console.log(res)
    //     setTimeout(() => {
    //       this.state.panes.push({
    //         title: 'Terminal ' + idx,
    //         content: <Term ws={res}/>,
    //         key: idx + ''
    //       })
    //       this.setState({panes: this.state.panes, activeKey: activeKey})
    //     }, 1000)
    //   })
    //
    // })
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
          Busybox
        </Menu.Item>
        <Menu.Item key="python">
          Python
        </Menu.Item>
        <Menu.Item key="nodejs">Nodejs</Menu.Item>
        <Menu.Item key="nginx">Nginx</Menu.Item>
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
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}

export default TrainPanel;