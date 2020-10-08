import React from 'react';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

class TopNavigation extends React.Component{
    state = {
        isAuthorized : false
    }
    constructor(props){
        super(props);
        this.isAuthorized = props.isAuthorized;
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
        console.log(`Auth: ${this.state.isAuthorized}`);
        this.updateState({
            navigation:{
                register:true
            }
        });
    }
    logout = () => {
        this.updateState({
            access:{},
            navigation:{
                welcome:true
              }
        });
    }
    componentWillReceiveProps(props){
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
                  <Button color="inherit" onClick={this.login}>Login</Button>
                  <Button color="inherit" onClick={this.register}>Register</Button>
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default TopNavigation;