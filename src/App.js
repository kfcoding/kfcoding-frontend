import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
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
import CreateKongfu from "./components/CreateKongfu";
import KongfuSettings from "./components/Kongfu/KongfuSettings";
import Kongfu from "./components/Kongfu/index";
import UserProfile from "./components/UserProfile";
import Index from './components/Index/index';
import UserSetting from './components/UserSetting';
import CreateWorkspace from "./components/CreateWorkspace";
// import Test from "./components/Test";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Switch>
          <Route path='/' exact component={Index}/>
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/editor/:kongfu_id' component={props => <KongfuEditor {...props}/>}/>
          <Route path='/reader/:kongfu_id' component={props => <Reader {...props}/>}/>
          <Route path='/auth/callback' component={Callback}/>
          <Route path='/home' component={Home}/>
          <Route path='/library' component={Library}/>
          <Route path='/kongfu/create' exact component={CreateKongfu}/>
          <Route path='/kongfu/:kongfu_id' exact component={props => <Kongfu {...props}/>}/>
          <Route path='/kongfu/:kongfu_id/settings' component={props => <KongfuSettings {...props}/>}/>
          <Route path='/users/setting' exact component={UserSetting}/>
          <Route path='/users/:user_id' exact component={props => <UserProfile {...props}/>}/>
          <Route path='/workspace/create' exact component={CreateWorkspace}/>
          {/*<Route path='/test' component={Test}/>*/}
        </Switch>
      </div>
    );
  }
}

export default App;
