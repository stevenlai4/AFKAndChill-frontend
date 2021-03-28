import React, { useState, useContext } from 'react';
import Form from '../../components/Profile/Form';
import Preferences from '../../components/Profile/Preferences';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { updateUser } from '../../network';
import { updateCognitoUser } from '../../userAuth';
import { UserContext } from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 5%',
    },
    loadingSVG: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    heading: {
        marginBottom: 20,
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#1A2E46',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0a1829',
        },
    },
    errorMsg: {
        color: 'red',
        fontWeight: 400,
    },
}));

export default function ProfilePage() {
    const classes = useStyles();
    const [gameSearch, setGameSearch] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [open, setOpen] = useState(false);

    // Handle errors function
    const handleErrors = () => {
        let tempArr = [];

        //Game minimum selection validation
        if (user.games.length <= 0) {
            tempArr.push('Please select at least 1 game!');
        }

        return tempArr;
    };

    // Handle update form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsUpdating(true);

        // Check user input errors before access the database
        const errors = handleErrors();

        if (errors.length > 0) {
            setErrorMsgs(errors);
            setIsUpdating(false);

            // Scroll to top if there are error(s)
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            return;
        } else {
            setErrorMsgs([]);
        }

        try {
            // Update username in cognito
            await updateCognitoUser({
                name: user.name,
            });

            // Update user info in the database
            const response = await updateUser({
                name: user.name,
                about: user.about,
                gender: user.gender,
                genderPref: user.gender_pref,
                photoUrl:
                    user.photo_url ||
                    'https://afk-and-chill-bucket.s3.us-east-2.amazonaws.com/Portrait_Placeholder.png',
                games: user.games,
            });

            if (response) {
                setSuccessMsg(response);
                setOpen(true);
            }

            setIsUpdating(false);
        } catch (error) {
            setErrorMsgs([error.message]);
            setIsUpdating(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <>
                <Typography className={classes.heading} variant="h3">
                    Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    {errorMsgs.map((errorMsg) => (
                        <p className={classes.errorMsg}>{errorMsg}</p>
                    ))}
                    <Form user={user} setUser={setUser} />
                    <Preferences
                        gameSearch={gameSearch}
                        setGameSearch={setGameSearch}
                        user={user}
                        setUser={setUser}
                    />
                    {isUpdating ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            id="Register"
                            className={classes.button}
                        >
                            Update
                        </Button>
                    )}
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        {successMsg}
                    </Alert>
                </Snackbar>
            </>
        </div>
    );
}
