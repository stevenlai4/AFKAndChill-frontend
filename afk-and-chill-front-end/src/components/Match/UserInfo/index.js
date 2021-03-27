import React from 'react';
import {
    Chip,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userInfo: {
        width: '60%',
        margin: '20px 2% 0 2%',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
            '-ms-overflow-style': 'none' /* IE and Edge */,
            scrollbarWidth: 'none' /* Firefox */,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
            width: '100%',
        },
    },
    name: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10,
        },
    },
    about: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    chipsContainer: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    },
    chip: {
        margin: 5,
        [theme.breakpoints.down('sm')]: {
            margin: 2,
        },
    },
    gameCardsContainer: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export default function UserInfo({ chiller }) {
    const classes = useStyles();

    return (
        <div className={classes.userInfo}>
            <Typography className={classes.name} variant="h4">
                {chiller.name}
            </Typography>
            <Typography className={classes.about} component="p">
                {chiller.about}
            </Typography>
            {/* Chips only show in mobile/tablet sizes */}
            <div className={classes.chipsContainer}>
                {chiller.games.map((game) => (
                    <Chip
                        className={classes.chip}
                        clickable
                        label={game.name}
                        color="primary"
                        key={game.id}
                    />
                ))}
            </div>
            {/* Game cards only show in desktop size */}
            <div className={classes.gameCardsContainer}>
                <Grid container spacing={3}>
                    {chiller.games.map((game) => {
                        const imgUrl = game.box_art_url
                            .replace('{width}', '300')
                            .replace('{height}', '400');

                        return (
                            <Grid key={game.id} item sm={4}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={game.name}
                                            image={imgUrl}
                                            title={game.name}
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography component="p">
                                            {game.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
}
