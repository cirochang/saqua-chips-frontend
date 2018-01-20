import axios from 'axios';

export var SAQUA_BACK = axios.create({
  baseURL: process.env.SAQUA_BACK_URI,
  headers: {
    'x-access-token': localStorage.getItem("token")
  }
});
