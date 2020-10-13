import React from 'react';

import AuthService from '../../../services/api/auth.service'
import {Redirect} from 'react-router-dom'

import MainView from './main-view'


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initDone:false,
            taskList:[],
            test:'Dashboard'
        }
    }
    reloadTaskData = () => {
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            console.log(accessToken);
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                  this.setState({
                    taskList:response.data.tasks
                  })
                console.log(response.data.tasks);
                console.log(this.state.taskList);
            })
            .catch( (error) =>{
                console.log("error in PostCall");
            });
        })
        .catch( (error) => {})
    }
    componentDidMount(){
        this.reloadTaskData();
        this.checkUserCookie();
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
        console.log(this.state.taskList.length);
        if(this.state.taskList.length === 0){
            return(
                <React.Fragment/>
            )
        }
        console.log("####dashboard####");
        console.log(this.state.taskList);
        return(
            <React.Fragment>
                { this.props.isLoggedIn === false ? <Redirect to='/' />:
                  this.state.initDone   === false ? this.checkUserCookie():
                  <React.Fragment>
                     <MainView {...this.state} reloadTaskData={this.reloadTaskData} />
                  </React.Fragment>
                }
            </React.Fragment>
           
        )
    }
}

export default Dashboard