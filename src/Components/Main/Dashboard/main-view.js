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
        this.reloadTaskData = this.props.reloadTaskData.bind(this);
    }
    taskReload = () => {}
    render(){
        return(
          <Container fluid>
          <Row/>
          <Row>
          <Col xs lg="2">
              <CreateTask reloadTaskData={this.reloadTaskData} />
          </Col>
          <Col>
              <TaskTable {...this.props} />
          </Col>
          </Row>
          <Row>
                <span></span>
          </Row>
        </Container>
        )
    }
}

export default MainView