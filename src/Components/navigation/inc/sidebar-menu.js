import React from 'react';
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'


class SidebarMenu  extends React.Component{
    render(){
        return(
            <React.Fragment>
            <strong>Task Manager</strong>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/dashboard/addTask"}>Add Task</Link>
                <Link to={"/dashboard/tasklist"}>Task List</Link>
            </React.Fragment>
        )
    }
}

export default SidebarMenu;