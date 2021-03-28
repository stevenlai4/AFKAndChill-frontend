import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PhotoCamera, Close } from '@material-ui/icons';
import { savePhotoFile } from '../../../network';
import { getUserInfo } from '../../../userAuth';

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
export default function Form({ user, setUser }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [file, setFile] = useState();
    const [filePreview, setFilePreview] = useState();

    // CDM
    useEffect(() => {
        (async () => {
            try {
                // Fetch current authenticated user from cognito
                const cognitouser = await getUserInfo();

                if (cognitouser) {
                    setEmail(cognitouser.attributes.email);
                }
            } catch (error) {
                console.error(error.message);
            }
        })();
    });

    const deletePhoto = () => {
        setUser({ ...user, photo_url: '' });
        setFile(null);
        setFilePreview(null);
    };

    const fileSelected = async (evt) => {
        const photo = evt.target.files[0];
        setFile(photo);

        try {
            const url = await savePhotoFile(photo);

            if (url) {
                setUser({ ...user, photo_url: url });
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
                    value={user.name}
                    autoComplete="on"
                    onChange={(e) =>
                        setUser({
                            ...user,
                            name: e.target.value,
                        })
                    }
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    id="email"
                    className={classes.input}
                    value={email}
                    disabled
                />
                <TextField
                    className={classes.input}
                    helperText={''}
                    multiline={true}
                    id="about"
                    variant="outlined"
                    value={user.about}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            about: e.target.value,
                        })
                    }
                    type="text"
                    label="About me..."
                    rows={5}
                />
            </div>
            <div className={classes.photoUploadContainer}>
                {file || user.photo_url ? (
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
                            src={filePreview ?? user.photo_url}
                        />
                    </div>
                ) : (
                    <>
                        <input
                            accept="image/*"
                            id="photo-upload-btn"
                            className={classes.photoUploadInput}
                            filename={user.photo_url}
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
