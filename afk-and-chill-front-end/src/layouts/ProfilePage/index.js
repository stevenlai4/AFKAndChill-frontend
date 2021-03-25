import React, { useEffect, useState } from 'react';
import Form from '../../components/Profile/Form';
import Preferences from '../../components/Profile/Preferences';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { updateUser, getUser } from '../../network';
import { updateCognitoUser } from '../../userAuth';

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
    },
    errorMsg: {
        color: 'red',
        fontWeight: 400,
    },
}));

export default function ProfilePage() {
    const classes = useStyles();
    const history = useHistory();
    const [gameSearch, setGameSearch] = useState('');
    const [userInfo, setUserInfo] = useState({
        name: '',
        about: '',
        genderPref: '',
        games: [],
    });
    const [errorMsgs, setErrorMsgs] = useState([]);

    // CDM
    useEffect(() => {
        (async () => {
            const response = await getUser();
            const tempUserInfo = response.user;

            if (response) {
                setUserInfo({
                    name: tempUserInfo.name,
                    about: tempUserInfo.about,
                    genderPref: tempUserInfo.gender_pref,
                    games: tempUserInfo.games,
                });
            }
        })();
    }, []);

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
            const userSub = await updateCognitoUser({
                name: userInfo.name,
            });

            await updateUser({
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
                history.push('/confirmEmail');
            }
        } catch (error) {
            setErrorMsgs([error.message]);
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
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
                    color="primary"
                    type="submit"
                    id="Register"
                    className={classes.button}
                >
                    Update
                </Button>
            </form>
        </div>
    );
}
