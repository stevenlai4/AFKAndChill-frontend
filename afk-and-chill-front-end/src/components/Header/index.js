import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Link,
    MenuItem,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: 'transparent',
        boxShadow: 'none',
    },
    logo: {
        flexGrow: 1,
    },
    menuText: {
        color: 'white',
    },
    logoImage: {
        width: 300,
        height: 100,
    },
}));

export default function Header({
    isAuthenticated,
    signOut,
    login,
    findChillersClicked,
    chillersPostClicked,
    AFKChatClicked,
    logoClicked,
    profileClicked,
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link onClick={logoClicked} className={classes.logo}>
                        <img
                            alt="logo"
                            src="https://i.imgur.com/YFG6nH6.png"
                            className={classes.logoImage}
                        />
                    </Link>
                    {isAuthenticated ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle
                                    fontSize="large"
                                    color="action"
                                />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={profileClicked}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link
                            component="button"
                            variant="body2"
                            color="primary"
                            onClick={login}
                        >
                            Login
                        </Link>
                    )}
                </Toolbar>
                <Toolbar style={{ background: '#2E3B55' }}>
                    <Grid
                        justify="space-around" // Add it here :)
                        container
                        spacing={2}
                    >
                        <Grid item>
                            <Link
                                onClick={findChillersClicked}
                                className={classes.menuText}
                                component="button"
                            >
                                Find Chillers
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                onClick={chillersPostClicked}
                                className={classes.menuText}
                                component="button"
                            >
                                Chiller's Posts
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                onClick={AFKChatClicked}
                                className={classes.menuText}
                                component="button"
                            >
                                AFK chat
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
