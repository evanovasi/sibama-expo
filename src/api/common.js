import axios from 'axios';

export const instance = axios.create({
    baseURL: `https://sibama2022.griyasolusiindonesia.com/api/drainase`,
    headers: {
        'X-Api-Key': '5113411142023',
        'Content-Type': 'application/json',
    },
});
