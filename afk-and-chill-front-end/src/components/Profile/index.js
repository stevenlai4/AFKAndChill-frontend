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
import Modal from 'react-bootstrap/Modal';

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
        width: '90%',
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

    //===================
    //== Modal styles ==
    //===================

    modalSection: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        // maxHeight: '500px',
        // overflowY: 'hidden',
        $zindexModal: 100001,
    },
    modalTitle: {
        color: 'white',
    },
}));

export default function Profile({ onSubmitSearch, user, games }) {
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

    //Button handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        if (username === null || username === '') {
            setUserNameError('Username can not be blank');
            return;
        }
    };

    // const onUpdate = (data) => {
    //     updateUser({ gender_pref: data.genderPref });
    //     console.log('updategender pref', data);
    // };

    return (
        <div>
            <div className={classes.wrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.register}>
                        {/* Profile form */}
                        <div className={classes.registerForm}>
                            <h3>Chiller Name:</h3> {user.name}
                            <h3>Gender:</h3> {user.gender}
                            <h3>Gender you want to chill with: </h3>{' '}
                            {user.gender_pref}
                            <h3>About you:</h3>
                            {user.about}
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
                            <h3>Games you have selected</h3>
                            {/* {games.map((game) => (
                                <p key={game.id}>{game.name}</p>
                            ))} */}
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
            </div>
            {/* ===== MODAL ========= */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={classes.modalSection}
            >
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: '#2E3B55' }}
                >
                    <Modal.Title className={classes.modalTitle}>
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Chiller Name:</p>
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
                    <p>What is your gender?</p>
                    <FormControl className={classes.formControl}>
                        <Select
                            defaultValue="other"
                            variant="outlined"
                            required={true}
                            value={user.gender}
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
                            value={genderPref}
                            required={true}
                            onChange={(e) => setGenderPref(e.target.value)}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <p>About you:</p>
                    <TextField
                        multiline
                        rowsMax="4"
                        margin="normal"
                        variant="outlined"
                        value={user.about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
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
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onUpdate={onUpdate}></Button> */}
                    <Button
                        variant="outlined"
                        style={{ background: 'green' }}
                        onClick={handleEdit}
                    >
                        Save Changes
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ background: 'red' }}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
