// import React from 'react';
// import PersonIcon from '@material-ui/icons/Person';
// import { Auth } from 'aws-amplify';
// import { Navbar, Nav } from 'react-bootstrap';
// import { Link, NavLink, useHistory } from 'react-router-dom';

// // const Header = () => {
//     // Handle when Logout is clicked
//     const handleLogOut = async () => {
//         try {
//             await Auth.signOut();
//             console.log("Log Out successful");
//             history.push("/");
//         } catch (e) {
//             console.log(e.message);
//         }
//     };
//     const history = useHistory();
//     return (
//         <Navbar expand="lg">
//             <section>
//                 <Navbar.Brand>
//                     <h1>AFK & CHILL</h1>
//                 </Navbar.Brand>
//                 <NavLink
//                     to="/"
//                     className=""
//                     onClick={() => {
//                         handleLogOut();
//                     }}
//                 >
//                     Log Out
//                 </NavLink>
//                 <PersonIcon fontSize="large" />
//             </section>
//             <Nav className="">
//                 <NavLink to="/chillers" className="px-2">
//                     Find Chillers
//                 </NavLink>
//                 <NavLink to="/posts" className="px-2">
//                     Chiller's Posts
//                 </NavLink>
//                 <NavLink to="/chat" className="px-2">
//                     AFK chat
//                 </NavLink>
//             </Nav>
//         </Navbar>
//     );
// };

// export default Header;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link, MenuItem } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
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

export default function Header({ isAuthenticated, signOut, login }) {
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        AKF & Chill
                    </Typography>
                    {isAuthenticated ? (
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
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={login}
                        >
                            Login
                        </Link>
                    )}
                    {console.log(`auth is ${isAuthenticated}`)}
                </Toolbar>
            </AppBar>
        </div>
    );
}
