import React from 'react';
import {Table} from 'react-bootstrap';

class TaskTable extends React.Component{
  constructor(props){
    super(props);
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
        <td>@mdo</td>
      </tr>
      );
    }
    return rows;
  }
  render(){
    return(
            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Erstellt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {this.tableRow()}
            </tbody>
          </Table>
    )
  }
}

export default TaskTable;