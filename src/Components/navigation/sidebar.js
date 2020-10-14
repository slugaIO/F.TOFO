import React from 'react';
import Sidebar from "react-sidebar";  

class TaskSideBar extends React.Component{
    render(){
        if(!this.props.isLoggedIn){
            return (
               <React.Fragment/>
            )
        }
        return(
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={this.props.sidebarOpen}
            onSetOpen={this.props.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
        >
        <button onClick={() => this.props.onSetSidebarOpen(true)}>
            Open sidebar
        </button>
        </Sidebar>
        )
    }
}

export default TaskSideBar;