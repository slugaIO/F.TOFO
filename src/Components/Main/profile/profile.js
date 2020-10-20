import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col}  from 'react-bootstrap';

import Sidebar from '../../navigation/sidebar'

class Profile extends React.Component{
    dashboardStyle = {
        sidebar:{
            background:'rgba(0, 0, 0, 0.75)',
            padding:'32px',
            borderRight:'2px solid #586069'
        },
        dashboard:{
            backgroundColor: '#fafbfe'
        }
    }
    render(){
            return(
                    <Container fluid className='fill-window'>
                        <Row className='fill-window'>
                            <Col style={this.dashboardStyle.sidebar} md="auto">
                                <Sidebar />
                            </Col>
                            <Col md="auto" xl style={this.dashboardStyle.dashboard}>
                                <h1>Profile</h1>
                            </Col>
                        </Row>
                    </Container>
            )
    }
}

export default withRouter(Profile);