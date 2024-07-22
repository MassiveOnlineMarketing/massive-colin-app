'use server'

import axios from "axios";

export const generateKeys = async () => {
  try {
    const url = 'https://172.233.40.227:8080/generate_key';
    const params = {
      name: 'QHCHW88JD6HCDHR4',
      seed: '13090022',
    };
    // Prepare headers
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'axios/1.7.2',
      'Accept-Encoding': 'gzip, compress, deflate, br'
    };
  
    // Log headers for debugging
    console.log('Request headers:', headers);
  
    // Make the request
    const res = await axios.get(url, { params, headers });
    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
};