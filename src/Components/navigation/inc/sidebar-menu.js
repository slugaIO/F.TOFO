import React from 'react';
import {Link} from 'react-router-dom'

class SidebarMenu  extends React.Component{
    sidebareCSS = {
        ul:{
            margin: '0 0 1em 0',
            padding: '0 0 0 1em',
            listStyle: 'none'
        }, 
        li:{
            position:'relative',
            paddingLeft: '0.4em'
        }
    }
    render(){
        return(
            <React.Fragment>
            <strong>Task Manager</strong>
            <ul style={this.sidebareCSS.ul}>
                <li style={this.sidebareCSS.li}>
                    <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li style={this.sidebareCSS.li}>
                    <Link to={"/dashboard/addTask"}>Add Task</Link>
                </li>
                <li style={this.sidebareCSS.li}>
                    <Link to={"/dashboard/tasklist"}>Task List</Link>
                </li>
            </ul>
            <hr/>
            <strong>Profile</strong>
            <ul  style={this.sidebareCSS.ul}>
                <li style={this.sidebareCSS.li}>
                    <Link to={"/profile"}>Einstellungen</Link>
                </li>
                <li style={this.sidebareCSS.li}>
                    <Link to={"/profile"}>Premium</Link>
                </li>
            </ul>
            <hr/>
            </React.Fragment>
        )
    }
}

export default SidebarMenu;