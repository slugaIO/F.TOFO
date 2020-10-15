import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button, Dropdown, NavItem, NavLink } from 'react-bootstrap'



class SidebarMenu  extends React.Component{
    style = {

    }
    render(){
        return(
            <Nav className="flex-column">
                <Nav.Link href="/">Tasks</Nav.Link>
            </Nav>
        )
    }
}

export default SidebarMenu;