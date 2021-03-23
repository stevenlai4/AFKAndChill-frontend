import Header from '../../components/Header';
import React, { useState, useEffect } from 'react';
import { getUser } from '../../network';
import { useHistory } from 'react-router-dom';

export default function HeaderNavigation({
    setIsAuthenticated,
    isAuthenticated,
}) {
    const history = useHistory();
    const signOut = () => {
        setIsAuthenticated(false);
        localStorage.clear();
        history.push('/');
    };

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const response = await getUser();
                setUserInfo(response.user);
                // console.log(response.user);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    return (
        <Header
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            findChillersClicked={() => history.push('/findChillers')}
            chillersPostClicked={() => history.push('/chillerPost')}
            AFKChatClicked={() => history.push('/chatBox')}
            login={() => history.push('/')}
            logoClicked={() => history.push('/findChillers')}
            profileClicked={() => history.push('/profile')}
            signOut={signOut}
            userInfo={userInfo}
        ></Header>
    );
}
