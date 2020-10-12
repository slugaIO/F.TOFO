import React from 'react';
import {Table} from 'react-bootstrap';

import AuthService from '../../../../services/api/auth.service'

class TaskTable extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
  }
  componentWillMount(){

  }
  render(){
    const tableRow = () => {
      let rows = [];
      console.log("rows refresh : "+this.props.tasks.length);
      for(let i = 0; i < this.state.tasks.length;i++){
        rows.push(
          <tr>
          <td>{this.props.tasks[i]._id}</td>
          <td>{this.props.tasks[i].title}</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        );
      }
      return rows;
    }
    return(
            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
    )
  }
}

export default TaskTable;