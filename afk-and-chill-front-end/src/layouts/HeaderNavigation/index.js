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
            // titleClicked={() => history.push("/")}
            // // user={{_id: "1"}}
            // user={user}
            // newPost={() => history.push("/newPost")}
            // profile={() => history.push("/profile")}
            login={() => history.push('/')}
            signOut={signOut}
            // // signOut={() => history.push("/signOut")}
        ></Header>
    );
}
