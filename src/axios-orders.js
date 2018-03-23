import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-mbw.firebaseio.com/'
});

export default instance;