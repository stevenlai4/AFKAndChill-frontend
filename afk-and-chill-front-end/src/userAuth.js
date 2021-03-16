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
        console.error(error.message);
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
