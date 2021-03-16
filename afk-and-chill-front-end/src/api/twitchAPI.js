import axios from 'axios';
import config from '../config.json';

// Get Twitch API OAuth token
async function getToken() {
    try {
        const response = await axios.post(
            'https://id.twitch.tv/oauth2/token',
            null,
            {
                params: {
                    client_id: config.twitch.CLIENT_ID,
                    client_secret: config.twitch.CLIENT_SECRET,
                    grant_type: 'client_credentials',
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        throw error;
    }
}

// Get all games
export async function getTopGames() {
    try {
        const token = await getToken();

        const response = await axios.get(
            'https://api.twitch.tv/helix/games/top',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'client-id': config.twitch.CLIENT_ID,
                },
                params: {
                    first: 12,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get next page of games
export async function getNextPage(cursor) {
    try {
        const token = await getToken();

        const response = await axios.get(
            'https://api.twitch.tv/helix/games/top',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'client-id': config.twitch.CLIENT_ID,
                },
                params: {
                    after: cursor,
                    first: 12,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}
