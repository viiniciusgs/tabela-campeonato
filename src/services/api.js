import axios from 'axios';

const api = axios.create({ baseURL: 'https://campeonato-rocket-league.herokuapp.com' });

export default api;