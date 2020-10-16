import React from 'react';
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'


class SidebarMenu  extends React.Component{
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

export default SidebarMenu;