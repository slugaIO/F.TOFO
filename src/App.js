import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AuthService from './services/api/auth.service'
import Logger from './services/debug/logger'
import Login from './Components/Main/Login'
import Register from './Components/Main/Register'
import MenuTop from './Components/navigation/menu'
import Dashboard from './Components/Main/Dashboard/Dashboard'
import Welcome from './Components/Main/Welcome/Welcome'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './App.css';

require('dotenv').config();

class App extends Component {
  constructor(props){
    super(props);
  }
  state = {
    isLoggedIn:false
  }

  onAuthChange(isAuthorized){
      console.log("auth " + isAuthorized);
      this.setState({
      isLoggedIn:isAuthorized
    })
  }
  updateState = (object) =>{
    this.setState(object);
  }
  componentDidMount(){
    /**
    const userData = AuthService.getAuthCookieData();
    if(!userData){
      this.setState({
        access:{
          isAuthorized:false
        },
        navigation:{
          welcome:true
        }
      });
    }else{
      Logger.table({
        message:'user data',
        token:userData.token,
        user:userData.user
      })
      AuthService.authCheck()
      .then((res) => {
        this.setState({
          access:{
            isAuthorized:true
          },
          navigation:{
            dashboard:true
          }
        });
      })
      .catch(error => {
        this.setState({
          access:{
            isAuthorized:false
          },
          navigation:{
            welcome:true
          }
        });
      })
    }
    **/
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
      <Router>
      <AppBar color="primary" position='sticky'>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={style.title}>
          ToDo
        </Typography>
        {
          
          <MenuTop isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)}/>
        }

      </Toolbar>
    </AppBar>
     <Switch>
         <Route path='/' exact component={Welcome} />
         <Route 
            path='/login' 
            exact 
            render={props => (
                <Login {...props} isLoggedIn={this.state.isLoggedIn} onAuthChange={this.onAuthChange.bind(this)} />
            )}
          />
         <Route 
            path='/register' 
            exact 
            render={props => (
                <Register {...props}  isLoggedIn={this.state.isLoggedIn} />
              )
            }
          />
         <Route path='/dashboard'  
         exact
         render={props => (
              <Dashboard {...props}  isLoggedIn={this.state.isLoggedIn}  />
          )
         }
         />
     </Switch>
     </Router>
     <h1>Check { this.state.isLoggedIn === true ? 'JA' : 'NEIN'}</h1>
    </React.Fragment>
    )
  }
}

export default App;
