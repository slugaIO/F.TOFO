import React from 'react';
import {Table,Button, Container, Row} from 'react-bootstrap';

import AuthService from '../../../../services/api/auth.service'

class TaskTable extends React.Component{
  constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this);
        this.taskList       = this.props.taskList;
  }
  deleteTask = (id) => {
        // get new Access Token
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            const data = {
              taskID:id
            }
            AuthService.postAPICall(data,accessToken,'/api/tasks/delete')
            .then( (response) => {
              if(response.status === 200){
                console.log(response);
                if(response.data.task) this.updateTaskList(response.data.task)
              }
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {});
  }
  tableRow = () => {
    let rows = [];
    for(let i = 0; i < this.props.taskList.length;i++){
      let date = new Date(this.props.taskList[i].createDate)
      rows.push(
        <tr key={this.props.taskList[i]._id}>
        <td>{this.props.taskList[i]._id}</td>
        <td>{this.props.taskList[i].title}</td>
        <td>{date.toLocaleString()}</td>
        <td><Button variant="outline-danger" onClick={() => {this.deleteTask(this.props.taskList[i]._id)}}>X</Button></td>
      </tr>
      );
    }
    return rows;
  }
  render(){
    return(
      <Container>
      <Row>
          <h1>Task Overview</h1>
      </Row>
      <Row>
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Erstellt</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
          {this.tableRow()}
          </tbody>
        </Table>
      </Row>
      </Container>
    )
  }
}

export default TaskTable;