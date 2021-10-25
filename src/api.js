import axios from 'axios';

export default axios.create({
  baseURL: `https://api.xrarity.io/`
  //baseURL: ``,
  // baseURL: `https://xrarity-staging.herokuapp.com`,
});

