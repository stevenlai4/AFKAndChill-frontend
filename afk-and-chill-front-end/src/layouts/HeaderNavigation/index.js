import React from 'react';
import Header from '../../components/Header';
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

    return (
        <Header
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            findChillersClicked={() => history.push('/findChillers')}
            AFKChatClicked={() => history.push('/chatBox')}
            login={() => history.push('/')}
            logoClicked={() => history.push('/findChillers')}
            profileClicked={() => history.push('/profile')}
            signOut={signOut}
        ></Header>
    );
}
