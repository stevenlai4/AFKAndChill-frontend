import axios from 'axios';
import { userToken } from './userAuth';

// Setup user token
const getToken = async () => {
    try {
        const token = await userToken();

        if (token) {
            return token;
        }
    } catch (error) {
        throw error;
    }
};

// Config axios
const api = axios.create({
    baseURL: 'https://4yvcbwlong.execute-api.us-east-2.amazonaws.com/prod',
    headers: {
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
    photoUrl,
    games,
}) {
    try {
        const response = await api.post('/user/register', {
            userId,
            name,
            about,
            gender,
            genderPref,
            photoUrl,
            games,
        });

        return response.data;
    } catch (error) {
        throw error.message;
    }
}

// Save user photo to S3 bucket
export async function savePhotoFile(file) {
    try {
        // Get secure token from lambda
        const signedURLResult = await api.get('/user/uploadphoto');
        const { uploadURL } = signedURLResult.data;

        // Upload to s3
        await axios.put(uploadURL, file);
        const imageUrl = uploadURL.split('?')[0];

        return imageUrl;
    } catch (error) {
        throw error;
    }
}

// get chat box
export async function getChatBoxes() {
    try {
        const token = await getToken();

        const response = await api.get('/chatboxes', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
}

// create msg
export const sendMsg = async (data) => {
    try {
        const token = await getToken();
        const response = await api.post(`/chatbox/message`, data, {
            params: {
                chatboxId: data.chatboxId,
            },

            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
};

//get messages
export async function getMsges({ chatboxId }) {
    try {
        const token = await getToken();
        const response = await api.get(`/chatbox/messages`, {
            params: {
                chatboxId: chatboxId,
            },

            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
    // try {
    //   const result = await axios.get(`/api/posts/${postId}/comments`)
    //   return result.data
    // } catch (error) {
    //   console.log(error)
    // }
}
