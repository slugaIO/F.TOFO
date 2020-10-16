import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button, Dropdown, NavItem, NavLink } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'


class SidebarMenu  extends React.Component{
    style = {

    }
    render(){
        return(
            <Nav>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/register"}>register</Link>
                <Link to={"/dashboard/addTask"}>Add Task</Link>
                <Link to={"/dashboard/tasklist"}>Task List</Link>
            </Nav>
        )
    }
}

export default withRouter(SidebarMenu);