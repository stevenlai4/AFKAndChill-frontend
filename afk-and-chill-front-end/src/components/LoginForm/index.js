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
    loginBtn: {
        backgroundColor: '#1A2E46',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0a1829',
        },
    },
    helperText: {
        color: 'red',
    },
}));

export default function Form({ setIsAuthenticated }) {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(email.trim(), password);
            setIsAuthenticated(true);

            // Push to find chillers page if login successfully
            history.push('/findChillers');
        } catch (error) {
            setErrorMsg(error.message);
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
                        id="email"
                        placeholder="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        className={classes.input}
                        variant="outlined"
                        FormHelperTextProps={{ className: classes.helperText }}
                        helperText={errorMsg}
                        id="password"
                        placeholder="Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={`${classes.input} ${classes.loginBtn}`}
                        variant="contained"
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
