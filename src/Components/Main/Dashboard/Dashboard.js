import React from 'react';

import AuthService from '../../../services/api/auth.service'
import MainView from './main-view'
import { Container,Row } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initDone:false,
            taskList:[]
        }
    }
    // ! We have to map param tasks[Object] to Array[]
    updateTaskList = (tasks) => {
        // map from Object to Array
        const result = Object.keys(tasks).map((key) => tasks[key]);
        this.setState({
            taskList:result
        })
    }
    reloadTaskData = () => {
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                  this.setState({
                    taskList:response.data.tasks
                  })
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {})
    }
    render(){
        return(
            <Router>
                <Container>
                    <Row className="justify-content-md-center">
                        <MainView reloadTaskData={this.reloadTaskData} {...this.state} updateTaskList={this.updateTaskList}  />
                    </Row>
                </Container>
            </Router>
        )
    }
}

export default withRouter(Dashboard)