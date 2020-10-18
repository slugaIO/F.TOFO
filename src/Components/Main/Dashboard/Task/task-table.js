import React from 'react';
import {Table,Button, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import AuthService from '../../../../services/api/auth.service'

class TaskTable extends React.Component{
  constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this);
        // FIXME why we have a Cannot read property 'bind' of undefined
        this.reloadTaskData = this.props.reloadTaskData;
        this.taskList       = this.props.taskList;
        console.table(this.taskList);
  }
  componentDidMount(){
    this.reloadTaskData();
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
  /**
   * 
   * ? Return the Table Content
   */
  tableRow = () => {
    let rows = [];
    for(let i = 0; i < this.props.taskList.length;i++){
      let date = new Date(this.props.taskList[i].createDate)
      rows.push(
        <tr key={this.props.taskList[i]._id}>
        <td>{this.props.taskList[i].title}</td>
        <td>{date.toLocaleString()}</td>
        <td>{
          new Date(this.props.taskList[i].endDate).toLocaleString()
        }</td>
        <td>
            <Button variant="danger" onClick={() => {this.deleteTask(this.props.taskList[i]._id)}}>X</Button>
           
            <Link to={`/dashboard/edittask/${this.props.taskList[i]._id}`}>Edit</Link>
            <Button variant="success" onClick={() => {this.deleteTask(this.props.taskList[i]._id)}}>?</Button>
        </td>
      </tr>
      );
    }
    return rows;
  }
  render(){
    const style = {
      container:{
        marginTop:'20px'
      }
    }
    return(
      <Container style={style.container}>
      <Row>
          <h1>Task Overview</h1>
      </Row>
      <Row>
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Erstellt</th>
              <th>Deadline</th>
              <th>Modify</th>
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