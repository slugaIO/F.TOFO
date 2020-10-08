import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Login from './Components/Main/Login'
<<<<<<< HEAD
import Register from './Components/Main/Register'
import Welcome from './Components/Main/Welcome/WelcomeScreen'
import Dashboard from './Components/Main/Dashboard/Dashboard'
import TopBar from './Components/Main/Navigation/AppBar'
=======

import BottomUI from './Components/Main/BottomContainer'

>>>>>>> parent of 846ac96... login to dashboard works via API

import './App.css';

class App extends Component {

  state = {
    login:false,
    logout:false,
    register:false
  }

<<<<<<< HEAD
  updateState = (object) =>{
    this.setState(object);
=======
  renderLogin= () =>{
    console.log("renderLogin");
    this.setState({
      login:true
    })
>>>>>>> parent of 846ac96... login to dashboard works via API
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
<<<<<<< HEAD
      <TopBar updateState={this.updateState.bind(this)} isAuthorized={this.state.access.isAuthorized}/>
=======
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
>>>>>>> parent of 846ac96... login to dashboard works via API
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
