import React, { useState, useEffect } from 'react';
import { InputBase, Grid, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getTopGames, getNextPage, searchGame } from '../../api/twitchAPI';
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
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(2),
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    loadGameBtn: {
        display: 'block',
        margin: '30px auto',
    },
}));

export default function Games({ user, setUser }) {
    const [twitchGames, setTwitchGames] = useState([]);
    const [twitchCursor, setTwitchCursor] = useState('');
    const [gameSearch, setGameSearch] = useState('');
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

    // Handle game search
    const handleGameSearch = async (e) => {
        try {
            // If there is something in the search input then fetch
            // the game from twitch API. Otherwise, display all games
            if (gameSearch) {
                const searchedGame = await searchGame(gameSearch);

                if (searchedGame) {
                    setTwitchGames(searchedGame.data);
                    setTwitchCursor('');
                }
            } else {
                const nextPage = await getTopGames();
                setTwitchCursor(nextPage.pagination?.cursor);
                setTwitchGames(nextPage.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

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
                    onKeyUp={handleGameSearch}
                    onChange={(e) => setGameSearch(e.target.value)}
                    className={classes.searchInput}
                    fullWidth={true}
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
                                    user={user}
                                    setUser={setUser}
                                    game={game}
                                    imgUrl={imgUrl}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
                {gameSearch ? null : (
                    <Link
                        className={classes.loadGameBtn}
                        component="button"
                        onClick={loadMoreGames}
                    >
                        Load more games...
                    </Link>
                )}
            </div>
        </div>
    );
}
