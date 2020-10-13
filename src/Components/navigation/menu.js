/**
 * Main Navigaion Bar
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button,InputGroup } from 'react-bootstrap'
  import {withRouter} from 'react-router-dom'
  import { PersonFill,KeyFill } from 'react-bootstrap-icons';

class TopNavigation extends React.Component{
    render(){
        return(
          <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto"> </Nav>
          <Form inline>
          <InputGroup  ml-auto>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><PersonFill /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="mr-sm-2"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><KeyFill/></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon1"
            className="mr-sm-2"
          />
          <Button variant="info"  className="mr-sm-2">Login</Button>
          <Button variant="success"  className="mr-sm-2">Register</Button>
        </InputGroup>
          </Form>
        </Navbar>
        )  
    }
}

export default withRouter(TopNavigation);