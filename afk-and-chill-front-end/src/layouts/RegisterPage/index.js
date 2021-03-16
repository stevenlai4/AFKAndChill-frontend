import React, { useState } from 'react';
import Form from '../../components/Register/Form';
import Preferences from '../../components/Register/Preferences';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../network';
import { register } from '../../userAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 5%',
    },
    heading: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    errorMsg: {
        color: 'red',
        fontWeight: 400,
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();
    const [gameSearch, setGameSearch] = useState('');
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        about: '',
        photoUrl: '',
        gender: '',
        genderPref: '',
        games: [],
    });
    const [errorMsg, setErrorMsg] = useState('');

    // Handle register form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Password length validation;
        if (userInfo.password.length < 8) {
            setErrorMsg('Password needs to be a minimum of 8 characters');
            return;
        }

        // Uppercase validation
        let upperCase = new RegExp(/^(?=.*[A-Z])/);
        if (!upperCase.test(userInfo.password)) {
            setErrorMsg('Password needs an UPPERCASE letter');
            return;
        }

        //Lowercase validation
        let lowerCase = new RegExp(/^(?=.*[a-z])/);
        if (!lowerCase.test(userInfo.password)) {
            setErrorMsg('Password needs an lowercase letter');
            return;
        }
        //Number validation
        let digits = new RegExp(/^(?=.*[0-9])/);
        if (!digits.test(userInfo.password)) {
            setErrorMsg('Password needs to include a number');
            return;
        }
        //Special character validaton
        let special = new RegExp(/^(?=.*?[#?!@$%^&*-])/);
        if (!special.test(userInfo.password)) {
            setErrorMsg('Password needs to include a special character');
            return;
        }

        //Password match validation
        if (userInfo.password !== userInfo.confirmPassword) {
            setErrorMsg('Password & Confirm Password does not match');
            return;
        }

        //Array length
        if (userInfo.games.length <= 0) {
            setErrorMsg('Please select at least 1 game!');
            return;
        }

        try {
            // cognito register api
            const userSub = await register({
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
            });

            await registerUser({
                userId: userSub,
                name: userInfo.name,
                about: userInfo.about,
                gender: userInfo.gender,
                genderPref: userInfo.genderPref,
                photoUrl: userInfo.photoUrl,
                games: userInfo.games,
            });

            if (userSub) {
                console.log('Successfully Register');
                history.push('/');
            }
        } catch (error) {
            setErrorMsg(error.message);
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.heading} variant="h3">
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <p className={classes.errorMsg}>{errorMsg}</p>
                <Form userInfo={userInfo} setUserInfo={setUserInfo} />
                <Typography className={classes.heading} variant="h4">
                    Preferences
                </Typography>
                <Preferences
                    gameSearch={gameSearch}
                    setGameSearch={setGameSearch}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    id="Register"
                    className={classes.button}
                >
                    Register
                </Button>
            </form>
        </div>
    );
}
