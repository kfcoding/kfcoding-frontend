import React, { Component } from 'react';
import { Layout } from 'antd';
import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Reader from "./components/Reader";
import KongfuEditor from "./components/Editor";
import Signin from "./components/Signin";
import Callback from "./components/Callback";
import Library from "./components/Library";
// import CannerEditor from 'kf-slate-editor';
// import {Value} from 'slate';

const {Header, Content, Footer, Sider} = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: ''//Value.fromJSON(initialValue)
    }
  }

  render() {
    let value = this.state.value;
    const onChange = ({value}) => this.setState({value});

    return (
      <Layout style={{height: '100%'}}>
        <MyHeader/>
        {/*<Router>*/}
        <Content>
          <div style={{minHeight: '100%', height: '100%'}}>
            <Route exact path='/signin' component={Signin}/>
            <Route exact path='/editor/:kongfu_id' component={props => <KongfuEditor {...props}/>}/>
            <Route path='/reader/:kongfu_id' component={props => <Reader {...props}/>}/>
            <Route path='/auth/callback' component={Callback}/>
            <Route path='/library' component={Library}/>
          </div>
        </Content>
        {/*</Router>*/}
        <MyFooter/>
      </Layout>
    );
  }
}

export default App;
