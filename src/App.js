import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import TweetBox from "./components/TweetBox";
import Widget from "./components/Widget";
import Login from "./components/Login";
import AppBar from "./components/AppBar";
import AppContext from "./AppContext";
import Demo from "./components/Demo";
import axios from "axios";

function App() {
  const [postList, setPostList] = useState([]);
  const [accessToken, setAccessToken] = useState([]);
  const [error, setError] = useState("");
  const AppContextValue = {
    postList,
    setPostList,
    accessToken,
    setAccessToken,
    error,
    setError,
  };

  return (
    <>
      <AppContext.Provider value={AppContextValue}>
        <div className="App">
          <AppBar />
          {/* <Login /> */}
          <TweetBox />
          <Feed />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
