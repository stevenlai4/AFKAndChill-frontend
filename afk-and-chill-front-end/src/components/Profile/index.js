import React, { useState } from 'react';
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
import { Modal } from 'react-bootstrap';

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
        width: '100%',
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
    submitButtonSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    submitButton: {
        width: '30%',
        margin: '5%',
    },
    helperText: {
        color: 'red',
    },
}));

export default function Register({ onSubmitSearch }) {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [genderPref, setGenderPref] = useState('');
    const [gender, setGender] = useState('');
    const [file, setFile] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    // Error Handling
    const [userNameError, setUserNameError] = useState('');

    // Modal handling
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username === null || username === '') {
            setUserNameError('Username can not be blank');
            return;
        }
    };

    return (
        <section className={classes.wrapper}>
            <form onSubmit={handleSubmit}>
                <div className={classes.register}>
                    {/* Profile form */}
                    <div className={classes.registerForm}>
                        <h3>Chiller Name</h3>
                        <TextField
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            FormHelperTextProps={{
                                className: classes.helperText,
                            }}
                            helperText={userNameError}
                            id="username"
                            value={username}
                            autoComplete="on"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <h3>Email</h3>
                        <TextField
                            required={true}
                            variant="outlined"
                            type="email"
                            id="email"
                            className={classes.input}
                            value={email}
                            autoComplete="on"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3>What is your gender?</h3>
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
                        <h3>What gender do you want to chill with?</h3>
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
                        <h3>About you</h3>
                        <TextField
                            multiline
                            rowsMax="4"
                            margin="normal"
                            variant="outlined"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        <h3>Games to chill with:</h3>
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
                        {/* <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            id="Register"
                            className={classes.button}
                        >
                            Submit
                        </Button> */}
                    </div>
                    {/* profile image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1615396662271-e313de4da9ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
                            alt="raining"
                            width="400"
                            height="400"
                        ></img>
                        <div>
                            <input
                                filename={file}
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <h3>Game(s) you have selected</h3>
                        <div>
                            <p>PUBG</p>
                            <p>Aminal Crossing</p>
                            <p>League of Legends</p>
                        </div>
                    </div>
                </div>
                <div className={classes.submitButtonSection}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        id="Register"
                        className={classes.submitButton}
                        onClick={handleShow}
                    >
                        Edit profile
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        id="Register"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header
                    closeButton
                    // style={{ backgroundColor: '#3D3D3D' }}
                >
                    <Modal.Title>Edit Chiller Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to
                    press escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}
