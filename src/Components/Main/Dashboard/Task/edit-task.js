import React from 'react';
import {Form, Row, Col, Card,OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Button, Container} from 'react-bootstrap';
import {DatePickerInput } from 'rc-datepicker';
import TaskEditor from './inc/edit-task'
import base64 from 'react-native-base64'
import { Redirect } from 'react-router-dom';

import AuthService from '../../../../services/api/auth.service'
class EditTask extends React.Component{
    constructor(props){
        super(props);
        let taskToEdit = {
            title:'',
            taskContent:'',
            endDate:new Date()
        };
        if(this.props.taskList.length > 0){
            this.taskToEdit  = this.props.taskList.filter(x => x._id === `${this.props.match.params.id}`)[0];
            this.state = {
                title:this.taskToEdit.title,
                selectedDate:this.taskToEdit.endDate,
                content:this.taskToEdit.content,
                taskID:this.taskToEdit._id,
                redirect:false
            }
        }else{
            this.state = {
                redirect:true
            }
        }
    }
    // is set by the Editor
    setTaskContent = (content) => {
        this.setState({
            content:base64.encode(content)
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
        this.setState(change)
    }
    updateTask = (e) => {
        console.table({
            msg:'update task',
            title:this.state.title,
            content:this.state.content,
            date:this.state.selectedDate,
            id:this.state.taskID
        })
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            const data = {
                task:{
                    title:this.state.title,
                    content:this.state.content,
                    endDate:this.state.selectedDate,
                    taskID:this.state.taskID
                }
            }
            AuthService.postAPICall(data,accessToken,'/api/tasks/update')
            .then( (response) => {
                if(response.status === 200){
                    this.setState({
                        redirect:true
                    })
                }
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {});
        e.preventDefault();
    }
    render() {
        if(this.props.taskList.length === 0 || this.state.redirect){
            return (
                <Redirect to={'/dashboard/tasklist'} />
            )
        }
        return (
            <Container fluid>
            <h2>Edit Task #{this.props.match.params.id}</h2>
                <Card>
                <Card.Header>Task Manager</Card.Header>
                <Card.Body>
                <Row>
                    <Col>
                        <TaskEditor taskContent={base64.decode(this.state.content)} setTaskContent={this.setTaskContent}/>
                    </Col>
                    <Col>
                        <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name='title' value={this.state.title} type="text" onChange={this.handleChange} autoComplete="off"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Timing</Form.Label>
                                    <DatePickerInput onChange={this.onChange} value={this.state.selectedDate} className='my-custom-datepicker-component'/>
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