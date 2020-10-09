import React from 'react';

import AuthService from '../../../services/api/auth.service'

class Dashboard extends React.Component{
    componentDidMount(){
        AuthService.authCheck().then( (resolve) => {
           // TOOO whats next
        }).catch( (error) => {
           // TOOO whats next
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