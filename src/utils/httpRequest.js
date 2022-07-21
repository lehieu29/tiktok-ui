import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : 'https://tiktok.fullstack.edu.vn/api/';

const httpRequest = axios.create({
    baseURL: baseURL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
