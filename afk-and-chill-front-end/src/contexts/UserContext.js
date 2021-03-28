import React, { useState, useEffect, createContext } from 'react';
import { getUser } from '../network';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            try {
                if (props.isAuthenticated) {
                    const response = await getUser();

                    if (response) {
                        setUser(response.user);
                    }
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
