<<<<<<< HEAD
import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Container, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import CssBaseline from '@material-ui/core/CssBaseline';


class Register extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    doLogin = () =>  {
        alert(`${process.env.REACT_APP_API_HOST}`);
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
                            <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" fullWidth required />
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

export default Register;
=======
>>>>>>> parent of 846ac96... login to dashboard works via API
