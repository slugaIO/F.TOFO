import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from 'material-ui/Paper';

import Login from './Components/Main/Login'
import Register from './Components/Main/Register'
import MenuTop from './Components/Main/TopNavigation'
import Welcome from './Components/Main/Welcome/WelcomeScreen'
import Dashboard from './Components/Main/Dashboard/Dashboard'

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
    console.table({
      message:'update',
      data:object
    })
    console.table(object)
    this.setState(object);
    console.table(this.state.access);
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
      },
      appBarSpacer:{
        backgroundColor:'#CCC',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }
    }
    return (
      <React.Fragment>
      <AppBar color="primary" position='sticky'>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={style.title}>
          ToDo
        </Typography>
        <MenuTop updateState={this.updateState.bind(this)} isAuthorized={this.state.access.isAuthorized} />
      </Toolbar>
    </AppBar>
    <Toolbar /> 
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
