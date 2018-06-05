import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import MyHeader from "../Header";
import MyFooter from "../Footer";
import { getAllKongfu } from "../../services/kongfu";
import Book from "../Book";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

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
          <a href={viewhref} style={{display: 'block', width: '240px', height: '320px'}}>
            <Book key={kf.id} book={kf}/>
          </a>
        </div>
      )
    });

    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '50 50px', margin: 50}}>
          <div style={{background: '#fff', padding: 24, minHeight: 680, overflow: 'auto'}}>
            {kongfus}
          </div>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}

export default Library;