import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

//fake data
const db = [
    {
        name: "Monica Hall",
        url: "https://i.imgur.com/DcybzAX.png",
    },
    {
        name: "Erlich Bachman",
        url: "https://i.imgur.com/wEMTKJL.jpg",
    },
    {
        name: "Steven",
        url: "https://i.imgur.com/PjvFnSY.png",
    },
    {
        name: "Karen The Boss)",
        url: "https://i.imgur.com/5Ok6BaP.png",
    },
    {
        name: "Caitlin Chu",
        url: "https://i.imgur.com/PUBX51W.png",
    },
];

// Card layout
const useStyles = makeStyles({
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

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
        console.log("removing: " + nameToDelete);
        setLastDirection(direction);
        alreadyRemoved.push(nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
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
        <div style={{ display: "flex" }}>
            {/* ======== CARD SECTION ==== LEFT SIDE */}
            <div className="cardAndButtons" style={{ width: "50%" }}>
                <div className="cardContainer" style={{ postion: "relative" }}>
                    {characters.map((character, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className="swipe"
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                        >
                            <div
                                style={{
                                    backgroundImage:
                                        "url(" + character.url + ")",
                                }}
                                className="card"
                            >
                                <h3 className="card_name">{character.name}</h3>
                            </div>
                        </TinderCard>
                    ))}
                </div>
                <div className="swipeButtons">
                    <IconButton>
                        <CancelIcon
                            className="swipeButtons__cancel"
                            fontSize="large"
                            onClick={() => swipe("left")}
                        />
                    </IconButton>
                    <IconButton>
                        <FavoriteIcon
                            className="swipeButtons_favorite"
                            fontSize="large"
                            onClick={() => swipe("right")}
                        />
                    </IconButton>
                </div>
            </div>
            {/* ====INFORMATION BIO=== **RIGHT SIDE */}
            {/* <div style={{ display: "block" }}> */}
            <div style={{ width: "50%" }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Chiller name:
                        </Typography>
                        <Typography variant="h5" component="h2"></Typography>

                        <Typography color="textSecondary" gutterBottom>
                            Description:
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Games I like:
                        </Typography>

                        {/* CHILLER GAMES */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Match;
