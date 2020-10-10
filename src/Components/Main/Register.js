import React from 'react';
import axios from 'axios'
import { Paper,  Grid, TextField, Button, Container, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import AuthService from '../../services/api/auth.service'

// TODO add forgot password
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            gender:'', 
            registrationError:false,
            showSpinner:false
        }
    }
    setValue(property,val){
        this.setState({
            [property]:val.target.value
        })
    }
    registration = () =>  {
        this.setState({
            showSpinner:true
        })
        const API_URL = `//${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/user/register`;
        const data    = JSON.stringify({"email":`${this.state.email}`,"password":`${this.state.password}`});
        const config  = {
            method:'post',
            url:API_URL,
            headers:{
                'Content-Type': 'application/json'
            },
            data:data
        };
        axios(config)
        .then( (response) => {
            console.log(`response : ${response.status}`)
            if(response.status === 200){
                console.log("create User");
                AuthService.setAuthCookieData(response);
                this.setState({showSpinner:false})
                this.props.onAuthChange(true);
            }
            else{
                console.log("response rrror");
                this.setState({showSpinner:false,registrationError:true});
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({showSpinner:false,registrationError:true})
        });
    }
    render() {
        const style = {
            margin:{
                paddingLeft:'10px'
            }
        }
    return (
        <React.Fragment>
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
        <CssBaseline />
        <Container maxWidth="sm">
                <Typography variant="h6" style={style.title}>
                    Register
                </Typography>
        </Container>
        <Container maxWidth="sm">
            <Paper>
                <div style={style.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="regEmail" label="Username" type="email" fullWidth autoFocus required error={this.state.registrationError}  onChange={ (val) => this.setValue('email', val) }  />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="regPassword" label="Password" type="password" fullWidth required error={this.state.registrationError}   onChange={ (val) => this.setValue('password', val) } />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                    <Grid container justify="center" style={{ marginBottom: '10px' }}>
                        <Button onClick={this.registration} variant="outlined" color="primary" style={{marginBottom:'20px'}}>Register</Button>
                    </Grid>
                </div>
            </Paper>
        </Container>
        </React.Fragment>
        );
    }
}

export default Register;
