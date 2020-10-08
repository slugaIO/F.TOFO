import React from 'react';
import {Container, Typography } from '@material-ui/core';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <React.Fragment>
            <Container maxWidth="sm">
            <Typography variant="h6">
                Dashboard
            </Typography>
            </Container>
            </React.Fragment>
        )
    }
}

export default Dashboard