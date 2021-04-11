import React, { useState, useContext } from "react";
import { TextField, Button, Card, CardContent, CardHeader } from "@material-ui/core";
import axios from "axios";
// import normalAxios from "../helper/AuthAxios";
import AppContext from "../AppContext";

import "../styles/Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postList, setPostList, accessToken, setAccessToken, error, setError } = useContext(AppContext);

  const login = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "";
    const headers = {
      // "Content-Type": "text/plain",
      "Content-Type": "multipart/form-data",
      "Authorization": "" +token
    };
    axios
      .post(
        "http://localhost:5000/login",
        formData,
        headers
      )
      .then((response) => {
        // console.log("Success ========>", response);
        localStorage.setItem("accessToken", response.data.token);
        setAccessToken(response.data.token);
        setError("Login Successful.");
        const timer = setTimeout(() => {
            setError("");
          }, 5000);
      })
      .catch((error) => {
        // console.log("Error ========>", error.message);
        setError(error.response.data);
        const timer = setTimeout(() => {
            setError("");
          }, 5000);
      });

    

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {/* <br />
      <br />
      <br /> */}
      {/* <form className="login__form" noValidate autoComplete="off"> */}
     
      <form autoComplete="off">
      <Card className="login__card" variant="outlined" >
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          type="password"
          label="Password"
          variant="outlined"
        />
        <br />
        <Button onClick={login} type="submit" className="login__submitButton">
          Login
        </Button>
        <br />
        </Card>
      </form>
      
    </div>
  );
}
