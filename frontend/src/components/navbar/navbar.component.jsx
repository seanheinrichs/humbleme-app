import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({onToggle}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [checked, setChecked] = useState(false);
    const [appVersion, setAppVersion] = useState('Toasted');
    const [appColor, setAppColor] = useState('#399CBD');
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeVersion = () => {
        if (checked) {
            setAppVersion('Toasted');
            setAppColor('#399CBD');
        }
        else {
            setAppVersion('Roasted');
            setAppColor('#FF6347');
        }
    }
    
    return(
        <div className={classes.root}>
        <AppBar position="static" style={{ background: appColor }}>
          <Toolbar>
            <Switch onChange={() => {onToggle() ; setChecked(!checked); changeVersion(checked); } } />
            <Typography variant="h6" className={classes.title}>
                Get <b>{appVersion}!</b>
            </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default NavBar;