import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Avatar, Link, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@material-ui/core'
// import { Button } from "@material-ui/core";
// import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000
      },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      borderWidth:10,
    //   borderColor: theme.palette.info.dark,
      backgroundColor: fade(theme.palette.info.light, 0.50),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function Register({ setisAuthenticated,props }){
    const classes = useStyles()
    const [search, setSearch] = useState("")

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSearch = event => {
        event.preventDefault()
        props.onSearch({search})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
        // cognito register api
        await Auth.signUp({
            username,
            password,
            attributes: {
            email: email
            }
        });
        setisAuthenticated(true);
        console.log("Successfully Register")
        //   history.push("/protected");
        } catch (error) {
            console.error(error.message)
        }
    };

 return (
    <section className="section auth">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <p className="control">
                <input
                    type="text"
                    className="input"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                />
            </p>
            <p className="control">
                <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

            </p>
            <p className="control">
                <input
                    className="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </p>
            <p className="control">
                <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </p>
            <h1>Preferences</h1>
            <p>What gender do you want to chill with?</p>
            <select name="genderPref" id="cars">
                <option value="" disabled selected>Select select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <p>Games to chill with:</p>
        <form className={classes.search} onSubmit={onSearch}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            {console.log(search)}
        </form>
            <p className="control">
                <input type="submit" name="Register" className="button is-success" />
            </p>
        </form>
    </section>
);
}