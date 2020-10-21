import React from 'react';
import {Col,Row} from 'react-bootstrap';
import base64 from 'react-native-base64'
import moment from 'moment';
import componentStyle  from '../css/taskItemStyle'

// icon set
import FeatherIcon from 'feather-icons-react';

class TaskItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskList : this.props.taskList
        }
        this.style  = {...componentStyle};
    }
    renderYesterDay(task){
        let taskDate = new Date(task.endDate);
        let _date    = new Date();
        if(moment(taskDate.toISOString()).isBefore(_date.toISOString(),'day')){
            return (
                <Col key={task._id} style={this.style.taskItem}>
                <Row>
                    <Col>
                        <span style={this.style.taskTitle}>{task.title}</span>
                    </Col>
                    <Col> 
                         <span style={{
                             ...this.style.labelDelay,
                             ...this.style.labelTiming
                         }} ><i><FeatherIcon icon="info" size="24" /></i>Delay</span>
                    </Col>
                </Row>
                <Row>
                    <Col style={this.style.taskContent}>
                        {base64.decode(task.content).substring(0, 64)}...
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <i><FeatherIcon icon="clock" size="24" /></i>{`${("0" + taskDate.getDay()).slice(-2)}.${("0" + taskDate.getMonth()).slice(-2)}.${taskDate.getFullYear()}`}
                    </Col>
                </Row>
            </Col>
            )
        }
        return '';
    }
    renderToday(task){
        let taskDate = new Date(task.endDate);
        let _date    = new Date();
        if(moment(taskDate.toISOString()).isSame(_date.toISOString(),'day')){
            return (
                <Col key={task._id} style={this.style.taskItem}>
                <Row>
                    <Col>
                        <span style={this.style.taskTitle}>{task.title}</span>
                    </Col>
                    <Col>
                        <span style={{
                            ...this.style.labelToday,
                            ...this.style.labelTiming
                        }}><i><FeatherIcon icon="info" size="24" /></i>Today</span>
                    </Col>
                </Row>
                <Row>
                    <Col style={this.style.taskContent}>
                        {base64.decode(task.content).substring(0, 64)}...
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <i><FeatherIcon icon="clock" size="24" /></i>{`${("0" + taskDate.getDay()).slice(-2)}.${("0" + taskDate.getMonth()).slice(-2)}.${taskDate.getFullYear()}`}
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
                <h3 style={this.style.headLineTaskToday}>
                    <i>
                        <FeatherIcon icon="info" size="24" />
                    </i>
                    Task Today
                </h3>
            </Col>
            {
                this.props.taskList.map((n) => {
                    return this.renderYesterDay(n);
                })    
            }
            {
                this.props.taskList.map((n) => {
                    return this.renderToday(n);
                })    
            }
            </React.Fragment>
        )
    }
}

export default TaskItem;