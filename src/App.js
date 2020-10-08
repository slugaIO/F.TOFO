import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Login from './Components/Main/Login'
import Register from './Components/Main/Register'
import Welcome from './Components/Main/Welcome/WelcomeScreen'
import Dashboard from './Components/Main/Dashboard/Dashboard'
import TopBar from './Components/Main/Navigation/AppBar'

import './App.css';

class App extends Component {
  state = {
    navigation:{
      welcome:true
    },
    dashboard:{},
    access:{
      accessToken:'access Token',
      refreshToken:'refresh Token',
      isAuthorized:false
    }
  }

  updateState = (object) =>{
    this.setState(object);
  }

  render() {
    const style = {
      root:{
        flexGrow:1
      },
      menuButton:{
        
      },
      title:{
        flexGrow:1
      },
      content:{
        backgroundColor:'#CCC',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }
    }
    return (
      <React.Fragment>
      <TopBar updateState={this.updateState.bind(this)} isAuthorized={this.state.access.isAuthorized}/>
    {
       this.state.navigation.welcome === true ?
       <React.Fragment>
          <Welcome/>
       </React.Fragment>
       :
       this.state.navigation.login === true ?
       <Login updateState={this.updateState.bind(this)} />
       :
       this.state.navigation.register === true ? 
       <Register/>
       :
       this.state.access.isAuthorized === true ?
       <Dashboard/>
       :null
    }
    </React.Fragment>
    )
  }
}

export default App;
