import React, { useState } from 'react';
import Form from '../../components/Register/Form';
import Preferences from '../../components/Register/Preferences';
import { Button, Typography, CircularProgress } from '@material-ui/core';
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
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
    },
    errorMsg: {
        color: 'red',
        fontWeight: 400,
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        about: '',
        photoUrl:
            'https://afk-and-chill-bucket.s3.us-east-2.amazonaws.com/Portrait_Placeholder.png',
        gender: '',
        genderPref: '',
        games: [],
    });
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [isRegistering, setIsRegistering] = useState(false);

    // Handle errors function
    const handleErrors = () => {
        let tempArr = [];

        //Password length validation;
        if (user.password.length < 8) {
            tempArr.push('Password needs to be a minimum of 8 characters');
        }

        // Uppercase validation
        let upperCase = new RegExp(/^(?=.*[A-Z])/);
        if (!upperCase.test(user.password)) {
            tempArr.push('Password needs an UPPERCASE letter');
        }

        //Lowercase validation
        let lowerCase = new RegExp(/^(?=.*[a-z])/);
        if (!lowerCase.test(user.password)) {
            tempArr.push('Password needs an lowercase letter');
        }
        //Number validation
        let digits = new RegExp(/^(?=.*[0-9])/);
        if (!digits.test(user.password)) {
            tempArr.push('Password needs to include a number');
        }
        //Special character validaton
        let special = new RegExp(/^(?=.*?[#?!@$%^&*-])/);
        if (!special.test(user.password)) {
            tempArr.push('Password needs to include a special character');
        }

        //Password match validation
        if (user.password !== user.confirmPassword) {
            tempArr.push('Password & Confirm Password does not match');
        }

        //Game minimum selection validation
        if (user.games.length <= 0) {
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

            // Scroll to top if there are error(s)
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            return;
        } else {
            setErrorMsgs([]);
        }

        setIsRegistering(true);

        try {
            // cognito register api
            const userSub = await register({
                name: user.name,
                email: user.email,
                password: user.password,
            });

            await registerUser({
                userId: userSub,
                name: user.name,
                about: user.about,
                gender: user.gender,
                genderPref: user.genderPref,
                photoUrl: user.photoUrl,
                games: user.games,
            });

            if (userSub) {
                console.log('Successfully Register');
                history.push('/confirmEmail');
            } else {
                setIsRegistering(false);
            }
        } catch (error) {
            setErrorMsgs([error.message]);
            setIsRegistering(false);
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
                <Form user={user} setUser={setUser} />
                <Typography className={classes.heading} variant="h4">
                    Preferences
                </Typography>
                <Preferences user={user} setUser={setUser} />
                {isRegistering ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        id="Register"
                        className={classes.button}
                    >
                        Register
                    </Button>
                )}
            </form>
        </div>
    );
}
