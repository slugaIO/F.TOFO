import React from 'react';
import { Paper,  Button, Checkbox, Container, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


class Login extends React.Component {
    state = {
        email:'',
        password:'',
        loginError:false
    }
    constructor(props){
        super(props);
        this.updateState = this.props.updateState;
    }
    setValue(property,val){
        this.setState({
            [property]:val.target.value
        })
    }
    doLogin = () =>  {
        console.table({
            message:'login',
            email:this.state.email,
            password:this.state.password
        });
        const API_URL = `//${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/user/login`;
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
            console.log("login");
            console.table(response.data);
            if(response.data.success){
                const accessToken  = response.data.tokens.accessToken || '';
                const refreshToken = response.data.tokens.refreshToken || '';
                this.updateState({
                    access:{
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        isAuthorized:true
                    },
                    navigation:{}
                });
            }
        })
        .catch( (error) => {
            const success = error.response.data.success;
            const status  = error.response.status;
            this.setState({
                loginError:true
            })
        });
    }
    render() {
    
        const style = {
            padding:{
                paddingLeft:'10px'
            },
            margin:{
                paddingLeft:'10px'
            }
        }
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
            <Typography variant="h6" style={style.title}>
                Login
            </Typography>
            </Container>
            <Container maxWidth="sm">
            <Paper style={style.padding}>
                <div style={style.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                          <TextField 
                          error={this.state.loginError}
                          onChange={ (val) => this.setValue('email', val) }  id="email" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            error={this.state.loginError}
                            onChange={ (val) => this.setValue('password', val) } id="username" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={this.doLogin} variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
            </Container>
            </React.Fragment>
        );
    }
}

export default Login;