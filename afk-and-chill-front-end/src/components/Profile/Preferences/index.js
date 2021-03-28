import React from 'react';
import Games from '../../Games';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
}));

export default function Preferences({
    gameSearch,
    setGameSearch,
    userInfo,
    setUserInfo,
}) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.formControlContainer}>
                <FormControl
                    variant="outlined"
                    className={`${classes.formControl} ${classes.genderFormControl}`}
                    disabled
                >
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select id="gender" value={userInfo.gender} label="Gender">
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
                        value={userInfo.genderPref}
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                genderPref: e.target.value,
                            })
                        }
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
            <Games
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                gameSearch={gameSearch}
                setGameSearch={setGameSearch}
            />
        </>
    );
}
