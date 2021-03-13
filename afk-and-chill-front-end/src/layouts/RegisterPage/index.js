import React, { useState } from 'react';
import Form from '../../components/Register/Form';
import Preferences from '../../components/Register/Preferences';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 5% ',
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
    const [userInfo, setUserInfo] = useState({});
    const [gameSearch, setGameSearch] = useState('');
    const [genderPref, setGenderPref] = useState('');
    const [gender, setGender] = useState('');
    const [games, setGames] = useState([]);

    // Handle register form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // cognito register api
            await Auth.signUp({
                username: userInfo.email,
                password: userInfo.password,
                attributes: {
                    email: userInfo.email,
                    name: userInfo.username,
                },
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
                    genderPref={genderPref}
                    setGenderPref={setGenderPref}
                    gender={gender}
                    setGender={setGender}
                    games={games}
                    setGames={setGames}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    id="Register"
                    className={classes.button}
                ></Button>
            </form>
        </div>
    );
}
