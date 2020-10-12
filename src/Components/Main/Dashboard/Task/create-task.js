import React from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

import AuthService from '../../../../services/api/auth.service'

class CreateTask extends React.Component{
    state = {
        title:'',
        taskContent:''
    }
    constructor(props){
        super(props);
        this.props = props;
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
            const data = {
                task:{
                    title:this.state.title,
                    content:this.state.taskContent
                }
            }
            AuthService.postAPICall(data,accessToken,'/api/tasks/add')
            .then( (response) => {
                this.setState({
                    title:'',
                    taskContent:''
                })
            })
            .catch( (error) =>{
                console.log("error in PostCall");
            });
        })
        .catch( (error) => {
            // TODO logout if no new access token is available
            console.log("error in access refresh");
        });
        event.preventDefault();
    }
    render(){
        return(
            <Form>
            <Form.Group controlId="addTask">
              <Form.Label>Title</Form.Label>
              <Form.Control name='title' value={this.state.title} type="text" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Task</Form.Label>
                <Form.Control name='taskContent' as="textarea" value={this.state.taskContent} rows="3" onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="success" type="submit" onClick={this.addTask}>
              add Task
            </Button>
          </Form>
        )
    }
}

export default CreateTask;