import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Navigation from './Navigation'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';


class ApplicationBar extends React.Component{
        
    
    constructor(props){
        super(props);
        // this.state.isAuthorized = props.isAuthorized;
        // this.updateState = props.updateState;
    }
    componentWillReceiveProps(props){
       // this.setState(props);
    }
    render() {
        const style = {
            root: {
                flexGrow: 1,
              },
              menuButton: {
                flexGrow: 1,
              },
              title: {
                flexGrow: 1,
              }
        }
        return(
            <div >
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" >
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
          /*
        <React.Fragment>
            <AppBar position='sticky'  style={style.root}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Task List
              </Typography>
              <React.Fragment>
                 <Navigation updateState={this.updateState.bind(this)} isAuthorized={this.state.isAuthorized} style={style.root} />
              </React.Fragment>
            </Toolbar>
          </AppBar>
          <Toolbar /> 
        </React.Fragment>
        */
        )
    }
}

export default ApplicationBar