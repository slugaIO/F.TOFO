import React from 'react';
import {Container, Typography } from '@material-ui/core';

class Welcome extends React.Component{
    render() {
        return(
            <React.Fragment>
            <Container maxWidth="sm">
            <Typography variant="h6">
                Welcome
            </Typography>
            </Container>
            </React.Fragment>
        )
    }
}

export default Welcome