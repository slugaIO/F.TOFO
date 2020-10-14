import React from 'react';

import AuthService from '../../../services/api/auth.service'
import MainView from './main-view'
import { Container,Row } from 'react-bootstrap'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initDone:false,
            taskList:[]
        }
    }
    reloadTaskData = () => {
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                  this.setState({
                    taskList:response.data.tasks
                  })
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {})
    }
    render(){
        return(
            <Container fluid='lg' className="mx-auto my-2">
                <Row className="justify-content-md-center">
                    <MainView reloadTaskData={this.reloadTaskData} {...this.state} />
                </Row>
            </Container>
        )
    }
}

export default Dashboard