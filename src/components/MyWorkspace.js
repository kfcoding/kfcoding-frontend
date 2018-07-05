import React from 'react';
import styles from './Library.css';
import {message, Modal, Layout, Divider, Button, Menu, Icon , Card , Avatar} from 'antd';
import {Link} from 'react-router-dom';
import Book from "../components/Book";
import {getMyKongfu} from "../services/users";
import {createKongfu, deleteKongfu} from "../services/kongfu";
import MyHeader from "./Header";
import MyFooter from "./Footer";
import {getWorkspaceByUser, createWorkSpace} from "../services/workspace";

const {Content, Sider} = Layout;
const ButtonGroup = Button.Group;
const {SubMenu} = Menu;
const confirm = Modal.confirm;
const { Meta } = Card;

class MyWorkspace extends React.Component {

  state = {
    loading: false,
    visible: false,
    workspaces: [],
    isRefresh: false,
    deleteVisible: false,
  }


  showDeleteConfirm(id) {
    console.log(this.state);
    const self = this;
    confirm({
      title: '确定删除该工作空间？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteKongfu(id).then(res => {
          if (res.data.code == 200) {
            message.success("删除ç成功");
            // 重新加载
            getWorkspaceByUser().then(res => {
              self.setState({workspaces: res.data.result.workspaces})
            })
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentWillMount() {
    getWorkspaceByUser().then(res => {
      this.setState({workspaces: res.data.result.workspaces})
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }


  handleCancel = () => {
    this.setState({visible: false});
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var user = JSON.parse(localStorage.getItem('user'));
      values['author'] = user.name;
      values['userId'] = user.id
      console.log('Received values of form: ', values);
      createWorkSpace(values).then(res => {
        getWorkspaceByUser().then(res => {
          this.setState({workspaces: res.data.result.workspaces})
          this.setState({visible: false})
        })
      })
    }).bind(this)
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const {visible, loading} = this.state;

    let workspaces = this.state.workspaces.map((kf) => {
      let viewhref = '/reader/' + kf.id;
      let edithref = '/editor/' + kf.id;
      let settinghref = '/kongfu/' + kf.id + '/settings';
      let deletehref = '/kongfu/delete/' + kf.id;
      return (
        <Link to='/workspace/create'>
          <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}}>
            <Card
              style={{ width: 240 }}
              actions={[<Link to="/home"><Icon type="edit" /></Link>, <Icon type="delete" />]}
            >
              <Meta
                avatar={<Avatar icon="folder" />}
                title="Workspace名称"
                description="git地址"
              />
            </Card>
          </div>
        </Link>
      )
    })

    let username = JSON.parse(localStorage.getItem('user')).name;
    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '50px'}}>
          <Layout style={{padding: '24px 0', background: '#fff'}}>
            <Sider width={200} style={{background: '#fff'}}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
              >
                <SubMenu key="sub1" title={<span><Icon type="wallet"/>藏经阁</span>}>
                  <Menu.Item key="1">
                    <Link to="/home">
                      我创建的秘籍
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/myworkspace">
                      我创建的Workspace
                    </Link>
                   </Menu.Item>
                  {/*<Menu.Item key="2">我收藏的秘籍</Menu.Item>*/}
                </SubMenu>

              </Menu>
            </Sider>
            <Content>
              <div style={{background: '#fff', padding: 24, minHeight: 280, overflow: 'auto'}}>
                <Divider orientation="left" style={{fontSize: '28px'}}>Workspace</Divider>
                {workspaces}
                <Link to='/workspace/create'>
                  <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}}>
                    <Card
                      style={{ width: 240 }}
                      actions={[<Link to="/home"><Icon type="edit" /></Link>, <Icon type="delete" />]}
                    >
                      <Meta
                        avatar={<Avatar icon="folder" />}
                        title="Workspace名称"
                        description="git地址"
                      />
                    </Card>
                  </div>
                </Link>
              </div>
            </Content>
          </Layout>
        </Content>
        <MyFooter></MyFooter>
      </Layout>
    );
  }
}

export default (MyWorkspace);