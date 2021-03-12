import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
    Select,
    InputBase,
    MenuItem,
    TextField,
    FormControl,
    Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    },
    wrapper: {
        margin: 30,
    },
    formControl: {
        minWidth: 100,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.secondary, 0.05),
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
    input: {
        marginBottom: 20,
        width: '200%',
    },
    register: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    registerForm: {
        flexDirection: 'column',
        display: 'flex',
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    button: {
        marginTop: 20,
    },
}));

export default function Register({ onSubmitSearch }) {
    const classes = useStyles();
    const history = useHistory();

    const [search, setSearch] = useState('');
    const [genderPref, setGenderPref] = useState('');
    const [gender, setGender] = useState('');
    const [file, setFile] = useState();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const onSearch = (event) => {
    //     event.preventDefault();
    //     onSearch({ search });
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // cognito register api
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email: email,
                    name: username,
                },
            });
            console.log('Successfully Register');
            history.push('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section className={classes.wrapper}>
            <form onSubmit={handleSubmit}>
                <div className={classes.register}>
                    <div>
                        <h1>Register</h1>
                        <div className={classes.registerForm}>
                            <TextField
                                required={true}
                                type="text"
                                label="username"
                                variant="outlined"
                                className={classes.input}
                                id="username"
                                value={username}
                                autoComplete="on"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                required={true}
                                label="email"
                                variant="outlined"
                                type="email"
                                id="email"
                                className={classes.input}
                                value={email}
                                autoComplete="on"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required={true}
                                label="password"
                                variant="outlined"
                                className={classes.input}
                                type="password"
                                id="password"
                                value={password}
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                required={true}
                                label="confirm password"
                                variant="outlined"
                                className={classes.input}
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                autoComplete="on"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <h1>Preferences</h1>
                        <p>What is your gender?</p>
                        <FormControl className={classes.formControl}>
                            <Select
                                defaultValue="other"
                                variant="outlined"
                                required={true}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <p>What gender do you want to chill with?</p>
                        <FormControl className={classes.formControl}>
                            <Select
                                defaultValue="other"
                                variant="outlined"
                                required={true}
                                onChange={(e) => setGenderPref(e.target.value)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <p>Games to chill with:</p>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                value={search}
                                onKeyUp={(event) => {
                                    if (event.keyCode === 13) {
                                        onSubmitSearch = { search: search };
                                    }
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.searchInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            id="Register"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </div>

                    <div>
                        <input
                            filename={file}
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            accept="image/*"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}
