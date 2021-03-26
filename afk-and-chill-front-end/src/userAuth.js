import { Auth } from 'aws-amplify';

// Get user idToken (JWT)
export async function userToken() {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (!currentUser) {
            throw Error('User not logged in');
        }

        const session = await Auth.currentSession();
        return session.getIdToken().getJwtToken();
    } catch (error) {
        console.error(error);
    }
}

export async function updateCognitoUser({ name }) {
    try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
            name: name,
        });
    } catch (error) {
        throw error;
    }
}

export async function getUserInfo() {
    try {
        const userInfo = await Auth.currentUserInfo();
        return userInfo;
    } catch (error) {
        console.error(error);
    }
}

export async function register({ email, password, name }) {
    try {
        const { userSub } = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                name: name,
            },
        });

        return userSub;
    } catch (error) {
        throw error;
    }
}

export async function login(email, password) {
    try {
        await Auth.signIn({
            username: email,
            password: password,
        });
    } catch (error) {
        throw error;
    }
}

export async function refreshAuthToken(setIsAuthenticated) {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        if (cognitoUser && currentSession) {
            cognitoUser.refreshSession(
                currentSession.refreshToken,
                (err, session) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log('session', session);
                    setIsAuthenticated(true);
                }
            );
        }
    } catch (e) {
        setIsAuthenticated(false);
        throw e;
    }
}
