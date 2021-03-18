import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './index.css';
//import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as LoadingHeart } from '../../assests/loading-heart.svg';
import { Cancel, Favorite } from '@material-ui/icons';
import { IconButton, Avatar, Typography } from '@material-ui/core';
import { getMatchableChillers, dislike, like } from '../../network';

export default function Match() {
    const [chillers, setChillers] = useState([]);
    let chillersState = chillers;
    const [isLoading, setIsLoading] = useState(true);
    const childRefs = useMemo(
        () =>
            Array(chillers.length)
                .fill(0)
                .map((i) => React.createRef()),
        [chillers.length]
    );

    // CDM
    useEffect(async () => {
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

    // const swipe = (dir) => {
    //     if (chillers.length > 0) {
    //         const toBeRemoved = chillers[chillers.length - 1].cognito_id; // Find the card object to be removed
    //         const index = chillers
    //             .map((chiller) => chiller.cognito_id)
    //             .indexOf(toBeRemoved); // Find the index of which to make the reference to
    //         childRefs[index].current.swipe(dir); // Swipe the card!
    //     }
    // };
    return (
        <div>
            {isLoading ? (
                <LoadingHeart />
            ) : chillers.length > 0 ? (
                <>
                    <div className="tinderCards__cardContainer">
                        {chillers.map((chiller, index) => (
                            <TinderCard
                                className="swipe"
                                key={chiller.cognito_id}
                                ref={childRefs[index]}
                                preventSwipe={['up', 'down']}
                                onSwipe={(dir) => swiped(dir, chiller)}
                                onCardLeftScreen={() => outOfFrame(chiller)}
                            >
                                {/* <div className="wholeCard">
                                    <div
                                        style={{
                                            backgroundImage: `url(
                                                chiller.photo_url 
                                                )`,
                                        }}
                                        className="card"
                                    ></div>
                                    <div className="descriptionCard">
                                        <h3>{chiller.name}</h3>
                                        <h5>{chiller.about}</h5>
                                    </div>
                                </div> */}
                                <div className="wholeCard card">
                                    <Avatar
                                        alt={chiller.name}
                                        src={chiller.photo_url}
                                    />
                                    <div>
                                        <Typography variant="h4">
                                            {chiller.name}
                                        </Typography>
                                    </div>
                                </div>
                            </TinderCard>
                        ))}
                    </div>
                    {/* <div className="swipeButtons">
                        <div className="likeAndDislikeButtons">
                            <IconButton onClick={() => swipe('left')}>
                                <Cancel
                                    className="swipeButtons__cancel"
                                    fontSize="large"
                                />
                            </IconButton>
                        </div>
                        <div className="likeAndDislikeButtons">
                            <IconButton onClick={() => swipe('right')}>
                                <Favorite
                                    className="swipeButtons_favorite"
                                    fontSize="large"
                                />
                            </IconButton>
                        </div>
                    </div> */}
                </>
            ) : (
                <p>No More Matchable Chillers</p>
            )}
        </div>
    );
}
