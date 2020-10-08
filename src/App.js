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
// import Welcome from './Components/Main/Welcome/WelcomeScreen'
// import Dashboard from './Components/Main/Dashboard/Dashboard'
import BottomUI from './Components/Main/BottomContainer'

import './App.css';

class App extends Component {

  state = {
    login:false,
    logout:false,
    register:false,
    access:{
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
      this.state.login === true ?
      <Login></Login>
      :this.state.register === true ?
      <Register />
      :null
    }
    </React.Fragment>
    )
  }
}

export default App;
