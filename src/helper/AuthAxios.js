import axios from "axios";
import AppContext from "../AppContext";
import {useContext} from "react";

const apiUrl = "http://localhost:5000/";
const accessToken ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZW1haWwxIiwiZXhwIjoxNjE4MDcxNDI0fQ.eqbA7mZ70X2FkCG7TopudfFdWYRfO0zwr_dmu9hgRBc";
// const { postList, setPostList, accessToken, setAccessToken, error, setError } = useContext(AppContext);


const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: accessToken,
    // Content-Type: 
  }
});

export const normalAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      ContentType: "multipart/form-data"
    }
  });

export default authAxios;
