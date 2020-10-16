import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Form, Row, Col} from 'react-bootstrap';
// api
import AuthService from '../../../../services/api/auth.service'

// misc
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
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
                    createDate:crDate
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
        const style = {
            alignInContent:{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            },
            headline:{
                //transform: 'rotate(270deg)'
            },
            bgColorAddTask:{
                backgroundColor:'red',
                alignItems:'center'
            },
            formLayout:{
                backgroundColor:'#CCC',
                border:'1px solid black',
                padding:'1rem'
            }
        }
        return(
            <Container style={style.alignInContent}>
            <Container fluid>
                <Row>
                    <Col style={style.bgColorAddTask}>
                        <h1 style={style.headline}>Add Task</h1>
                    </Col>
                    <Col>
                        <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name='title' value={this.state.title} type="text" onChange={this.handleChange}/>
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
                                <Form.Group>
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control name='taskContent' as="textarea" value={this.state.taskContent} rows="3" onChange={this.handleChange}/>
                                </Form.Group>
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
            </Container>
        )
    }
}
export default CreateTask;