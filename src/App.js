import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom'
import './App.css';
import Reader from "./components/Reader";
import KongfuEditor from "./components/Editor";
import Signin from "./components/Signin";
import Callback from "./components/Callback";
import Home from "./components/Home";
import Library from "./components/Library/index";
import Index from './components/Index/index';

class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div style={{height: '100%'}}>

        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/editor/:kongfu_id' component={props => <KongfuEditor {...props}/>}/>
        <Route path='/reader/:kongfu_id' component={props => <Reader {...props}/>}/>
        <Route path='/auth/callback' component={Callback}/>
        <Route path='/home' component={Home}/>
        <Route path='/library' component={Library}/>
        <Route path='/' component={Index}/>
      </div>
    );
  }
}

export default App;
