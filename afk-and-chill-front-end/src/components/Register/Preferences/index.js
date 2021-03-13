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
        margin: theme.spacing(1),
    },
    genderFormControl: {
        width: 120,
    },
    genderPrefFormControl: {
        width: 200,
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
                    className={(classes.formControl, classes.genderFormControl)}
                >
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select
                        native
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        name="gender"
                        inputProps={{
                            id: 'gender',
                        }}
                    >
                        <option aria-label="None" value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Select>
                </FormControl>
                <FormControl
                    required
                    className={
                        (classes.formControl, classes.genderPrefFormControl)
                    }
                >
                    <InputLabel htmlFor="gender">Gender Preferences</InputLabel>
                    <Select
                        native
                        value={genderPref}
                        onChange={(e) => setGenderPref(e.target.value)}
                        name="genderPref"
                        inputProps={{
                            id: 'genderPref',
                        }}
                    >
                        <option aria-label="None" value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
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
