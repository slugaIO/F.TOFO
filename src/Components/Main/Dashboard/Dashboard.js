import React from 'react';

import AuthService from '../../../services/api/auth.service'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){

    }
    render() {
        return(
            <React.Fragment>
            { this.props.isLoggedIn === false ? <Redirect to='/' />:null }
            <h1>Dashboard {this.props.isLoggedIn === true ? 'JA' : 'NEIN'}</h1>
            </React.Fragment>
        )
    }
}

export default Dashboard