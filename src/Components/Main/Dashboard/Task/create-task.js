import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

// api
import AuthService from '../../../../services/api/auth.service'

// misc
import ReactDatePicker from 'react-date-picker-cs';

class CreateTask extends React.Component{
    state = {
        title:'',
        taskContent:'',
        selectedDate: '2017-08-13'
    }
    constructor(props,context){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this)
        this.handleLog = this.handleLog.bind(this);
    }
    handleLog(date) {
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
            container:{
                backgroundColor:'#ccc'
            }
        }
        return(
            <Container fluid style={style.container}>
                <Form>
                <Form.Group controlId="addTask">
                <Form.Label>Title</Form.Label>
                <Form.Control name='title' value={this.state.title} type="text" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task</Form.Label>
                    <Form.Control name='taskContent' as="textarea" value={this.state.taskContent} rows="3" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Label</Form.Label>
                    <ReactDatePicker
                    onChange={this.handleLog} 
                    range={[2013, 2020]} 
                    value={this.state.selectedDate} 
                    disabled={true}
                />
                </Form.Group>;
                <Button variant="success" type="submit" onClick={this.addTask}>
                add Task
                </Button>
            </Form>
            </Container>
        )
    }
}
export default CreateTask;