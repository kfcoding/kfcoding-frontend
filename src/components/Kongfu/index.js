import React from 'react';
import { Layout, Divider, Button, Menu, Icon, Tabs, Card, Row, Col, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import MyHeader from "../Header";
import MyFooter from "../Footer";
import { getKongfu } from "../../services/kongfu";
import Book from "../Book";
import { getUser } from "../../services/users";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class Kongfu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kongfu_id: this.props.match.params.kongfu_id,
      kongfu: {
        title: ''
      },
      author: {
        name: '',
        avatarUrl: ''
      }

    }
  }

  componentDidMount() {
    getKongfu(this.state.kongfu_id).then(res => {
      this.setState({kongfu: res.data.result.kongfu});
      getUser(res.data.result.kongfu.userId).then(ures => {
        this.setState({author: ures.data.result.user})
      })
    })
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }
  render() {

    return (
      <Layout>
        <MyHeader/>
        <Content style={{ padding: '50px' }}>
          <Layout>
            <Sider width={270} style={{ background: '#f0f2f5' }}>
              <div style={{overflow: 'visible', padding: '0 0 30px 0'}}>
                <a href='#' style={{display: 'block'}}>
                <Book book={this.state.kongfu}/>
                </a>
                <div style={{paddingTop: '30px', textAlign: 'center'}}>
                  <ButtonGroup>
                    <Button type="primary" icon="eye" href={'/reader/' + this.state.kongfu.id}>阅读</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Sider>
            <Content>
              <Row gutter={16}>
                <Col span={18}>
                  <Card title={this.state.kongfu.title}>
                    <p>{this.state.kongfu.brief}</p>
                  </Card>
                </Col>
                <Col span={6}>

                  <Card title="作者">
                    <Link to={'/users/' + this.state.author.id}>
                      <Avatar src={this.state.author.avatarUrl} />
                      <span style={{marginLeft: '20px'}}>{this.state.author.name}</span>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>



        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}

export default Kongfu;