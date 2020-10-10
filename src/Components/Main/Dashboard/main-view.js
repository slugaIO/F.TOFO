import React from 'react'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});
  

class MainView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Container maxWidth="md" className={classes.main}>
                <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
                </Container>
            </Grid>
           </div>
        )
    }
}

export default withStyles(styles)(MainView);