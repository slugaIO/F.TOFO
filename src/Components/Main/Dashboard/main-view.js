import React from 'react'
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import CreateTask from '../../Main/Dashboard/Task/create-task'
import TaskTable from '../../Main/Dashboard/Task/task-table'

import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom'

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
          <Router>
                <Switch>
                {/*
                <Route 
                        path='/dashboard/tasks'
                        exact 
                        render={props => (
                            <TaskTable {...this.props} updateTaskList={this.updateTaskList} />
                        )
                        }
                />
                    */}
                </Switch>
          </Router>
        </Container>
        )
    }
}

export default withRouter(MainView)