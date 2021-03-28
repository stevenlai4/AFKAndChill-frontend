import React, { useState, useEffect, createContext } from 'react';
import { getUser } from '../network';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        id: '',
        cognito_id: '',
        name: '',
        photo_url: '',
        about: '',
        gender: '',
        gender_pref: '',
        games: [],
        likes: [],
        dislikes: [],
    });

    useEffect(() => {
        (async () => {
            try {
                if (props.isAuthenticated) {
                    const response = await getUser();

                    if (response) {
                        setUser(response.user);
                    }
                } else {
                    setUser({});
                }
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [props.isAuthenticated]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};
