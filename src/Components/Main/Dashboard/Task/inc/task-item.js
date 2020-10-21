import React from 'react';
import {Col} from 'react-bootstrap';

class TaskItem extends React.Component{
    style = {
        taskItem:{
            backgroundColor:'white',
            border:'1px solid rgb(123,174,234)',
            margin:'0.5rem',
            padding:'0.5rem',
            color:'rgb(152, 166, 173)'
        },
        taskTitle:{
            fontWeight:400,
            borderBottom:'1px solid black'
        },
        taskTodayTitle:{
            fontSize:'14px',
            color:'#CCC'
        }
    }
    constructor(props){
        super(props);
        this.state = {
            taskList : this.props.taskList
        }
        console.log(this.props.taskList);
        console.log(this.props.taskLength);
        console.log(this.props);
    }
    createItemList(_array){
        let cols    = [];
        let index   = 0;
        for(index = 0; index < _array.length; index++){
            cols.push( () => {
                return(
                    <col style={this.style.taskItem}>
                        <span style={this.style.taskTitle}>Task</span>
                    </col>
                )
            })
        }
        return cols;
    }
    render(){
        return(
            <React.Fragment>
            <h3 style={this.style.taskTodayTitle}>Task Today</h3>
            {
                this.props.taskList.map((n) => {
                    return <Col key={n._id} style={this.style.taskItem}>
                        <span style={this.style.taskTitle}>{n.title}</span>
                        <hr />
                        {`${("0" + new Date(n.endDate).getDay()).slice(-2)}.${("0" + new Date(n.endDate).getMonth()).slice(-2)}.${new Date(n.endDate).getFullYear()}`}
                    </Col>
                })     
            }
            </React.Fragment>
        )
    }
}

export default TaskItem;