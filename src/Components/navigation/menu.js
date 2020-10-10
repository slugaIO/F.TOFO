import React from 'react';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logger from '../../services/debug/logger'
import AuthService from '../../services/api/auth.service'

import {Link, Redirect} from 'react-router-dom'

class TopNavigation extends React.Component{
    state = {
        isAuthorized : false
    }
    constructor(props){
        super(props);
        this.updateState = props.updateState;
    }
    login = () => {
        this.updateState({
            navigation:{
                login:true
            }
        });
    }
    register = () => {
        this.updateState({
            navigation:{
                register:true
            }
        });
    }
    logout = () => {
        AuthService.removeAuthCookie()
        .then((res) => {
            Logger.table({
                message:'logged out',
                data:'deleted'
            })
        })
        .catch((error) => {
            Logger.table({
                message:'logged out',
                data:'not deleted'
            })
        });
        this.updateState({
            navigation:{
                welcome:true
            },
            access:{
                isAuthorized:false
            }
        });
        this.props.history.push('/dashboard');
    }
    componentWillReceiveProps(props){
        Logger.table({
            message:'Navigation Update',
            isAuthorized:props.isAuthorized
        })
        this.setState(props);
    }
    render(){
        return(
            <React.Fragment>
            {
                this.state.isAuthorized === true ?
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

export default TopNavigation;