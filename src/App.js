import React, { Component } from 'react';

import Register from './Components/Main/Register'
import MenuTop from './Components/navigation/menu'
import Dashboard from './Components/Main/Dashboard/Dashboard'
import Welcome from './Components/Main/Welcome/Welcome'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

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
  render() {
    return (
      <React.Fragment>
      <Router>
      { 
        // sobald dieser Flog gesetzt wird (login/register) kommt man zum Dashboard
        this.state.isLoggedIn ? <Redirect to='/dashboard'/>:null
      }
      <MenuTop isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)}/>
     <Switch>
         <Route path='/' exact component={Welcome} />
         <Route 
            path='/register' 
            exact 
            render={props => (
                <Register {...props}  isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />
              )
            }
          />
          <Route 
          path='/dashboard' 
          exact 
          render={props => (
              <Dashboard {...props}  isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />
            )
          }
        />
     </Switch>
     </Router>
    </React.Fragment>
    )
  }
}

export default App;
