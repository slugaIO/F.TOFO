/**
 * Todo add Menu
 */
import React from 'react';
import Sidebar from "react-sidebar";  

class TaskSideBar extends React.Component{
    style = {
        root: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden"
        },
        sidebar: {
          zIndex: 2,
          position: "absolute",
          top: 0,
          bottom: 0,
          transition: "transform .3s ease-out",
          WebkitTransition: "-webkit-transform .3s ease-out",
          willChange: "transform",
          overflowY: "auto",
          backgroundColor:"white",
          padding:"5%"
        },
        content: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out"
        },
        overlay: {
          zIndex: 1,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          visibility: "hidden",
          transition: "opacity .3s ease-out, visibility .3s ease-out",
          backgroundColor: "rgba(0,0,0,.3)"
        },
        dragHandle: {
          zIndex: 1,
          position: "fixed",
          top: 0,
          bottom: 0
        }
    };
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
            styles={this.style}
        >
        <button onClick={() => this.props.onSetSidebarOpen(true)}>
            Open sidebar
        </button>
        </Sidebar>
        )
    }
}

export default TaskSideBar;