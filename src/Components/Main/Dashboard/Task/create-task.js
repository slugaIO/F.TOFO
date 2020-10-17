import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Form, Row, Col, Card,OverlayTrigger, Tooltip} from 'react-bootstrap';
import base64 from 'react-native-base64'
import { Redirect } from "react-router-dom";
// api
import AuthService from '../../../../services/api/auth.service'
// misc
import {DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
// CSS Component
import createTaskStyle from './inc/create-task-css'

import TaskEditor from './inc/edit-task'



class CreateTask extends React.Component{
    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          click to save new task
        </Tooltip>
    );
    constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this)
        this.state = {
            title:'',
            selectedDate: new Date().toString(),
            taskContent:'my task',
            redirect:false
        }
    }
    componentDidMount(){
        this.setState({
            redirect:false
        })
    }
    onChange = (date) => {
        console.log(date);
		this.setState({
            selectedDate: `${date}`
            
        });
    }
    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    // is set by the Editor
    setTaskContent = (content) => {
        this.setState({
            taskContent:base64.encode(content)
        })
    }
    addTask  = event => {
        // get new Access Token
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            const crDate = Date.now();
            const data = {
                task:{
                    title:this.state.title,
                    content:this.state.taskContent,
                    createDate:crDate,
                    endDate:this.state.selectedDate
                }
            }
            AuthService.postAPICall(data,accessToken,'/api/tasks/add')
            .then( (response) => {
                this.setState({
                    title:'',
                    taskContent:'',
                    redirect:true
                })
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {});
        event.preventDefault();
    }
    render(){
        if(this.state.redirect){
            console.log("redirect");
            return (
                <Redirect to='/dashboard/tasklist' />
            )
        }
        const style = {...createTaskStyle}
        return(
            <Container style={style.alignInContent} fluid>
                <Card>
                <Card.Header>Task Manager</Card.Header>
                <Card.Body>
                <Row>
                    <Col>
                        <TaskEditor setTaskContent={this.setTaskContent}/>
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
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip}>
                                        <Button variant="success" type="submit" onClick={this.addTask}>
                                            add Task
                                        </Button>
                                    </OverlayTrigger>
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
export default CreateTask;