import React from 'react';
import { Paper,  Button, Container, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import AuthService from '../../services/api/auth.service'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            loginError:false,
            showSpinner:false
        }
    }
    setValue(property,val){
        this.setState({
            [property]:val.target.value
        })
    }
    doLogin = () =>  {
        this.setState({
            showSpinner:true
        });
        AuthService.userLogin(this.state.email, this.state.password)
        .then( (response) => {
            if(response.status === 200){
               this.setState({showSpinner:false});
               AuthService.setAuthCookieData(response);
               this.props.onAuthChange(true);
            }else{
                this.setState({showSpinner:false,loginError:true});
            }
        })
        .catch( (error) => {
            this.setState({showSpinner:false,loginError:true});
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
                <Paper style={style.padding}>
                    <Typography variant="h6" style={style.title}>
                        Login 
                    </Typography>
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
                        <Button onClick={this.doLogin} variant="outlined" color="primary" style={{marginBottom:'20px'}}>Login</Button>
                    </Grid>
                </div>
            </Paper>
            </Container>
            </React.Fragment>
        );
    }
}

export default Login;