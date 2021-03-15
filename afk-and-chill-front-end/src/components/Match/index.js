import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
//fake data
const db = [
    {
        name: 'Monica Hall',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
        url: 'https://i.imgur.com/DcybzAX.png',
    },
    {
        name: 'Erlich Bachman',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
        url: 'https://i.imgur.com/wEMTKJL.jpg',
    },
    {
        name: 'CTO Steven',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utLorem ipsum dolor sit amet, consectetur adipisciLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ng elit, sed do eiusmod temporua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  aliquip ex ea',
        url: 'https://i.imgur.com/PjvFnSY.png',
    },
    {
        name: 'Karen The Boss',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
        url: 'https://i.imgur.com/5Ok6BaP.png',
    },
    {
        name: 'Peter pan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
        url:
            'https://images.wallpapersden.com/image/download/peter-pan-1953_bGhpameUmZqaraWkpJRnamtlrWZpaWU.jpg',
    },
];
// Card layout
// const useStyles = makeStyles({
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });
const Match = () => {
    const alreadyRemoved = [];
    const [characters, setCharacters] = useState(db);
    let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.
    const [lastDirection, setLastDirection] = useState();
    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
        alreadyRemoved.push(nameToDelete);
    };
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
        charactersState = charactersState.filter(
            (character) => character.name !== name
        );
        setCharacters(charactersState);
    };
    const swipe = (dir) => {
        const cardsLeft = characters.filter(
            (person) => !alreadyRemoved.includes(person.name)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
            const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    };
    return (
        <div>
            {/* ======== CARD SECTION ==== LEFT SIDE */}
            <div className="tinderCards__cardContainer">
                {characters.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={character.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                    >
                        <div className="wholeCard">
                            <div
                                style={{
                                    backgroundImage:
                                        'url(' + character.url + ')',
                                }}
                                className="card"
                            ></div>
                            <div className="descriptionCard">
                                <h3>{character.name}</h3>
                                <h5>{character.description}</h5>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButtons">
                <div className="likeAndDislikeButtons">
                    <IconButton>
                        <CancelIcon
                            className="swipeButtons__cancel"
                            fontSize="large"
                            onClick={() => swipe('left')}
                        />
                    </IconButton>
                </div>
                <div className="likeAndDislikeButtons">
                    <IconButton>
                        <FavoriteIcon
                            className="swipeButtons_favorite"
                            fontSize="large"
                            onClick={() => swipe('right')}
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
export default Match;
