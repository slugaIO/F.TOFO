/**
 * Main Navigaion Bar
 */
import React from 'react';
import {Redirect} from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,InputGroup } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import { PersonFill,KeyFill, LayoutSidebarInsetReverse } from 'react-bootstrap-icons';
import Loader from 'react-loader-spinner'
import AuthService from '../../services/api/auth.service'
import Sidebar from "react-sidebar";  
class TopNavigation extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          email:'',
          password:'',
          loginError:false,
          showSpinner:false,
          rediectTo:'',
          sidebarOpen: false
      }
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    register = () => {
      this.setState({
        rediectTo:'REGISTER'
      })
    }
    setValue(property,val){
      this.setState({
          [property]:val.target.value
      })
    }
    logout = () => {
      AuthService.removeAuthCookie()
      .then((res) => {
          this.props.onAuthChange(false);
          this.setState({
            rediectTo:'HOMEPAGE'
          })
      })
      .catch((error) => {
          this.props.onAuthChange(false);
      });
    }
    login = () => {
        this.setState({
            showSpinner:true
        });
        AuthService.userLogin(this.state.email, this.state.password)
        .then( (response) => {
            if(response.status === 200){
              AuthService.setAuthCookieData(response);
              this.props.onAuthChange(true);
              this.setState({
                showSpinner:false,
                rediectTo:'DASHBOARD',
                email:'',
                password:''
              });
            }else{
                this.setState({showSpinner:false,loginError:true});
            }
        })
        .catch( (error) => {
            this.setState({showSpinner:false,loginError:true});
        });
    }
    render(){  
        return(
          <React.Fragment>
          {
            this.props.isLoggedIn === true ? 
                <Sidebar
                sidebar={<b>Sidebar content</b>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
                >
                </Sidebar>:null
          }
          <Navbar bg="dark" variant="dark">
          <Loader
              style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)'
              }}
              type="Bars" 
              color="#CCC"
              height={250}
              width={250}
              visible={this.state.showSpinner}
          />
          <Nav className="mr-auto">
          {
            this.props.isLoggedIn === true ? 
              <button onClick={() => this.onSetSidebarOpen(true)}>
                <LayoutSidebarInsetReverse/>
              </button>
              :null
          }
          </Nav>
          <Form>
          {
            this.props.isLoggedIn === false ? 
            <InputGroup className="mr-auto">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><PersonFill /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={ (val) => this.setValue('email', val) }  id="email" 
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="mr-sm-2"
            />
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><KeyFill/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={ (val) => this.setValue('password', val) }  id="password" type="password"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              className="mr-sm-2"
            />
            <Button variant="light"  className="mr-sm-2" onClick={this.login}>Login</Button>
            <Button variant="success"  className="mr-sm-2" onClick={this.register}>Register</Button>
          </InputGroup>:
          <InputGroup>
              <Button variant="danger"  className="mr-sm-2" onClick={this.logout}>Logout</Button>
          </InputGroup>
          }
          </Form>
          {
            this.state.rediectTo === 'REGISTER' ? 
            <Redirect to='/register'></Redirect>:null
          }
          {
            this.state.rediectTo === 'DASHBOARD' ? 
            <Redirect to='/dashboard'></Redirect>:null
          }
          {
            this.state.rediectTo === 'HOMEPAGE'? 
            <Redirect to='/'></Redirect>:null
          }
        </Navbar>
        </React.Fragment>
        )  
    }
}

export default withRouter(TopNavigation);