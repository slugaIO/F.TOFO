import React from 'react';
import Footer from 'react-footer-comp'

import AuthService from '../../../services/api/auth.service'
import {Redirect} from 'react-router-dom'

import MainView from './main-view'


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
                     <MainView {...this.props}/>
                  </React.Fragment>
                }
            </React.Fragment>
           
        )
    }
}

export default Dashboard