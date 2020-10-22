/**
 * 
 * ! Cool Layout https://dribbble.com/shots/5908138-Textemo-business-dashboard-for-translations/attachments/1270845
 */
import React from 'react';
import {Table,Button, Container, Row} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';

import AuthService from '../../../../services/api/auth.service'
import {Trash, Pencil, Eye} from 'react-bootstrap-icons';

// Modal
import TaskDetail from '../Task/inc/task-detail-modal';

class TaskTable extends React.Component{
  style = {
    container:{
      marginTop:'20px'
    },
    emptyTable:{
      textAlign:'center'
    },
    table:{
      tr:{
        fontWeight:'200',
        fontFamily:'Titillium Web'
      }
    }
  }
  constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this);
        // FIXME why we have a Cannot read property 'bind' of undefined
        this.reloadTaskData = this.props.reloadTaskData;
        this.taskList       = this.props.taskList;
        this.state = {
            showModal:false,
            task:{
              title:'',
              _id:'undefined',
              content:''
          }
        }
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
  style = {
    button:{
      marginRight:'0.5rem'
    }
  }
  tableRow = () => {
    let rows = [];
    if(this.props.taskList.length === 0){
      rows.push(
        <tr key='emptyTable'><td colSpan='4' style={this.style.emptyTable}>No Tasks</td></tr>     
      )
    }else{
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
              <Link to={`/dashboard/edittask/${this.props.taskList[i]._id}`} style={this.style.button}>
                <Pencil/>
              </Link>
              <Link to={'#'} onClick={() => {this.deleteTask(this.props.taskList[i]._id)}} style={this.style.button}>
                <Trash/>
              </Link>
              <Link to={`#`} onClick={ () => {
                    this.setState({
                        showModal:true,
                        task:{
                            title:this.props.taskList[i].title,
                            _id:this.props.taskList[i]._id,
                            content:this.props.taskList[i].content
                        }
                    })
                }}>
                <Eye/>
                </Link>
          </td>
        </tr>
        );
      }
    }
    return rows;
  }
  render(){
    return(
      <Container style={this.style.container}>
      <Row>
          <h2 className={'dashboard'}>Task Overview</h2>
      </Row>
      <Row>      
          <Table striped bordered hover variant="grey" id={'taskOverview'}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.tableRow()}
          </tbody>
        </Table>
      </Row>
      <TaskDetail show={this.state.showModal} task={this.state.task} onHide={() => this.setState({showModal:false})}/>
      </Container>
    )
  }
}

export default TaskTable;