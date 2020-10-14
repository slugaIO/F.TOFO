import React from 'react';
import Sidebar from "react-sidebar";  

class TaskSideBar extends React.Component{
    constructor(props){
        super(props);
    }
    foo(){

    }
    render(){
        console.table({
            message:'sidebar.js',
            propsIsLoggedIn:this.props.isLoggedIn
        })
        return(
            <React.Fragment>
            {
                this.props.isLoggedIn === 'H' ? 
                    <Sidebar
                    sidebar={<b>Sidebar content</b>}
                    open={this.props.sidebarOpen}
                    onSetOpen={this.props.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white" } }}
                    />
                    :null
              }
            </React.Fragment>
        )
    }
}

export default TaskSideBar;