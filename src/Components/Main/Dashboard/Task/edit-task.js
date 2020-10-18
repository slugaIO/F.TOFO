import React from 'react';
import {Form, Row, Col, Card,OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Button, Container} from 'react-bootstrap';
import {DatePickerInput } from 'rc-datepicker';
import TaskEditor from './inc/edit-task'
import base64 from 'react-native-base64'
import { Redirect } from 'react-router-dom';

class EditTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'undefined',
            selectedDate: new Date(),
            taskContent:'my task',
            redirect:false
        }
        let taskToEdit = {};
    }
    // is set by the Editor
    setTaskContent = (content) => {
        this.setState({
            taskContent:base64.encode(content)
        })
    }
    onChange = (date) => {
		this.setState({
            selectedDate: `${date}`
            
        });
    }
    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        console.table(change);
        this.setState(change)
    }
    updateTask = (e) => {
        console.table({
            msg:'update task',
            title:this.state.title,
            content:this.state.content,
            date:this.state.selectedDate
        })
        e.preventDefault();
    }
    render() {
        if(this.props.taskList.length === 0){
            return (
                <Redirect to={'/dashboard/tasklist'} />
            )
        }
        if(this.props.taskList.length > 0){
            this.taskToEdit  = this.props.taskList.filter(x => x._id === `${this.props.match.params.id}`)[0];
            console.log(this.taskToEdit);
        }
        return (
            <Container fluid>
            <h2>Edit Task #{this.props.match.params.id}</h2>
                <Card>
                <Card.Header>Task Manager</Card.Header>
                <Card.Body>
                <Row>
                    <Col>
                        <TaskEditor taskContent={base64.decode(this.taskToEdit.content)} setTaskContent={this.setTaskContent}/>
                    </Col>
                    <Col>
                        <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name='title' value={this.taskToEdit.title} type="text" onChange={this.handleChange} autoComplete="off"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Timing</Form.Label>
                                    <DatePickerInput onChange={this.onChange} value={this.taskToEdit.endDate} className='my-custom-datepicker-component'/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col />
                            <Col>
                                <Form.Group>
                                    <Button variant="success" type="submit" onClick={this.updateTask}>
                                        Update Task
                                     </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                        </Form>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default EditTask;