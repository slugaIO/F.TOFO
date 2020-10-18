/**
 * 
 * @TODO ! componentDidMount loads the tasks over API. But we need it maybe only one 
 * 
 */
import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../../services/api/auth.service'
import { Container,Row,Col } from 'react-bootstrap'
import {Route,withRouter} from 'react-router-dom'
import TaskTable from '../../Main/Dashboard/Task/task-table'
import CreateTask from '../../Main/Dashboard/Task/create-task'
import EditTask from '../../Main/Dashboard/Task/edit-task'
import Sidebar from '../../navigation/sidebar'

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
    dashboardStyle = {
        sidebar:{
            background:'rgba(0, 0, 0, 0.75)',
            padding:'32px',
            borderRight:'2px solid #586069'
        },
        dashboard:{
            backgroundColor:'#CCC'
        }
    }
    render(){
        return(
                <Container fluid className='fill-window'>
                    <Row className='fill-window'>
                        <Col style={this.dashboardStyle.sidebar} md="auto">
                            <Sidebar />
                        </Col>
                        <Col md="auto" xl style={this.dashboardStyle.dashboard}>
                            <Route path='/dashboard' exact render={props => (<div>DASHBOARD</div>) } />
                            <Route path='/dashboard/tasklist' exact render={ props => (<TaskTable taskList={this.state.taskList} updateTaskList={this.updateTaskList} {...props} reloadTaskData={this.reloadTaskData}  />)} />
                            <Route path='/dashboard/addTask' exact render={ props =>  (<CreateTask  taskList={this.state.taskList}  reloadTaskData={this.reloadTaskData} updateTaskList={this.updateTaskList} {...props}  />) } />
                            <Route path='/dashboard/edittask/:id' exact render={ props => (<EditTask {...props} taskList={this.state.taskList} />)}/>
                            <Route path='/dashboard/edittask' exact render={ props => (<TaskTable taskList={this.state.taskList} updateTaskList={this.updateTaskList} {...props} reloadTaskData={this.reloadTaskData}  />)} />
                        </Col>
                    </Row>
                </Container>
        )
    }
}

export default withRouter(Dashboard)