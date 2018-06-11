/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
            <AppBar position='static'>
                <Toolbar style={{styles}}>
                    <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='title' color='inherit' className={classes.flex} >
                        Loris
                    </Typography>
                    <div>
                        <Button color='inherit' aria-label="Add">Candidate</Button>
                        <Button color='inherit'>Clinical</Button>
                        <Button color='inherit'>Imaging</Button>
                        <Button color='inherit'>Reports</Button>
                        <Button color='inherit'>Tools</Button>
                        <Button color='inherit'>Admin</Button>
                    </div>
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);