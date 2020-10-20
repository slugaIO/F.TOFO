import React, { Component} from 'react';

import Register from './Components/Main/Register'
import MenuTop from './Components/navigation/menu'
import Dashboard from './Components/Main/Dashboard/Dashboard'
import Welcome from './Components/Main/Welcome/Welcome'
import Profile from './Components/Main/profile/profile'
import Sidebar from './Components/navigation/sidebar'
import {Col} from 'react-bootstrap'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import AuthService from './services/api/auth.service'

import './App.css';

require('dotenv').config();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn:false
    }
  }

  onAuthChange(isAuthorized){
      this.setState({
        isLoggedIn:isAuthorized
      })
  }
  updateState = (object) =>{
    this.setState(object);
  }
  componentDidMount(){
    // Prüfen ob das Cookie existiert
    const cookieData = AuthService.getCookieData();
    if(!cookieData) return 
    else{
      AuthService.authCheck(cookieData.token.refreshToken)
      .then((res) => {
        this.setState({isLoggedIn:true});
      })
      .catch((error) => console.log(error));
    }
  }
  dashboardStyle = {
    sidebar:{
        background:'rgba(0, 0, 0, 0.75)',
        padding:'32px',
        borderRight:'2px solid #586069'
    },
    dashboard:{
        backgroundColor: '#fafbfe'
    }
}
  render() {
    if(this.state.isLoggedIn){
      return (
        <Router>
          <div className="fill-window">
            <MenuTop isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)}/>
            <Switch>
              <Route path='/dashboard' render={props => (<Dashboard {...props}  isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />)} />
              <Route path='/profile'   render={props => (<Profile {...props}  />)} />
            </Switch>
          </div>
        </Router>
      )
    }else{
      return (
      <Router>
      <div className="fill-window">
        <MenuTop isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)}/>
        <Switch>
          <Route path='/register' exact render={props => (<Register {...props}  isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />)}/>
          <Route path='/' exact render={props => (<Welcome {...props}  isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />)}/>
        </Switch>
      </div>
      </Router>
      )
    }
  }
}

export default App;
