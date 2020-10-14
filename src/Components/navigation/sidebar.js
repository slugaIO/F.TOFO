import React from 'react';
import Sidebar from "react-sidebar";  

class TaskSideBar extends React.Component{
    constructor(props){
        super(props);
        console.log("Sidebar : isLoggedIn "+this.props.isLoggedIn);
    }
    foo(){

    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.isLoggedIn === 'H' ? 
                    <Sidebar
                    sidebar={<b>Sidebar content</b>}
                    open={false}
                    onSetOpen={this.foo}
                    styles={{ sidebar: { background: "white" } }}
                    />
                    :null
              }
            </React.Fragment>
        )
    }
}

export default TaskSideBar;