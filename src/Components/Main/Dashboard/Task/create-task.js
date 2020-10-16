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

// rich text editor
import { Editor } from '@tinymce/tinymce-react';



class CreateTask extends React.Component{
    state = {
        title:'',
        taskContent:'',
        selectedDate: new Date().toString()
    }
    constructor(props,context){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this)
        this.onChange = this.onChange.bind(this);
    }
    onChange(date) {
		this.setState({
			selectedDate: date
        });
    }
    handleEditorChange = (content, editor) => {
        this.setState({
            taskContent:base64.encode(content)
        })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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
                    <Col style={style.bgColorAddTask} md="">
                        <h1 style={style.headline}>Add Task</h1>
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
                            <Col>
                            <Editor
                            initialValue="<p>This is the initial content of the editor</p>"
                            init={{
                              height: 300,
                              menubar: true,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                            />
                            </Col>
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