import axios from 'axios';
import { userToken } from './userAuth';

var idToken = {};

// Setup token header
(async () => {
    const token = await userToken();
    if (token) {
        idToken = { Authorization: `${token}` };
    }
})();

// Config axios
const api = axios.create({
    baseURL: 'https://4yvcbwlong.execute-api.us-east-2.amazonaws.com/prod',
    headers: {
        ...idToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export async function registerUser({
    userId,
    name,
    about,
    gender,
    genderPref,
    photo,
    games,
}) {
    try {
        const response = await api.post('/user/register', {
            userId,
            name,
            about,
            gender,
            genderPref,
            photo,
            games,
        });

        return response.data;
    } catch (error) {
        throw error.message;
    }
}
