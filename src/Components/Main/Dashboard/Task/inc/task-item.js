import React from 'react';
import {Col,Row} from 'react-bootstrap';
import base64 from 'react-native-base64'

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
        headLineTaskToday:{
            fontWeight:400,
            color:'black',
            fontSize:'16px'
        },
        labelToday:{
            backgroundColor:'#28a745',
            borderRadius:'10px',
            padding:'0.1rem',
            paddingLeft:'0.5rem',
            paddingRight:'0.5rem',
            float:'right',
            color:'white',
            fontWeight:'400'
        },
        taskContent:{
            fontStyle:'italic',
            padding:'0.9rem'
        }
    }
    constructor(props){
        super(props);
        this.state = {
            taskList : this.props.taskList
        }
    }
    taskItem(task){
        let taskDate = new Date(task.endDate);
        let _date    = new Date();
        if(_date.getFullYear() === taskDate.getFullYear() &&  (_date.getMonth()+1) === (taskDate.getMonth()+1) &&  _date.getDate() === taskDate.getDate()){
            return (
                <Col key={task._id} style={this.style.taskItem}>
                <Row>
                    <Col>
                        <span style={this.style.taskTitle}>{task.title}</span>
                    </Col>
                    <Col>
                        <span style={this.style.labelToday}>Today</span>
                    </Col>
                </Row>
                <Row>
                    <Col style={this.style.taskContent}>
                        {base64.decode(task.content).substring(0, 64)}...
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {`${("0" + taskDate.getDay()).slice(-2)}.${("0" + taskDate.getMonth()).slice(-2)}.${taskDate.getFullYear()}`}
                    </Col>
                </Row>
            </Col>
        )
        }
        return '';
    }
    render(){
        return(
            <React.Fragment>
            <Col>
                <h3 style={this.style.headLineTaskToday}>Task Today</h3>
            </Col>
            {
                this.props.taskList.map((n) => {
                    return this.taskItem(n);
                })     
            }
            </React.Fragment>
        )
    }
}

export default TaskItem;