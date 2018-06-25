import React from 'react';
import styles from './Library.css';
import {message, Modal, Layout, Divider, Button, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Book from "../components/Book";
import {getMyKongfu} from "../services/users";
import {createKongfu, deleteKongfu} from "../services/kongfu";
import MyHeader from "./Header";
import MyFooter from "./Footer";

const {Content, Sider} = Layout;
const ButtonGroup = Button.Group;
const {SubMenu} = Menu;
const confirm = Modal.confirm;

class Home extends React.Component {

  state = {
    loading: false,
    visible: false,
    kongfus: [],
    isRefresh: false,
    deleteVisible: false,
  }


  showDeleteConfirm(id) {
    console.log(this.state);
    const self = this;
    confirm({
      title: '确定删除该功夫？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteKongfu(id).then(res => {
          if (res.data.code == 200) {
            message.success("删除ç成功");
            // 重新加载
            getMyKongfu().then(res => {
              self.setState({kongfus: res.data.result.kongfuList})
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
    getMyKongfu().then(res => {
      this.setState({kongfus: res.data.result.kongfuList})
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
      createKongfu(values).then(res => {
        getMyKongfu().then(res => {
          this.setState({kongfus: res.data.result.kongfuList})
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

    let kongfus = this.state.kongfus.map((kf) => {
      let viewhref = '/reader/' + kf.id;
      let edithref = '/editor/' + kf.id;
      let settinghref = '/kongfu/' + kf.id + '/settings';
      let deletehref = '/kongfu/delete/' + kf.id;
      return (
        <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}}>
          <a href='#' style={{display: 'block', width: '240px', height: '320px', marginLeft: '40px'}}>
            <Book key={kf.id} book={kf}/>
          </a>
          <div style={{paddingTop: '30px', textAlign: 'center'}}>
            <ButtonGroup>
              <Button type="primary" icon="eye" href={viewhref}>阅读</Button>
              <Button type="primary" icon="edit" href={edithref}>编辑</Button>
              <Button type="primary" icon="setting" href={settinghref}>设置</Button>
              <Button onClick={() => this.showDeleteConfirm(kf.id)} type="primary" icon="delete">
                删除
              </Button>
            </ButtonGroup>
          </div>
        </div>
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
                  <Menu.Item key="1">我创建的秘籍</Menu.Item>
                  {/*<Menu.Item key="2">我收藏的秘籍</Menu.Item>*/}
                </SubMenu>

              </Menu>
            </Sider>
            <Content>
              <div style={{background: '#fff', padding: 24, minHeight: 280, overflow: 'auto'}}>
                <Divider orientation="left" style={{fontSize: '28px'}}>藏经阁</Divider>
                {kongfus}
                <Link to='/kongfu/create'>
                  <div className='container'>
                    <div className='book'>
                      <div className='front'>
                        <div className='addCover' style={{backgroundColor: '#525485'}}>
                          <h2>
                            <span>{username}</span>
                            <span>添加秘籍</span>
                          </h2>
                        </div>
                      </div>

                      <div className='left' style={{backgroundColor: '#525485'}}>
                        <h2>
                          <span>作者</span>
                          <span>名称</span>
                        </h2>
                      </div>
                    </div>
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

export default (Home);