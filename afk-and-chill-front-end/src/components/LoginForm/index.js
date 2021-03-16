import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../userAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    loginCard: {
        width: '60%',
        paddingTop: 60,
        paddingBottom: 60,
    },
    LoginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
    cardTitle: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 25,
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
        },
    },
    input: {
        width: '70%',
        marginBottom: 20,
    },
}));

export default function Form({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(email, password);
            setIsAuthenticated(true);
            history.push('/findChillers');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.loginCard}>
                <Typography className={classes.cardTitle}>
                    Welcom to AFK & Chill
                </Typography>
                <form onSubmit={handleSubmit} className={classes.LoginForm}>
                    <TextField
                        required
                        type="text"
                        className={classes.input}
                        variant="outlined"
                        helperText={''}
                        id="email"
                        placeholder="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        className={classes.input}
                        variant="outlined"
                        helperText={''}
                        id="password"
                        placeholder="Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={classes.input}
                        variant="contained"
                        color="primary"
                        type="submit"
                        name="submitBtn"
                    >
                        Login
                    </Button>
                </form>
                <div className={classes.cardText}>
                    Dont have an account?{' '}
                    <Link to="/register">Create an Account</Link>
                </div>
            </Card>
        </div>
    );
}
