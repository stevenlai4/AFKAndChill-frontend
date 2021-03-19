import React, { useState, useEffect } from 'react';
import Profile from '../../components/Profile';
import { getUser } from '../../network';

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const response = await getUser();
                setUserInfo(response.user);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    return <Profile userInfo={userInfo} setUserInfo={setUserInfo} />;
}
