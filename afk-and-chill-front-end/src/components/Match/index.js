import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ReactComponent as LoadingHeart } from '../../assests/loading-heart.svg';
import { getMatchableChillers, dislike, like } from '../../network';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
    tinderCardsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15vh',
        [theme.breakpoints.down('md')]: {
            marginTop: '10vh',
        },
    },
    heartSVG: {
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
        [theme.breakpoints.down('md')]: {
            display: 'block',
            width: '80%',
            height: '80vh',
        },
    },
    photo: {
        width: '40%',
        borderRadius: '10px 0 0 10px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            borderRadius: '10px 10px 0 0',
        },
    },
}));

export default function Match() {
    const [chillers, setChillers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const swiped = async (direction, chiller) => {
        try {
            if (direction === 'left') {
                // Dislike the chiller
                const successMsg = await dislike(chiller.cognito_id);
                console.log(successMsg);
            } else if (direction === 'right') {
                // Like the chiller
                const successMsg = await like(chiller.cognito_id);
                console.log(successMsg);
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
                <LoadingHeart className={classes.heartSVG} />
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
        </div>
    );
}
