/**
 * 
 * TODO create reac modal for Task Detail View
 * TODO CSS for modal does not work
 */
import React            from 'react';
import {Link}           from 'react-router-dom';
import {Col,Row}        from 'react-bootstrap';
import base64           from 'react-native-base64'
import moment           from 'moment';
import ReactModal       from 'react-modal';

// icon set
import FeatherIcon from 'feather-icons-react';

// CSS 
import componentStyle   from '../css/taskItemStyle'

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
                    <Link to={`#`} onClick={ () => {
                        this.setState({
                            showModal:true
                        })
                    }}>
                        <i><FeatherIcon icon="eye" size="24" style={this.style.iconMargin}  /></i>
                    </Link>
                    
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
    modalContent(){
        return (
            <React.Fragment>
                <h1>Task Details</h1>
                <button onClick={this.handleCloseModal}>Close Modal</button>
            </React.Fragment>
        )
    }
    render(){
        console.table(this.style.modalComponent);
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
               style={this.style.modalComponent}
            >
                {this.modalContent()}
            </ReactModal>
            </React.Fragment>
        )
    }
}

export default TaskItem;