import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Cancel, Favorite } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { getMatchableChillers } from '../../network';

export default function Match() {
    const alreadyRemoved = [];
    const [chillers, setChillers] = useState([]);
    // let charactersState = chillers; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.
    const [lastDirection, setLastDirection] = useState();
    const childRefs = useMemo(
        () =>
            Array(chillers.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );

    // CDM
    useEffect(() => {
        // Fetch matchable chillers
        (async () => {
            try {
                const tempChillers = await getMatchableChillers();

                if (tempChillers) {
                    setChillers(tempChillers);
                }
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    // const swiped = (direction, nameToDelete) => {
    //     console.log('removing: ' + nameToDelete);
    //     setLastDirection(direction);
    //     alreadyRemoved.push(nameToDelete);
    // };
    const outOfFrame = (matchableChiller) => {
        console.log(matchableChiller.name + ' left the screen!');
        const tempChillersArr = chillers.filter(
            (chiller) => chiller.name !== matchableChiller.name
        );
        setChillers(tempChillersArr);
    };
    const swipe = (dir) => {
        // const cardsLeft = chillers.filter(
        //     (chiller) => !alreadyRemoved.includes(chiller.name)
        // );
        if (chillers.length) {
            const toBeRemoved = chillers[chillers.length - 1].cognito_id; // Find the card object to be removed
            const index = chillers
                .map((chiller) => chiller.cognito_id)
                .indexOf(toBeRemoved); // Find the index of which to make the reference to
            // alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    };
    return (
        <div>
            {/* ======== CARD SECTION ==== LEFT SIDE */}
            <div className="tinderCards__cardContainer">
                {chillers.map((chiller, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={chiller.cognito_id}
                        preventSwipe={['up', 'down']}
                        // onSwipe={(dir) => swiped(dir, chiller.name)}
                        onCardLeftScreen={() => outOfFrame(chiller)}
                    >
                        <div className="wholeCard">
                            <div
                                style={{
                                    backgroundImage:
                                        'url(' + chiller.photo_url + ')',
                                }}
                                className="card"
                            ></div>
                            <div className="descriptionCard">
                                <h3>{chiller.name}</h3>
                                <h5>{chiller.about}</h5>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButtons">
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
            </div>
        </div>
    );
}
