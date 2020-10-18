import React from 'react';
import {Link} from 'react-router-dom'

class Sidebar extends React.Component{
    render(){
        return(
            <nav class="main-menu">
            <h1>
               
            </h1>
            <ul>
            <li>
                <a className="#">
                <i className="fa fa-bar-chart-o fa-2x"></i>
                    <span className="nav-text">
                        Profile
                    </span>
                </a>
            </li>
            <li>
                <Link to={'/dashboard'}>
                    <i className="fa fa-bar-chart-o fa-2x"></i>
                    <span className="nav-text">
                        Dashboard
                    </span>
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/tasklist'}>
                <i className="fa fa-list fa-2x"></i>
                    <span className="nav-text">
                        Task List
                    </span>
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/addtask'}>
                <i className="fa fa-list fa-2x"></i>
                    <span className="nav-text">
                        Add Task
                    </span>
                </Link>
            </li>
            </ul>
            </nav>
        )
    }
}

export default Sidebar;
