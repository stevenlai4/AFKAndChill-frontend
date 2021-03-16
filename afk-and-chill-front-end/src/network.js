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

// Save user photo to S3 bucket
export async function savePostFile({ file, description }) {
    // Get secure token from lambda
    let signedURLResult = await http({ method: 'get', path: '/securetoken' });
    const { uploadURL, Key } = signedURLResult;
    console.log({ uploadURL, Key });
    // Upload to s3
    await axios.put(uploadURL, file);
    const imageUrl = uploadURL.split('?')[0];
    console.log(imageUrl);
    // Save post details to database through lambda
    return await savePostUrl({ imageUrl, description });
}
