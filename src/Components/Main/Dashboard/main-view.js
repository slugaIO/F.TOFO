/*
 * TODO do we need this file anymore ?
*/
import { Rowing } from '@material-ui/icons';
import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import moment from 'moment'

import AuthService from '../../../services/api/auth.service'

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.taskOfToday = 1; // this.props.taskList.length;
        this.state = {
            taskCounter:100,
            taskForToday:200,
            taskForWeek:300
        }
    }
    componentDidMount(){
        const cookieData = AuthService.getCookieData();
        AuthService.authCheck(cookieData.token.refreshToken)
        .then( (response) => {
            const accessToken = response.data.accessToken;
            AuthService.postAPICall({},accessToken,'/api/tasks/list')
            .then( (response) => {
                console.log(response.data.tasks);
                const _array = response.data.tasks;
                const _date  = new Date();
                let sameDay  = 0;
                let sameWeek = 0;
                console.log("Tasks : "+_array.length);


                for(let i = 0; i < _array.length; i++){
                   
                    const taskDate = new Date(_array[i].endDate);
                    const isSameWeek = moment([_date.getFullYear(),(_date.getMonth()+1),_date.getDay()]).isSame([ taskDate.getFullYear(),(taskDate.getMonth()+1),taskDate.getDay()],'week');
                    if(isSameWeek) sameWeek = sameWeek + 1;
                        
                    if(  _date.getFullYear() === taskDate.getFullYear()   && 
                         (_date.getMonth()+1) === (taskDate.getMonth()+1) && 
                        _date.getDay() === taskDate.getDay()){
                        console.log('date date');
                        sameDay = sameDay + 1;
                    }
                    /*
                    else{
                        console.log(`Different Date
                            ${_date.getFullYear()} !== ${taskDate.ggetMonthetFullYear()}
                            ${_date.getMonth()} !== ${taskDate.getFullYear()}
                            ${_date.getDay()} !== ${taskDate.getDay()}
                        `)
                    }
                    */
                }
                this.setState({
                    taskCounter:200,
                    taskForToday:sameDay,
                    taskForWeek:sameWeek
                })
                /**
                for(i = 0; i < 10; i++){
                    const taskDate = new Date(_array[i].endDate)
                    console.table({
                        task:taskDate,
                        check:_array[i].endDate,
                        cur:_date,
                        same:(
                            _date.getFullYear() === taskDate.getFullYear()  &&
                            _date.getMonth()    === taskDate.getMonth()     &&
                            _date.getDay()      === taskDate.getDate()      
                        ) ? true:false
                    })
                    if(
                        _date.getFullYear() === taskDate.getFullYear()  &&
                        _date.getMonth()    === taskDate.getMonth()     &&
                        _date.getDay()      === taskDate.getDate()      
                    )cnt++;
                }
                **/
            })
            .catch( (error) =>{});
        })
        .catch( (error) => {})
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
            borderRadius:'10px',
            padding:'1rem'
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
                           0
                        </h3>
                    </Col>
                    <Col style={this.mainView.colItem}>
                    Task Total
                    <h3 style={this.mainView.colItemText}>
                        {this.state.taskCounter}
                    </h3>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
        )
    }
}

export default withRouter(MainView)