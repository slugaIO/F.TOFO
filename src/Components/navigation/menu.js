import React from 'react';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logger from '../../services/debug/logger'
import AuthService from '../../services/api/auth.service'

import {Link, Redirect, withRouter } from 'react-router-dom'

class TopNavigation extends React.Component{
    constructor(props){
        super(props);
    }
    logout = () => {
        AuthService.removeAuthCookie()
        .then((res) => {
            this.props.onAuthChange(false);
        })
        .catch((error) => {
            this.props.onAuthChange(false);
        });
        
    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.isLoggedIn === true ?
                <React.Fragment>
                  <Button color="inherit" onClick={this.logout}>Logout</Button>
                  <AccountCircle />
                </React.Fragment>
                :
                <React.Fragment>
                  <Link to='/login'>
                        <Button color="inherit" onClick={this.login}>Login</Button>
                  </Link>
                  <Link to='/register'>
                        <Button color="inherit" onClick={this.register}>Register</Button>
                  </Link>
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default withRouter(TopNavigation);