import React from 'react';
import {Container, Row} from 'react-bootstrap'
import { IconContext } from "react-icons";
import { BiUser } from "react-icons/bi";
import { FaBeer } from 'react-icons/fa';



class SidebarUser extends React.Component{
    constructor(props){
        super(props);
    }
    sidebarUser = {
        headline:{
            textAlign:'center'
        },
        container:{
            backgroundColor:'#CCC',
            borderRadius:'10px',
            padding:'15px'
        }
    }
    render(){
        return (
            <React.Fragment>
                <IconContext.Provider value={{ color: "black", className: "global-class-name" }} >
                    <div style={this.sidebarUser.container} className='border border-white'>
                        <h1 style={this.sidebarUser.headline}><BiUser /></h1>
                    </div>
                </IconContext.Provider>
            </React.Fragment>
        )
    }
}

export default SidebarUser;