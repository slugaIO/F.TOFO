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

class TopNavigation extends React.Component{
    render(){
        return(
            <Navbar className="bg-light justify-content-between">
            <Form inline>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Form>
            <Form inline>
              <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
              <Button type="submit">Submit</Button>
            </Form>
          </Navbar>
        )  
    }
}

export default withRouter(TopNavigation);