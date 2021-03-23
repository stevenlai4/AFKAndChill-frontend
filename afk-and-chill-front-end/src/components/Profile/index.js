import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Select,
    MenuItem,
    TextField,
    FormControl,
    Button,
} from '@material-ui/core';

import EditForm from './Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        width: '100%',
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
}));

export default function Profile({ userInfo, setUserInfo, games }) {
    const classes = useStyles();
    const [gameSearch, setGameSearch] = useState('');
    const [file, setFile] = useState();

    // Modal handling
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    return (
        <div>
            <div className={classes.wrapper}>
                <div className={classes.register}>
                    {/* Profile form */}
                    <div className={classes.registerForm}>
                        <h3>Chiller Name:</h3> {userInfo.name}
                        {console.log({ userInfo })}
                        <h3>Gender:</h3> {userInfo.gender}
                        <h3>Gender you want to chill with: </h3>{' '}
                        {userInfo.gender_pref}
                        <h3>About you:</h3>
                        {userInfo.about}
                    </div>
                    {/* profile image */}
                    <div>
                        <img
                            src={userInfo.photo_url}
                            alt={userInfo.name}
                            width="400"
                            height="400"
                        />
                        <div>
                            <input
                                filename={file}
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <h3>Games you have selected</h3>
                        {userInfo?.games?.map((game) => (
                            <p key={game.id}>{game.name}</p>
                        ))}
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
                </div>
            </div>
            {/* ===== MODAL ========= */}
            <EditForm
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                show={show}
                setShow={setShow}
            />
        </div>
    );
}
