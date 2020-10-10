import React from 'react';

import AuthService from '../../../services/api/auth.service'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            check:false
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(){
        console.log("Component Update");
    }
    render(){
        return(
            <React.Fragment>
            { this.props.isLoggedIn === false ? <Redirect to='/' />:null }
            { this.state.check === true ? <h1>TRUE</h1>:<h1>FALSE</h1>}
            <h1>Dashboard {this.props.isLoggedIn === true ? 'JA' : 'NEIN'}</h1>
            </React.Fragment>
        )
    }
}

export default Dashboard