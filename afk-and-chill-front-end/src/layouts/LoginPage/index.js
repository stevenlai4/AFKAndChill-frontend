import React from 'react';
import LoginForm from '../../components/LoginForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
    },
    imgContainer: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 550,
        display: 'block',
    },
}));

export default function LoginPage({ setIsAuthenticated }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    position: 'absolute',
                    top: -20,
                }}
            >
                <path
                    fill="#000b76"
                    fillOpacity="1"
                    d="M0,32L60,48C120,64,240,96,360,90.7C480,85,600,43,720,48C840,53,960,107,1080,133.3C1200,160,1320,160,1380,160L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                ></path>
            </svg>
            <div className={classes.imgContainer}>
                <img
                    src="https://i.imgur.com/1ow85f8.png"
                    title="Play game image"
                    className={classes.image}
                />
            </div>
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    position: 'absolute',
                    bottom: -80,
                }}
            >
                <path
                    fill="#000b76"
                    fillOpacity="1"
                    d="M0,288L48,272C96,256,192,224,288,186.7C384,149,480,107,576,112C672,117,768,171,864,192C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
}
