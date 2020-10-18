/*
 * TODO do we need this file anymore ?
*/
import { Rowing } from '@material-ui/icons';
import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'

class MainView extends React.Component{
    constructor(props){
        super(props);
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
        <Container fluid>
            <h1 style={this.mainView.headline}>Dashboard</h1>
            <Row>
               <Col style={this.mainView.colItem}>
                    Task Today
                    <h3 style={this.mainView.colItemText}>1</h3>
                </Col>
               <Col style={this.mainView.colItem}>Task Week</Col>
               <Col style={this.mainView.colItem}>Task Month</Col>
            </Row>
        </Container>
        )
    }
}

export default withRouter(MainView)