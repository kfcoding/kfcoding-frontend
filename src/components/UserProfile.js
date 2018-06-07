import React from 'react';
import { Layout, Divider, Button, Menu, Icon } from 'antd';
import Book from "../components/Book";
import { getMyKongfu } from "../services/users";
import { createKongfu, getUserKongfu } from "../services/kongfu";
import MyHeader from "./Header";
import MyFooter from "./Footer";

const { Content, Sider } = Layout;
const ButtonGroup = Button.Group;
const { SubMenu } = Menu;

class UserProfile extends React.Component {
  state = {
    user_id: this.props.match.params.user_id,
    loading: false,
    visible: false,
    kongfus: [],
    isRefresh: false
  }

  componentWillMount() {
    getUserKongfu(this.state.user_id).then(res => {
      this.setState({kongfus: res.data.result.courses})
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
          this.setState({kongfus: res.data.result.courses})
          this.setState({visible: false})
        })
      })
    })
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
      return (
        <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}}>
          <a href='#' style={{display: 'block', width: '240px', height: '320px'}}>
            <Book key={kf.id} book={kf}/>
          </a>
          <div style={{paddingTop: '30px', textAlign: 'center'}}>
            <ButtonGroup>
              <Button type="primary" icon="eye" href={viewhref}>阅读</Button>
            </ButtonGroup>
          </div>
        </div>
      )
    })

    return (
      <Layout>
        <MyHeader/>
        <Content style={{ padding: '50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>

            <Content>
              <div style={{ background: '#fff', padding: 24, minHeight: 280, overflow: 'auto' }}>
                <Divider orientation="left" style={{fontSize: '28px'}}>藏经阁</Divider>
                {kongfus}
              </div>
            </Content>
          </Layout>
        </Content>
        <MyFooter/>
      </Layout>
    );
  }
}

export default (UserProfile);