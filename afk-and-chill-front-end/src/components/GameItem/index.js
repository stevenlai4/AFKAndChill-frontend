import React, { useEffect, useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    imgContainer: {
        position: 'relative',
    },
    checkCircle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 100,
        height: 100,
        color: '#34b233',
    },
}));

export default function GameItem({ userInfo, setUserInfo, game, imgUrl }) {
    const [isSelected, setIsSelected] = useState(false);
    const classes = useStyles();

    // CDM
    useEffect(() => {
        const userGames = userInfo.games;
        userGames.forEach((userGame) => {
            if (userGame.id === game.id) {
                setIsSelected(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectGame = () => {
        // If isSelected is true then when the user clicks it
        // the game should be removed from the games array
        // Else the game should be added to the games array
        const userGames = userInfo.games;

        if (isSelected) {
            const gameIndex = userGames.indexOf(game);

            // Check if the game exists in the array
            if (gameIndex > -1) {
                userGames.splice(gameIndex, 1);
            }
        } else {
            userGames.push(game);
        }

        setUserInfo({ ...userInfo, games: userGames });
        setIsSelected((prev) => !prev);
    };

    return (
        <Card onClick={selectGame}>
            <CardActionArea className={classes.imgContainer}>
                {isSelected ? (
                    <CheckCircle className={classes.checkCircle} />
                ) : null}
                <CardMedia
                    component="img"
                    alt={game.name}
                    image={imgUrl}
                    title={game.name}
                />
            </CardActionArea>
            <CardContent>
                <Typography component="p">{game.name}</Typography>
            </CardContent>
        </Card>
    );
}
