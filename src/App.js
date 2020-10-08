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

import BottomUI from './Components/Main/BottomContainer'


import './App.css';

class App extends Component {

  state = {
    login:false,
    logout:false,
    register:false
  }

  renderLogin= () =>{
    console.log("renderLogin");
    this.setState({
      login:true
    })
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
        <Button color="inherit" onClick={this.renderLogin}>Login</Button>
        <Button color="inherit">Register</Button>
        <Button color="inherit">Logout</Button>
        <AccountCircle />
      </Toolbar>
    </AppBar>
    <Toolbar /> 
    {
      this.state.login === true ?
      <Login></Login>
      :null
    }
    </React.Fragment>
    )
  }
}

export default App;
