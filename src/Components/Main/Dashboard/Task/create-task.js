var DatePicker = require("react-bootstrap-date-picker");
import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {Form} from 'react-bootstrap';


import AuthService from '../../../../services/api/auth.service'

class CreateTask extends React.Component{
    state = {
        title:'',
        taskContent:''
    }
    constructor(props){
        super(props);
        this.updateTaskList = this.props.updateTaskList.bind(this)
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // ? needed by date-picker
    getInitialState = () => {
        var value = new Date().toISOString();
        return {
          value: value
        }
    }
    // ? needed by date-picker 
    componentDidMount(){
        const hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
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
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
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