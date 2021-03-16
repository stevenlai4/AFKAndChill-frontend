import React, { useState } from 'react';
import { TextField, IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PhotoCamera, Close } from '@material-ui/icons';
import { savePhotoFile } from '../../../network';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    input: {
        width: '80%',
        marginBottom: 20,
    },
    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    photoUploadContainer: {
        width: '50%',
        position: 'relative',
        '& > *': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
    },
    photoUploadInput: {
        display: 'none',
    },
    imagePreview: {
        margin: 0,
    },
    photoDeleteBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    lgAvatar: {
        width: theme.spacing(45),
        height: theme.spacing(45),
    },
}));
export default function Form({ userInfo, setUserInfo }) {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [filePreview, setFilePreview] = useState();

    const deletePhoto = () => {
        setFile(null);
        setFilePreview(null);
    };

    const fileSelected = async (evt) => {
        const photo = evt.target.files[0];
        setFile(photo);

        try {
            const url = await savePhotoFile(photo);

            if (url) {
                setUserInfo({ ...userInfo, photoUrl: url });
            }
        } catch (error) {
            console.error(error.message);
        }

        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(photo);
    };

    return (
        <div className={classes.root}>
            <div className={classes.registerForm}>
                <TextField
                    required={true}
                    type="text"
                    label="Name"
                    variant="outlined"
                    className={classes.input}
                    id="name"
                    value={userInfo.name}
                    autoComplete="on"
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            name: e.target.value,
                        })
                    }
                />
                <TextField
                    required={true}
                    label="Email"
                    variant="outlined"
                    type="email"
                    id="email"
                    className={classes.input}
                    value={userInfo.email}
                    autoComplete="on"
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            email: e.target.value,
                        })
                    }
                />
                <TextField
                    required={true}
                    helperText={''}
                    label="Password"
                    variant="outlined"
                    className={classes.input}
                    type="password"
                    id="password"
                    value={userInfo.password}
                    autoComplete="on"
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            password: e.target.value,
                        })
                    }
                />
                <TextField
                    required={true}
                    helperText={''}
                    label="Confirm Password"
                    variant="outlined"
                    className={classes.input}
                    type="password"
                    id="confirmPassword"
                    value={userInfo.confirmPassword}
                    autoComplete="on"
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            confirmPassword: e.target.value,
                        })
                    }
                />
                <TextField
                    className={classes.input}
                    helperText={''}
                    multiline={true}
                    id="about"
                    variant="outlined"
                    value={userInfo.about}
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            about: e.target.value,
                        })
                    }
                    type="text"
                    label="About me..."
                    rows={5}
                />
            </div>
            <div className={classes.photoUploadContainer}>
                {file ? (
                    <div className={classes.imagePreview}>
                        <IconButton
                            className={classes.photoDeleteBtn}
                            aria-label="close"
                            onClick={deletePhoto}
                        >
                            <Close />
                        </IconButton>
                        <Avatar
                            className={classes.lgAvatar}
                            alt="selfie"
                            src={filePreview}
                        />
                    </div>
                ) : (
                    <>
                        <input
                            accept="image/*"
                            id="photo-upload-btn"
                            className={classes.photoUploadInput}
                            filename={userInfo.photo}
                            onChange={fileSelected}
                            type="file"
                        />
                        <label
                            htmlFor="photo-upload-btn"
                            className={classes.photoUploadBtn}
                        >
                            <IconButton
                                aria-label="upload photo"
                                component="span"
                            >
                                <PhotoCamera fontSize="large" />
                            </IconButton>
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}
