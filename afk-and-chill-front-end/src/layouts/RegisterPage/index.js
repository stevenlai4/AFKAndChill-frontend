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
    const [errorMsgs, setErrorMsgs] = useState([]);

    // Handle errors function
    const handleErrors = () => {
        let tempArr = [];

        //Password length validation;
        if (userInfo.password.length < 8) {
            tempArr.push('Password needs to be a minimum of 8 characters');
        }

        // Uppercase validation
        let upperCase = new RegExp(/^(?=.*[A-Z])/);
        if (!upperCase.test(userInfo.password)) {
            tempArr.push('Password needs an UPPERCASE letter');
        }

        //Lowercase validation
        let lowerCase = new RegExp(/^(?=.*[a-z])/);
        if (!lowerCase.test(userInfo.password)) {
            tempArr.push('Password needs an lowercase letter');
        }
        //Number validation
        let digits = new RegExp(/^(?=.*[0-9])/);
        if (!digits.test(userInfo.password)) {
            tempArr.push('Password needs to include a number');
        }
        //Special character validaton
        let special = new RegExp(/^(?=.*?[#?!@$%^&*-])/);
        if (!special.test(userInfo.password)) {
            tempArr.push('Password needs to include a special character');
        }

        //Password match validation
        if (userInfo.password !== userInfo.confirmPassword) {
            tempArr.push('Password & Confirm Password does not match');
        }

        //Game minimum selection validation
        if (userInfo.games.length <= 0) {
            tempArr.push('Please select at least 1 game!');
        }

        return tempArr;
    };

    // Handle register form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check user input errors before access the database
        const errors = handleErrors();

        if (errors.length > 0) {
            setErrorMsgs(errors);
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
            setErrorMsgs([error.message]);
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.heading} variant="h3">
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                {errorMsgs.map((errorMsg) => (
                    <p className={classes.errorMsg}>{errorMsg}</p>
                ))}
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
