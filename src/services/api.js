import axios from 'axios';

const api = axios.create({ baseURL: 'https://campeonato-rocket-league.herokuapp.com/players' });

export default api;