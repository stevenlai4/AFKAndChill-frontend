import React, { useState, useEffect } from 'react';
import { InputBase, Grid, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getTopGames, getNextPage } from '../../api/twitchAPI';
import GameItem from '../GameItem';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.secondary, 0.05),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: 40,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    loadGameBtn: {
        display: 'block',
        margin: '30px auto',
    },
}));

export default function Game({
    userInfo,
    setUserInfo,
    gameSearch,
    setGameSearch,
}) {
    const [twitchGames, setTwitchGames] = useState([]);
    const [twitchCursor, setTwitchCursor] = useState('');
    const classes = useStyles();

    // CDM
    useEffect(() => {
        (async () => {
            try {
                const nextPage = await getTopGames();
                setTwitchCursor(nextPage.pagination?.cursor);
                setTwitchGames(nextPage.data);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    // Load more games function
    const loadMoreGames = async (e) => {
        e.preventDefault();

        try {
            const nextPage = await getNextPage(twitchCursor);
            setTwitchCursor(nextPage.pagination?.cursor);
            setTwitchGames((prev) => prev.concat(nextPage.data));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search Game…"
                    value={gameSearch}
                    onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                        }
                    }}
                    onChange={(e) => setGameSearch(e.target.value)}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.searchInput,
                    }}
                    inputProps={{
                        'aria-label': 'search',
                    }}
                />
            </div>
            <div className={classes.gamesContainer}>
                <Grid className={classes.gameGrid} container spacing={3}>
                    {twitchGames.map((game) => {
                        const imgUrl = game.box_art_url
                            .replace('{width}', '300')
                            .replace('{height}', '400');

                        return (
                            <Grid
                                key={game.id}
                                item
                                lg={2}
                                md={3}
                                sm={4}
                                xs={6}
                            >
                                <GameItem
                                    userInfo={userInfo}
                                    setUserInfo={setUserInfo}
                                    game={game}
                                    imgUrl={imgUrl}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
                <Link
                    className={classes.loadGameBtn}
                    component="button"
                    onClick={loadMoreGames}
                >
                    Load more games...
                </Link>
            </div>
        </div>
    );
}
