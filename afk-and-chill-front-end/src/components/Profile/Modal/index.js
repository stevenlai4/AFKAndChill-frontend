import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import {
    Select,
    MenuItem,
    TextField,
    FormControl,
    Button,
} from '@material-ui/core';
import Games from '../../Games';
import { updateUser } from '../../../network';
import { updateCognitoUser } from '../../../userAuth';

const useStyles = makeStyles((theme) => ({
    modalSection: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
        minWidth: '50%',
    },
    modalTitle: {
        color: 'white',
    },

    formControl: {
        marginTop: '2%',
        marginBottom: '2%',
    },
}));

export default function EditForm({ userInfo, setUserInfo, show, setShow }) {
    const [gameSearch, setGameSearch] = useState('');
    const classes = useStyles();

    const [userNameError, setUserNameError] = useState('');

    const handleClose = () => setShow(false);

    // remove duplicate games
    // const editGames = [
    //     ...new Map(userInfo?.games?.map((g) => [g.id, g])).values(),
    // ];

    const handleEdit = async (event) => {
        event.preventDefault();

        if (userInfo.name === null || userInfo.name === '') {
            setUserNameError('Username can not be blank');
            return;
        } else {
            // cognito updateCognitoUser api
            try {
                const userSub = await updateCognitoUser({
                    name: userInfo.name,
                });
                updateUser({
                    userName: userSub,
                    gender: userInfo.gender,
                    genderPref: userInfo.gender_pref,
                    about: userInfo.about,
                    games: userInfo.games,
                });
            } catch (error) {
                console.error(error.message);
            }
        }
    };
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName={classes.modalSection}
            >
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: '#2E3B55' }}
                >
                    <Modal.Title className={classes.modalTitle}>
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleEdit}>
                    <Modal.Body>
                        <p>Chiller Name:</p>
                        <TextField
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            FormHelperTextProps={{
                                className: classes.helperText,
                            }}
                            helperText={userNameError}
                            id="username"
                            value={userInfo.name}
                            autoComplete="on"
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    name: e.target.value,
                                })
                            }
                        />
                        <p>What gender do you want to chill with?</p>
                        <FormControl className={classes.formControl}>
                            <Select
                                defaultValue="other"
                                variant="outlined"
                                value={userInfo.gender_pref}
                                required={true}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        gender_pref: e.target.value,
                                    })
                                }
                            >
                                <MenuItem
                                    className={classes.dropDown}
                                    value="male"
                                >
                                    Male
                                </MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <p>About you:</p>
                        <TextField
                            multiline
                            rowsMax="4"
                            margin="normal"
                            variant="outlined"
                            value={userInfo.about}
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    about: e.target.value,
                                })
                            }
                        />
                        <p>Games to chill with:</p>
                        <Games
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            gameSearch={gameSearch}
                            setGameSearch={setGameSearch}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outlined"
                            style={{ background: 'green' }}
                            onClick={handleEdit}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ background: 'red' }}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
