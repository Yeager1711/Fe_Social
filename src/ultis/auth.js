// src/utils/auth.js
import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_LOCAL_API_URL; 

export const getToken = () => {
    return Cookies.get('access_token');
};

export const apiRequestWithAuth = async (method, endpoint, data = null) => {
    const token = getToken();

    const config = {
        method,
        url: `${apiUrl}${endpoint}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error; 
    }
};
