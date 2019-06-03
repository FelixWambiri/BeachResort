import {createClient } from 'contentful';

export default createClient({
  space: process.env.REACT_APP_PROD_SPACE,
  accessToken: process.env.REACT_APP_PROD_ACCESS_TOKEN
});