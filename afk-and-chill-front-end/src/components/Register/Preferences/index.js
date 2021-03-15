import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Select,
    InputBase,
    FormControl,
    InputLabel,
    MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControlContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        marginBottom: 20,
    },
    genderFormControl: {
        maxWidth: 120,
    },
    genderPrefFormControl: {
        maxWidth: 200,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.secondary, 0.05),
        marginRight: theme.spacing(2),
        marginLeft: 0,
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
}));

export default function Preferences({
    gameSearch,
    setGameSearch,
    genderPref,
    setGenderPref,
    gender,
    setGender,
    games,
    setGames,
}) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.formControlContainer}>
                <FormControl
                    required
                    variant="outlined"
                    className={`${classes.formControl} ${classes.genderFormControl}`}
                >
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Gender"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    required
                    variant="outlined"
                    className={`${classes.formControl} ${classes.genderPrefFormControl}`}
                >
                    <InputLabel htmlFor="genderPref">
                        Gender Preference
                    </InputLabel>
                    <Select
                        id="genderPref"
                        value={genderPref}
                        onChange={(e) => setGenderPref(e.target.value)}
                        label="Gender Preference"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
            </div>
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
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </div>
    );
}
