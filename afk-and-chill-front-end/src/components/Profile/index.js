import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Snackbar, Button, Card, Chip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import EditForm from './Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        width: '100%',
    },
    cardProfile: {
        backgroundColor: '#fff',
        color: 'black',
        width: '40%',
        boxShadow: '5px 5px 14px #2E3B55',
    },

    cardTitle: {
        color: '#fff',
        backgroundColor: '#2E3B55',
        textAlign: 'center',
        textShadow:
            '-1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, 2px 2px 2px rgba(206,89,55,0)',
        paddingTop: '4%',
        paddingBottom: '3%',
    },

    cardInfo: {
        flexDirection: 'column',
        display: 'flex',
        marginTop: '2%',
    },

    gameInfo: {
        color: 'white',
        textShadow:
            '-1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, 2px 2px 2px rgba(206,89,55,0)',
        backgroundColor: '#2E3B55',
        paddingTop: '5%',
        textAlign: 'center',
        paddingBottom: '3%',
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
    profileInfo: {
        flexDirection: 'row',
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

    wrapper: {
        margin: 30,
    },
}));

export default function Profile({ userInfo, setUserInfo }) {
    const classes = useStyles();
    const [gameSearch, setGameSearch] = useState('');
    const [file, setFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [modalShow, setModalShow] = useState(false);

    // Snackbar state
    const [open, setOpen] = useState(false);

    // Modal handling
    const handleShow = () => setModalShow(true);

    // Snackbar close handling
    const handleSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {successMsg}
                </Alert>
            </Snackbar>
            <div className={classes.wrapper}>
                <div className={classes.register}>
                    {/* Profile display information */}
                    <Card className={classes.cardProfile}>
                        <h3 className={classes.cardTitle}>About Me</h3>
                        <div className={classes.cardInfo}>
                            <p>
                                {' '}
                                <strong>Chiller Name:</strong> {userInfo.name}{' '}
                            </p>
                            {/* {console.log({ userInfo })} */}
                            <p>
                                {' '}
                                <strong>Gender: </strong> {userInfo.gender}{' '}
                            </p>
                            <p>
                                <strong>Gender you want to chill with: </strong>
                                {userInfo.gender_pref}
                            </p>
                            <p>
                                <strong>About you: </strong>
                                {userInfo.about}
                            </p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            style={{ bottom: 0 }}
                        >
                            <path
                                fill="#2E3B55"
                                fill-opacity="1"
                                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ></path>
                        </svg>
                    </Card>
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
                        <h3
                            style={{ marginTop: '2%' }}
                            className={classes.gameInfo}
                        >
                            Favorite games!
                        </h3>

                        {userInfo?.games?.map((game) => (
                            <p key={game.id}>
                                {' '}
                                <Chip
                                    label={game.name}
                                    color="primary"
                                    clickable
                                />
                            </p>
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
                modalShow={modalShow}
                setModalShow={setModalShow}
                setSuccessMsg={setSuccessMsg}
                setOpen={setOpen}
            />
        </>
    );
}
