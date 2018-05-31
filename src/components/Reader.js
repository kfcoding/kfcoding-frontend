import React from 'react';
import { Layout, Row, Col, Tabs } from 'antd';
import CannerEditor from 'kf-slate-editor';
import { Value } from 'slate';
import './Editor.css';
import MyHeader from './Header';

import request from "../utils/request";
import { getKongfu, createTerminal } from "../services/kongfu";
import Term from "./Term";

const {Content, Sider} = Layout;
const TabPane = Tabs.TabPane;

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kongfu: {
        title: ''
      },
      kongfu_id: this.props.match.params.kongfu_id,
      currentPage: null,
      currentValue: null,
      meta: null,
      prefix: 'http://oss.book.kfcoding.com/' + this.props.match.params.kongfu_id,
      activeKey: '1',
      panes: [],
      terminalIdx: 1,
    };

    createTerminal('nginx').then(res => {
      console.log(res);//return;
      setTimeout(() => {
        let idx = this.state.terminalIdx++;
        this.state.panes.push({
          title: 'Terminal ' + idx,
          content: <Term ws={res.data.result.WsAddr}/>,
          key: idx + ''
        })
        this.setState({panes: this.state.panes})
      }, 5000)

    })

  }

  componentWillMount() {

    request(this.state.prefix + '/meta.json').then(res => {
      this.setState({meta: res.data}, () => {
        if (this.state.meta.pages.length) {
          this.openPage(this.state.meta.pages[0]);
        }
      });
    });

    getKongfu(this.state.kongfu_id).then(res => {
      this.setState({kongfu: res.data.result.kongfu})
    })
    // createTerminal('nginx').then(res => {
    //   console.log(res);//return;
    //   this.state.panes.push({
    //     title: 'Termianl 1',
    //     content: <Term ws={res.data.result.WsAddr}/>,
    //     key: '1'
    //   })
    //   this.setState({panes: this.state.panes})
    // })
  }

  componentDidMount() {

  }

  openPage = (page) => {
    if (this.state.currentPage == page) {
      return;
    }
    request('http://oss.book.kfcoding.com/' + this.state.kongfu_id + '/' + page.file).then(res => {
      if (res.err) {
        return;
      }
      this.state.currentPage = page;
      this.setState({currentValue: Value.fromJSON(res.data)});
    })
  }

  onMenuClick(page) {
    this.openPage(page);
  }

  getPageList = (page) => {
    if (!page.pages) {
      page.pages = [];
    }
    let children = page.pages.map(p => {
      return this.getPageList(p);
    })

    let style = {
      height: '40px',
      lineHeight: '40px',
      cursor: 'pointer',
      padding: '0 20px 0 ' + this._getDepth(page) * 20 + 'px'
    };
    if (this.state.currentPage == page) {
      style.background = '#e6f7ff';
      style.color = '#1890ff';
      style.borderRight = '4px solid #1890ff';
    }

    return (
      <div key={page.file}>
        <div className='menu' style={style} onClick={this.onMenuClick.bind(this, page)}>
          {page == this.state.editTitlePage ?
            <input autoFocus type='text' value={page.title} onKeyDown={this.saveTitle}
                   onChange={this.changeTitle.bind(this, page)} style={{border: '0', height: '30px'}}/>
            :
            <span>{page.title}</span>
          }
        </div>
        {children}
      </div>
    );
  }

  _findParent = (parent, page) => {
    for (var i in parent.pages) {
      let p = parent.pages[i];
      if (p === page) {
        return parent;
      } else {
        let prt = this._findParent(p, page);
        if (prt) {
          return prt;
        }
      }
    }
  }

  _getDepth = (page) => {
    let depth = 0;
    let parent = this._findParent(this.state.meta, page);
    while (parent) {
      depth++;
      parent = this._findParent(this.state.meta, parent);
    }
    return depth;
  }

  // onChange = (activeKey) => {
  //   this.setState({activeKey: activeKey});
  // }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    createTerminal('nginx').then(res => {
      console.log(res);//return;
      setTimeout(() => {
        let idx = this.state.terminalIdx++;
        const activeKey = idx + '';
        let panel = {
          title: 'Terminal ' + idx,
          content: <Term ws={res.data.result.WsAddr}/>,
          key: idx + ''
        }
        panes.push(panel);
        this.setState({panes, activeKey});
      }, 2000)

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

  render() {
    const {meta} = this.state;
    if (!meta) return null;

    let rpages = this.state.meta.pages.map(p => {
      return this.getPageList(p)
    })

    let editor = this.state.currentPage ? (
      <CannerEditor
        className='editor'
        value={this.state.currentValue}
        style={{minHeight: '100%'}}
        onChange={this.onChange}
        readOnly={true}
      />
    ) : null;
console.log('ls', this.state.activeKey)
    return (
      <Layout style={{height: '100%'}}>
        <Sider width={250} style={{
          background: '#fff',
          borderRight: '1px solid #eee',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
               breakpoint="lg"
               collapsedWidth="0"
               trigger="null"
               onCollapse={(collapsed, type) => {
                 console.log(collapsed, type);
               }}
        >
          <h3 style={{padding: '20px 0 0px 20px'}}>{this.state.kongfu.title}</h3>
          <div style={{marginTop: '20px'}}>
            {rpages}

          </div>

        </Sider>
        <Layout style={{background: '#f0f2f5', marginLeft: 250, height: '100%', overflow: 'hidden'}}>

          <MyHeader style={{width: '100%', paddingLeft: 20}}/>
          <Content>
            <Row>
              <Col span={14}>
                <div
                  style={{height: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'scroll', position: 'relative'}}>
                  {editor}
                </div>
              </Col>
              <Col span={10}>
                <div style={{background: '#000', height: 'calc(100vh - 64px)'}}>
                  <Tabs
                    // hideAdd
                    //onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    defaultActiveKey="1"
                    type="editable-card"
                    onEdit={this.onEdit}
                  >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                  </Tabs>
                </div>
              </Col>
            </Row>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Reader;