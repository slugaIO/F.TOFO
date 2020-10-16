import React from 'react';

import AuthService from '../../../services/api/auth.service'
import MainView from './main-view'
import { Container,Row } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter, Link} from 'react-router-dom'
import TaskTable from '../../Main/Dashboard/Task/task-table'
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
                <Container>
                <h1>Dashboard loaded</h1>
                    <Row className="justify-content-md-center">
                            <Route path='/dashboard' exact render={props => (<div>DASHBOARD</div>) } />
                            <Route path='/dashboard/tasklist' exact render={
                                props => (<TaskTable taskList={this.state.taskList} updateTaskList={this.updateTaskList} {...props}  />)
                            } />
                            <Route path='/dashboard/addTask' exact render={props => (<div>List all Task</div>) } />
                    </Row>
                </Container>
        )
    }
}

export default withRouter(Dashboard)