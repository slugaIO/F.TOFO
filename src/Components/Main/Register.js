import React from 'react';
import axios from 'axios'
import { Paper,  Grid, TextField, Button, FormControlLabel,  Container, Typography } from '@material-ui/core';
import { Face, Fingerprint,Group } from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

// TODO add forgot password
class Register extends React.Component {
    state = {
        email:'',
        password:'',
        gender:'',
        registrationError:false
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
    registration = () =>  {
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
            if(response.data.success && response.data && response.data.tokens){
                console.log("Login to dashbaord");
                const accessToken  = response.data.tokens.accessToken || '';
                const refreshToken = response.data.tokens.refreshToken || '';
                this.updateState({
                    access:{
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        isAuthorized:true
                    },
                    navigation:{
                        dashboard:true
                    }
                });
            }else{
                this.setState({
                    registrationError:true
                })
            }
        })
        .catch( (error) => {
            const success = error.response.data.success;
            const status  = error.response.status;
            this.setState({
                registrationError:true
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
            <Paper style={style.padding}>
                <Typography variant="h6" style={style.title}>
                     Register
                </Typography>
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
                            <TextField id="regPassword" label="Password" type="password" fullWidth required error={this.state.registrationError}   onChange={ (val) => this.setValue('email', val) } />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                    <Grid container justify="center" style={{ marginBottom: '10px' }}>
                        <Button onClick={this.registration} variant="outlined" color="primary" style={{ textTransform: "none" }} style={{marginBottom:'20px'}}>Register</Button>
                    </Grid>
                </div>
            </Paper>
            </Container>
        </React.Fragment>
        );
    }
}

export default Register;
