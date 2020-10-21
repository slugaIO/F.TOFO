import React from 'react';
import {Col,Row} from 'react-bootstrap';
import base64 from 'react-native-base64'
import moment from 'moment';
import componentStyle  from '../css/taskItemStyle'
import ReactModal from 'react-modal';

// icon set
import FeatherIcon from 'feather-icons-react';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#f6f8fa',
      border                : '1px solid #444d56',
      borderRadius          : '10px'
    }
  };

class TaskItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskList : this.props.taskList,
            showModal:false
        }
        this.style  = {...componentStyle};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this); 
    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    renderHTMLItem(task, CSSLabel, labelText){
        let taskDate = new Date(task.endDate);
        return (
            <Col key={task._id} style={this.style.taskItem}>
            <Row>
                <Col>
                    <span style={this.style.taskTitle}>{task.title}</span>
                </Col>
                <Col> 
                     <span style={{
                        ...CSSLabel,
                        ...this.style.labelTiming
                     }} ><i><FeatherIcon icon="info" size="24" style={this.style.iconMargin} /></i>{labelText}</span>
                </Col>
            </Row>
            <Row>
                <Col style={this.style.taskContent}>
                    {base64.decode(task.content).substring(0, 64)}...
                </Col>
            </Row>
            <Row>
                <Col>
                    <i><FeatherIcon icon="clock" size="24"  style={this.style.iconMargin}/></i>{`${("0" + taskDate.getDate()).slice(-2)}.${("0" + (taskDate.getMonth()+1)).slice(-2)}.${taskDate.getFullYear()}`}
                </Col>
                <Col md="auto">
                    <i><FeatherIcon icon="trash" size="24" style={this.style.iconMargin} /></i>
                    <i><FeatherIcon icon="check-circle" size="24" style={this.style.iconMargin} /></i>
                    <i><FeatherIcon icon="eye" size="24" style={this.style.iconMargin}  /></i>
                </Col>
            </Row>
        </Col>
        )
    }
    renderYesterDay(task){
        let taskDate = new Date(task.endDate);
        let _date    = new Date();
        if(moment(taskDate.toISOString()).isBefore(_date.toISOString(),'day')){
            return this.renderHTMLItem(task,this.style.labelDelay,'Delay');
        }
        return '';
    }
    renderToday(task){
        let taskDate = new Date(task.endDate);
        let _date    = new Date();
        if(moment(taskDate.toISOString()).isSame(_date.toISOString(),'day')){
            return this.renderHTMLItem(task,this.style.labelToday,'Today');
        }
        return '';
    }
    render(){
        return(
            <React.Fragment>
            <Col>
                <h3>
                    <i>
                        <FeatherIcon icon="info" size="24" />
                    </i>
                    <span  style={this.style.headLineTaskToday}>&nbsp;Task Today</span>
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
            <button onClick={this.handleOpenModal}>Trigger Modal</button>
            <ReactModal 
               isOpen={this.state.showModal}
               contentLabel="Minimal Modal Example"
               style={customStyles}
            >
               <h1>Task Details</h1>
              <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
            </React.Fragment>
        )
    }
}

export default TaskItem;