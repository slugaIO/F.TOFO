import React from 'react';

import AuthService from '../../../services/api/auth.service'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        /**
        AuthService.authCheck().then( (resolve) => {
           // TOOO whats next
        }).catch( (error) => {
           // TOOO whats next
        });
        **/
    }
    render() {
        return(
            <React.Fragment>
            <h1>Dashboard {this.props.isLoggedIn === true ? 'JA' : 'NEIN'}</h1>
            </React.Fragment>
        )
    }
}

export default Dashboard