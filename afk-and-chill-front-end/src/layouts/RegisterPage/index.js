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

    // Handle register form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
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

            console.log('Successfully Register');
            history.push('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.heading} variant="h3">
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
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
