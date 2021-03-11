// import React from 'react';
// import Header from '../../components/Header';

// export default function HeaderNavigation({ setisAuthenticated }) {
//     return <Header setisAuthenticated={setisAuthenticated} />;
// }

import Header from '../../components/Header';

import { useHistory } from 'react-router-dom';

export default function HeaderNavigation({
    setisAuthenticated,
    isAuthenticated,
}) {
    const history = useHistory();
    const signOut = () => {
        // Remove the token from local storage
        // setToken('');
        setisAuthenticated(false);
        localStorage.clear();
        history.push('/');
    };

    return (
        <Header
            title="SocialLOL"
            setisAuthenticated={setisAuthenticated}
            isAuthenticated={isAuthenticated}
            findChillersClicked={() => history.push('/findChillers')}
            chillersPostClicked={() => history.push('/chillerPost')}
            AFKChatClicked={() => history.push('/chatBox')}
            login={() => history.push('/')}
            logoClicked={() => history.push('/findChillers')}
            signOut={signOut}
            // // signOut={() => history.push("/signOut")}
        ></Header>
    );
}
