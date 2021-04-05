import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ReactComponent as LoadingBeanEater } from '../../assests/loading-bean-eater.svg';
import { getMatchableChillers, dislike, like } from '../../network';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
    tinderCardsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15vh',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10vh',
        },
    },
    loadingSVG: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    noMatchText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '40px',
    },
    swipe: {
        position: 'absolute',
    },
    tinderCard: {
        backgroundColor: '#fff',
        width: '800px',
        maxWidth: '100vw',
        height: '50vh',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: '1px 0 1px 1px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '80%',
            height: '80vh',
        },
    },
    photo: {
        width: '40%',
        borderRadius: '10px 0 0 10px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            borderRadius: '10px 10px 0 0',
        },
    },
}));

export default function Match() {
    const [chillers, setChillers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    let chillersState = chillers;

    // CDM
    useEffect(() => {
        // Fetch matchable chillers
        (async () => {
            try {
                const tempChillers = await getMatchableChillers();

                if (tempChillers) {
                    setChillers(tempChillers);
                    setIsLoading(false);
                }
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    // Handle snackbar close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const swiped = async (direction, chiller) => {
        let response = '';

        try {
            if (direction === 'left') {
                // Dislike the chiller
                response = await dislike(chiller.cognito_id);
            } else if (direction === 'right') {
                // Like the chiller
                response = await like(chiller.cognito_id);
            }

            if (response) {
                setSuccessMsg(response);
                setOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const outOfFrame = (chiller) => {
        chillersState = chillersState.filter(
            (c) => c.cognito_id !== chiller.cognito_id
        );
        setChillers(chillersState);
    };

    return (
        <div className={classes.root}>
            {isLoading ? (
                <LoadingBeanEater className={classes.loadingSVG} />
            ) : chillers.length > 0 ? (
                <div className={classes.tinderCardsContainer}>
                    {chillers.map((chiller) => (
                        <TinderCard
                            className={`${classes.swipe} ${classes.tinderCard}`}
                            key={chiller.cognito_id}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, chiller)}
                            onCardLeftScreen={() => outOfFrame(chiller)}
                        >
                            <img
                                className={classes.photo}
                                alt={chiller.name}
                                src={chiller.photo_url}
                            />
                            <UserInfo chiller={chiller} />
                        </TinderCard>
                    ))}
                </div>
            ) : (
                <Typography component="p" className={classes.noMatchText}>
                    No More Matchable Chillers
                </Typography>
            )}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    {successMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
