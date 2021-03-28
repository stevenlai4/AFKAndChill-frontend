import React, { useEffect, useState } from 'react';
import Form from '../../components/Profile/Form';
import Preferences from '../../components/Profile/Preferences';
import { Button, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { updateUser, getUser } from '../../network';
import { updateCognitoUser } from '../../userAuth';
import { Auth } from 'aws-amplify';
import { ReactComponent as LoadingBeanEater } from '../../assests/loading-bean-eater.svg';

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
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        photoUrl: '',
        about: '',
        gender: '',
        genderPref: '',
        games: [],
    });
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // CDM
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                // Fetch current user from MongoDB
                const response = await getUser();
                const tempUserInfo = response.user;

                // Fetch current authenticated user from cognito
                const cognitoUserInfo = await Auth.currentUserInfo();

                if (response && cognitoUserInfo) {
                    setUserInfo({
                        name: tempUserInfo.name,
                        email: cognitoUserInfo.attributes.email,
                        about: tempUserInfo.about,
                        photoUrl: tempUserInfo.photo_url,
                        gender: tempUserInfo.gender,
                        genderPref: tempUserInfo.gender_pref,
                        games: tempUserInfo.games,
                    });
                }

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    // Handle errors function
    const handleErrors = () => {
        let tempArr = [];

        //Game minimum selection validation
        if (userInfo.games.length <= 0) {
            tempArr.push('Please select at least 1 game!');
        }

        return tempArr;
    };

    // Handle update form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check user input errors before access the database
        const errors = handleErrors();

        if (errors.length > 0) {
            setErrorMsgs(errors);
            return;
        } else {
            setErrorMsgs([]);
        }

        try {
            // Update username in cognito
            await updateCognitoUser({
                name: userInfo.name,
            });

            // Update user info in the database
            const response = await updateUser({
                name: userInfo.name,
                about: userInfo.about,
                gender: userInfo.gender,
                genderPref: userInfo.genderPref,
                photoUrl:
                    userInfo.photoUrl ||
                    'https://afk-and-chill-bucket.s3.us-east-2.amazonaws.com/Portrait_Placeholder.png',
                games: userInfo.games,
            });

            setSuccessMsg(response);
            setOpen(true);
        } catch (error) {
            setErrorMsgs([error.message]);
            console.error(error.message);
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
            {isLoading ? (
                <LoadingBeanEater className={classes.loadingSVG} />
            ) : (
                <>
                    <Typography className={classes.heading} variant="h3">
                        Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {errorMsgs.map((errorMsg) => (
                            <p className={classes.errorMsg}>{errorMsg}</p>
                        ))}
                        <Form userInfo={userInfo} setUserInfo={setUserInfo} />
                        <Preferences
                            gameSearch={gameSearch}
                            setGameSearch={setGameSearch}
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            id="Register"
                            className={classes.button}
                        >
                            Update
                        </Button>
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
            )}
        </div>
    );
}
