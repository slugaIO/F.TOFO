import React from 'react';
import {Link} from 'react-router-dom'

class SidebarMenu  extends React.Component{
    style = {
        container:{
            paddingLeft:'80px',
            paddingRight:'80px'
        },
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
            <React.Fragment style={this.style.container}>
            <strong>Task Manager</strong>
            <ul style={this.style.ul}>
                <li style={this.style.li}>
                    <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li  style={this.style.li}>
                    <Link to={"/dashboard/addTask"}>Add Task</Link>
                </li>
                <li  style={this.style.li}>
                    <Link to={"/dashboard/tasklist"}>Task List</Link>
                </li>
            </ul>
            <hr/>
            <strong>Profile</strong>
            <ul>
                <li>
                    <Link to={"/profile"}>Einstellungen</Link>
                </li>
                <li>
                    <Link to={"/profile"}>Premium</Link>
                </li>
            </ul>
            <hr/>
            </React.Fragment>
        )
    }
}

export default SidebarMenu;