import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Form, Row, Col} from 'react-bootstrap';
import base64 from 'react-native-base64'
// api
import AuthService from '../../../../services/api/auth.service'
// misc
import {DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
// CSS Component
import createTaskStyle from './inc/create-task-css'

import TaskEditor from './inc/edit-task'

class CreateTask extends React.Component{
    constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this)
        this.state = {
            title:'',
            selectedDate: new Date().toString(),
            taskContent:''
        }
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
        console.table({
            msg:'call...',
            title:this.state.title,
            text:this.state.taskContent,
            date:this.state.selectedDate
        })
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
                    taskContent:''
                })
                this.reloadTaskData();
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {});
        event.preventDefault();
    }
    render(){
        const style = {...createTaskStyle}
        return(
            <Container style={style.alignInContent}>
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
                            <Col>-</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Button variant="success" type="submit" onClick={this.addTask}>
                                        add Task
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default CreateTask;