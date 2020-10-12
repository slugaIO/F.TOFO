import React from 'react'
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import CreateTask from '../../Main/Dashboard/Task/create-task'
import TaskTable from '../../Main/Dashboard/Task/task-table'

import AuthService from '../../../services/api/auth.service'

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskList:[],
            test:'Hallo'
        }
    }
    taskReload = () => {
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                  console.table(response.data.tasks);
                  this.setState({
                    taskList:response.data.tasks
                  })
            })
            .catch( (error) =>{
                console.log("error in PostCall");
            });
        })
        .catch( (error) => {})
    }
    render(){
        return(
          <Container fluid>
          <Row/>
          <Row>
          <Col xs lg="2">
              <CreateTask taskReload={this.taskReload} />
          </Col>
          <Col>
              <TaskTable />
          </Col>
          </Row>
        </Container>
        )
    }
}

export default MainView