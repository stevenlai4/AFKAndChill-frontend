import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginCard: {
        width: '60%',
        paddingTop: 60,
        paddingBottom: 60,
        // margin: '50px auto 0 auto',
    },
    LoginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        marginBottom: 20,
    },
}));

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const onSubmit = () => {};

    return (
        <div className={classes.root}>
            <Card className={classes.loginCard}>
                <Typography className={classes.cardText} variant="h4">
                    Welcom to AFK & Chill
                </Typography>
                <form onSubmit={onSubmit} className={classes.LoginForm}>
                    <TextField
                        required
                        type="text"
                        className={classes.input}
                        variant="outlined"
                        helperText={onSubmit.error}
                        id="email"
                        placeholder="email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        className={classes.input}
                        variant="outlined"
                        helperText={''}
                        id="password"
                        placeholder="password*"
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
