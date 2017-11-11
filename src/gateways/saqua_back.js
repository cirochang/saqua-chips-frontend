import axios from 'axios';

export const SAQUA_BACK = axios.create({
  baseURL: `${process.env.SAQUA_BACK_URI}/api/v1/`,
  headers: {
    Authorization: localStorage.getItem("token")
  }
})
