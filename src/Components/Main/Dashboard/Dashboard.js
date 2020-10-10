import React from 'react';

import AuthService from '../../../services/api/auth.service'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initDone:false
        }
    }
    checkUserCookie(){
        const cookieData = AuthService.getCookieData();
        if(!cookieData){
             this.props.onAuthChange(false);
        }
        this.setState({
            initDone:true,
            cookie:cookieData
        });
    }
    render(){
        return(
            <React.Fragment>
                { this.props.isLoggedIn === false ? <Redirect to='/' />:
                  this.state.initDone   === false ? this.checkUserCookie():
                  <React.Fragment>
                    <h1>Dashboard</h1>
                    <span>
                        userID : {this.state.cookie.user.id}
                        eMail : {this.state.cookie.user.email}
                        refreshToken : {this.state.cookie.token.refreshToken}
                        accessToken: {this.state.cookie.token.accessToken}
                    </span>
                  </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default Dashboard