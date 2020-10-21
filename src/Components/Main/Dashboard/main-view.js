/*
 * TODO do we need this file anymore ?
*/
import { Rowing } from '@material-ui/icons';
import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import moment from 'moment'

import AuthService from '../../../services/api/auth.service'
import TaskItem    from './Task/inc/task-item';

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.taskOfToday = 1; // this.props.taskList.length;
        this.state = {
            taskCounter:0,
            taskForToday:0,
            taskForWeek:0,
            taskForMonth:0,
            taskList:[]
        }
    }
    apiLoadTasks(){
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                const _array = response.data.tasks;
                const _date  = new Date();
                let sameDay  = 0;
                let sameWeek = 0;
                let sameMonth = 0;
                // check each task
                for(let i = 0; i < _array.length; i++){
                
                    const taskDate = new Date(_array[i].endDate);
                    const isSameWeek = moment([_date.getFullYear(),(_date.getMonth()+1),_date.getDate()]).isSame([ taskDate.getFullYear(),(taskDate.getMonth()+1),taskDate.getDate()],'week');
                    if(isSameWeek) sameWeek = sameWeek + 1;

                    const isSameMonth = moment([_date.getFullYear(),(_date.getMonth()+1),_date.getDate()]).isSame([ taskDate.getFullYear(),(taskDate.getMonth()+1),taskDate.getDate()],'month');
                    if(isSameMonth) sameMonth = sameMonth + 1;

                    // count task for today
                    if(_date.getFullYear() === taskDate.getFullYear() &&  (_date.getMonth()+1) === (taskDate.getMonth()+1) &&  _date.getDate() === taskDate.getDate()){
                        sameDay = sameDay + 1;
                    }
                }
                this.setState({
                    taskCounter:_array.length,
                    taskForToday:sameDay,
                    taskForWeek:sameWeek,
                    taskForMonth:sameMonth,
                    taskList:_array
                })
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {})
    }
    componentDidMount(){
        this.apiLoadTasks();
    }
    mainView = {
        headline:{
            fontWeihg:300,
            color:'#98a6ad',
            lineHeigh:'75px'
        },
        colItem:{
            backgroundColor:'white',
            margin:'1rem',
            color:'#98a6ad',
            padding:'1rem',
            border:'1px solid rgb(123,174,234)',
        },
        colItemText:{
            color:'#2c8ef8',
            fontSize:'20px',
            textAlign:'center'
        }
    }
    render(){
        return(
        <React.Fragment>
            <Container fluid>
                <h1 style={this.mainView.headline}>Dashboard</h1>
                <Row>
                    <Col style={this.mainView.colItem}>
                        Task Today
                        <h3 style={this.mainView.colItemText}>
                            {this.state.taskForToday}
                        </h3>
                    </Col>
                    <Col style={this.mainView.colItem}>
                        Task Week
                        <h3 style={this.mainView.colItemText}>
                           {this.state.taskForWeek}                           
                        </h3>
                    </Col>
                    <Col style={this.mainView.colItem}>
                        Task Month
                        <h3 style={this.mainView.colItemText}>
                           {this.state.taskForMonth}
                        </h3>
                    </Col>
                    <Col style={this.mainView.colItem}>
                    Task Total
                    <h3 style={this.mainView.colItemText}>
                        {this.state.taskCounter}
                    </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
             
                    </Col>
                    <Col>
                        <TaskItem taskTotal={this.state.taskCounter} taskList={this.state.taskList} taskLength={this.state.taskList.length}/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
        )
    }
}

export default withRouter(MainView)