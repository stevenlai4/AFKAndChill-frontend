import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function EditForm({
    userInfo,
    setUserInfo,
    modalShow,
    setModalShow,
    setSuccessMsg,
    setOpen,
}) {
    const classes = useStyles();
    const [gameSearch, setGameSearch] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [newUserInfo, setNewUserInfo] = useState({});

    useEffect(() => {
        setNewUserInfo(userInfo);
    }, []);

    // Modal handling
    const handleClose = () => setModalShow(false);

    const handleEdit = async (event) => {
        event.preventDefault();

        if (newUserInfo.name === null || newUserInfo.name === '') {
            setUserNameError('Username can not be blank');
            return;
        } else {
            // cognito updateCognitoUser api
            try {
                const userSub = await updateCognitoUser({
                    name: newUserInfo.name,
                });
                const successMsg = await updateUser({
                    userName: userSub,
                    gender: newUserInfo.gender,
                    genderPref: newUserInfo.gender_pref,
                    about: newUserInfo.about,
                    games: newUserInfo.games,
                });

                if (successMsg) {
                    setUserInfo(newUserInfo);
                    setSuccessMsg(successMsg);
                    setOpen(true);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    };
    return (
        <div>
            <Modal
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName={classes.modalSection}
            >
                <Modal.Header
                    closeButton
                    style={{
                        backgroundColor: '#2E3B55',
                    }}
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
                            value={newUserInfo.name}
                            autoComplete="on"
                            onChange={(e) =>
                                setUserInfo({
                                    ...newUserInfo,
                                    name: e.target.value,
                                })
                            }
                        />
                        <p>What gender do you want to chill with?</p>
                        <FormControl className={classes.formControl}>
                            <Select
                                defaultValue="other"
                                variant="outlined"
                                value={newUserInfo.gender_pref}
                                required={true}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...newUserInfo,
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
                            value={newUserInfo.about}
                            onChange={(e) =>
                                setUserInfo({
                                    ...newUserInfo,
                                    about: e.target.value,
                                })
                            }
                        />
                        <p>Games to chill with:</p>
                        <Games
                            userInfo={newUserInfo}
                            setUserInfo={setNewUserInfo}
                            gameSearch={gameSearch}
                            setGameSearch={setGameSearch}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outlined"
                            style={{
                                background: 'green',
                            }}
                            onClick={handleEdit}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                background: 'red',
                            }}
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
