import React from 'react';
import {Container, Grid, Paper } from '@material-ui/core';

import AuthService from '../../../services/api/auth.service'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        AuthService.authCheck().then( (resolve) => {
            console.log("auth okay");
        }).catch( (error) => {
            console.log("auth error");
        });
    }
    render() {
        return(
            <React.Fragment>
            <h1>Dashboard</h1>
            </React.Fragment>
        )
    }
}

export default Dashboard