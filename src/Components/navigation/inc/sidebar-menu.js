import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button, Dropdown, NavItem, NavLink } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'


class SidebarMenu  extends React.Component{
    style = {

    }
    render(){
        return(
            <Router>
                <Nav className="flex-column">
                    <Link to="/dashboard/tasks">Tasks</Link>
                </Nav>
            </Router>
        )
    }
}

export default withRouter(SidebarMenu);