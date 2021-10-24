import axios from 'axios';

export default axios.create({
  // baseURL: `https://api.soltracker.io/`
  baseURL: `http://127.0.0.1:8000/`,
  // baseURL: `https://soltracker-api-test.herokuapp.com/`,
});

