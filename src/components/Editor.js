import React from 'react';
import { Layout, Menu, Dropdown, Icon, Row, Col, Tabs } from 'antd';
import request from "../utils/request";
import { getOssToken, getKongfu, createTerminal } from "../services/kongfu";
import CannerEditor from 'kf-slate-editor';
import { Value } from 'slate';
import styles from './Editor.css';
import MyHeader from './Header';
import Term from './Term';

const {Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;

const Alioss = require('ali-oss');

const initialValue = ({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{
              text: '请开始你的表演！'
            }],
          },
        ],
      },
    ],
  },
});


class KongfuEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      kongfu_id: this.props.match.params.kongfu_id,
      ossclient: null,
      currentPage: null,
      currentValue: null,
      meta: null,
      dirty: false,
      editTitlePage: null,
      kongfu: {
        title: ''
      },
      activeKey: '1',
      panes: [],
      terminalIdx: 1,
      showLeft: true
    };

    this.saveTimer();
  }

  componentWillMount() {
    let kongfu_id = this.state.kongfu_id;
    getOssToken(kongfu_id).then(res => {
      var client = new Alioss.Wrapper({
        region: 'oss-cn-hangzhou',
        //endpoint: 'oss.book.kfcoding.com',
        accessKeyId: res.data.result.assumeRoleResponse.credentials.accessKeyId,
        accessKeySecret: res.data.result.assumeRoleResponse.credentials.accessKeySecret,
        stsToken: res.data.result.assumeRoleResponse.credentials.securityToken,
        bucket: 'kfcoding'
      });
      this.state.ossclient = client;

      request(client.signatureUrl(kongfu_id + '/meta.json')).then(res => {

        // meta.json contains pages meta info
        if (res.err && res.err.response.status === 404) {
          let meta = {
            id: kongfu_id,
            pages: []
          };
          client.put(kongfu_id + '/meta.json', new Alioss.Buffer(JSON.stringify(meta)));
          this.setState({meta: meta})
        } else {
          this.setState({meta: res.data});
        }

        if (this.state.meta.pages.length) {
          this.openPage(this.state.meta.pages[0]);
        }
      })
    })
    getKongfu(this.state.kongfu_id).then(res => {
      this.setState({kongfu: res.data.result.kongfu})
    })
  }

  saveTimer() {
    setInterval(() => {
      if (this.state.dirty) {
        this._saveCurrentPage();
      }
    }, 5000)

  }

  _saveCurrentPage() {
    let page = this.state.currentPage;

    let filename = this.state.kongfu_id + '/' + page.file;
    let pushdata = this.state.currentValue.toJSON();

    this.state.ossclient.put(filename, new Alioss.Buffer(JSON.stringify(pushdata))).then(() => {
      this.state.dirty = false;
    })
  }

  addPage = ({parent}) => {
    if (!parent) {
      parent = this.state.meta;
    }
    var title = prompt('请输入章节名称', '新章节');
    if (!title) {
      return;
    }
    let page_id = new Date().getTime();
    let page = {
      title: title,
      file: page_id + '.json'
    };
    if (!parent.pages) {
      parent.pages = [];
    }
    parent.pages.push(page);

    this.state.ossclient.put(this.state.kongfu_id + '/meta.json', new Alioss.Buffer(JSON.stringify(this.state.meta)));

    let pushdata = initialValue;

    let filename = this.state.kongfu_id + '/' + page.file;

    this.state.ossclient.put(filename, new Alioss.Buffer(JSON.stringify(pushdata))).then(() => {
      this.state.currentPage = page;
      this.setState({currentValue: Value.fromJSON(initialValue)});
    })

  }

  openPage = (page) => {
    if (this.state.currentPage == page) {
      return;
    }
    if (this.state.dirty) {
      this._saveCurrentPage();
      this.state.dirty = false;
    }
    request(this.state.ossclient.signatureUrl(this.state.kongfu_id + '/' + page.file)).then(res => {
      if (res.err) {
        return;
      }
      this.state.currentPage = page;
      this.setState({currentValue: Value.fromJSON(res.data)});
    })
  }

  onContentChange = ({value}) => {


    this.setState({currentValue: value});
    if (value.document != this.state.currentValue.document) {
      this.state.dirty = true;
    }
  }

  changeTitle(page, e) {
    page.title = e.target.value;
    this.forceUpdate()
    e.target.focus()
  }

  saveTitle = (e) => {
    if (e.key == 'Enter') {
      this.state.ossclient.put(this.state.kongfu_id + '/meta.json', new Alioss.Buffer(JSON.stringify(this.state.meta)));
      this.setState({editTitlePage: null});
    }
  }

  onMenuClick(page) {
    this.openPage(page);
    this.setState({currentPage: page});
    this.forceUpdate()
  }

  _deletePage(page) {
    if (page.pages) {
      page.pages.forEach(p => {
        this._deletePage(p);
      })
    }
    this.state.ossclient.delete(this.state.kongfu_id + '/' + page.file);
    let parent = this._findParent(this.state.meta, page);
    for (var i in parent.pages) {
      if (page == parent.pages[i]) {
        parent.pages.splice(i, 1);
      }
    }
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

    let onDropClick = ({key}) => {
      if (key == 'remove') {
        this._deletePage(page);

        this.state.ossclient.put(this.state.kongfu_id + '/meta.json', new Alioss.Buffer(JSON.stringify(this.state.meta))).then(() => {
          this.setState({currentPage: null})
        });
      } else if (key == 'rename') {
        this.setState({editTitlePage: page})
      } else if (key == 'add') {
        this.addPage({parent: page});
      }
    }


    let menu = (
      <Menu onClick={onDropClick}>
        <Menu.Item key="rename">
          <a style={{fontSize: '12px'}}><Icon type="edit" style={{marginRight: '10px'}}/> 重命名</a>
        </Menu.Item>
        <Menu.Item key="add">
          <a style={{fontSize: '12px'}}><Icon type="plus" style={{marginRight: '10px'}}/> 添加子章节</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="remove">
          <a style={{color: '#e05353', fontSize: '12px'}}><Icon type="close" style={{marginRight: '10px'}}/> 删除</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div key={page.file}>
        <div className='menu' style={style} onClick={this.onMenuClick.bind(this, page)}>
          {page == this.state.editTitlePage ?
            <input autoFocus type='text' value={page.title} onKeyDown={this.saveTitle}
                   onChange={this.changeTitle.bind(this, page)} style={{border: '0', height: '30px'}}/>
            :
            <span>{page.title}</span>
          }
          <span className='dropdown'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a href="#">
              <Icon type="ellipsis"/>
            </a>
          </Dropdown>
          </span>
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

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    let idx = this.state.terminalIdx++;
    const activeKey = idx + '';
    // createTerminal('nginx').then(res => {
    //   console.log(res);//return;
    //   setTimeout(() => {
    //     let idx = this.state.terminalIdx++;
    //     const activeKey = idx + '';
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
    fetch('http://terminal.wss.kfcoding.com/api/v1/pod/kfcoding-alpha/terminal-' + idx + '/shell/application').then(res => {
      console.log(res);//return;
      res.text().then(res => {console.log(res)
        setTimeout(() => {
          this.state.panes.push({
            title: 'Terminal ' + idx,
            content: <Term ws={res}/>,
            key: idx + ''
          })
          this.setState({panes: this.state.panes, activeKey: activeKey})
        }, 1000)
      })

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

  toggleLeft = () => {
    this.setState({showLeft: !this.state.showLeft})
  }

  onChangeTab = (activeKey) => {
    this.setState({activeKey})
  }

  render() {
    const {meta} = this.state;
    if (!meta) return null;

    let rpages = this.state.meta.pages.map(p => {
      return this.getPageList(p)
    })

    let editor = this.state.currentPage ? (
      <CannerEditor
        value={this.state.currentValue}
        onChange={this.onContentChange}
        style={{minHeight: '100%'}}
        placeholder='请开始你的表演！'
      />
    ) : null;

    let leftWidth = this.state.showLeft ? 250 : 0;

    let centerLayoutStyle = {
      background: '#f0f2f5',
      marginLeft: leftWidth,
      height: '100%',
      overflow: 'hidden'
    }

    return (
      <Layout style={{height: '100%'}}>
        <Sider width={leftWidth} style={{
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
            <a style={{margin: 20, display: 'block'}} onClick={this.addPage}><Icon type='plus'/> 添加章节</a>
          </div>

        </Sider>
        <Layout style={centerLayoutStyle}>

          <MyHeader style={{width: '100%', paddingLeft: 20}}>
            <Icon onClick={this.toggleLeft} style={{color: '#fff', cursor: 'pointer'}} type="menu-fold" />
          </MyHeader>
          <Content>
            <Row>
              <Col span={15}>
                <div
                  style={{height: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'scroll', position: 'relative'}}>
                  {editor}
                </div>
              </Col>
              <Col span={9}>
                <div style={{background: '#000', height: 'calc(100vh - 64px)'}}>
                  <Tabs
                    // hideAdd
                    onChange={this.onChangeTab}
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

export default KongfuEditor;