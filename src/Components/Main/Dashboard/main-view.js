import React from 'react'
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import CreateTask from '../../Main/Dashboard/Task/create-task'
import TaskTable from '../../Main/Dashboard/Task/task-table'

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.reloadTaskData = this.props.reloadTaskData.bind(this);
        this.updateTaskList = this.props.updateTaskList.bind(this);
    }
    componentDidMount(){
        this.reloadTaskData();
    }
    render(){
        return(
          <Container>
          <Row/>
          <Row>
          <Col>
             <CreateTask reloadTaskData={this.reloadTaskData} />
          </Col>
          <Col>
                <TaskTable {...this.props} updateTaskList={this.updateTaskList} />
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