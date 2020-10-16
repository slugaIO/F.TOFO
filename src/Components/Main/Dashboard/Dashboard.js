/**
 * 
 * @TODO ! componentDidMount loads the tasks over API. But we need it maybe only one 
 * 
 */
import React from 'react';
import AuthService from '../../../services/api/auth.service'
import { Container,Row } from 'react-bootstrap'
import {Route,withRouter} from 'react-router-dom'
import TaskTable from '../../Main/Dashboard/Task/task-table'
import CreateTask from '../../Main/Dashboard/Task/create-task'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initDone:false,
            taskList:[]
        }
    }
    componentDidMount(){
        this.reloadTaskData();
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
                    <Row className="justify-content-md-center">
                            <Route path='/dashboard' exact render={props => (<div>DASHBOARD</div>) } />
                            <Route path='/dashboard/tasklist' exact render={
                                props => (<TaskTable taskList={this.state.taskList} updateTaskList={this.updateTaskList} {...props}  />)
                            } />
                            <Route path='/dashboard/addTask' exact render={
                                props =>  (<
                                    CreateTask 
                                    taskList={this.state.taskList} 
                                    reloadTaskData={this.reloadTaskData} 
                                    updateTaskList={this.updateTaskList}
                                {...props}  
                            />)
                            } />
                    </Row>
                </Container>
        )
    }
}

export default withRouter(Dashboard)