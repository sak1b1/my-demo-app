import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import TweetBox from "./components/TweetBox";
import Widget from "./components/Widget";
import Login from "./components/Login";
import Details from "./components/Details";
// import AppBar from "./components/AppBar";
import AppBar from "@material-ui/core/AppBar";
import AppContext from "./AppContext";
import Demo from "./components/Demo";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./styles/AppBar.css";

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
  localStorage.setItem("user", "sakib");

  return (
    <>
      <AppContext.Provider value={AppContextValue}>
        <div className="App">
          {/* <AppBar /> */}
          <div className="appBar__root">
            <AppBar position="static" className="appBar__appBar">
              <Toolbar>
                <p>My App</p>
              </Toolbar>
            </AppBar>
          </div>
          <Router>
            <div>
              <Link to="/">Home</Link>{" "}
              <Link to="/recently_viewed">Recently Viewed</Link>{" "}
              {/* <Link to="/details">Details</Link> */}
              <Switch>
                <Route path="/details">
                  <DetailsPage />
                </Route>
                <Route path="/recently_viewed">
                  <RecentlyUsedPage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </AppContext.Provider>
    </>
  );
}
function DetailsPage() {
  return (
    <div>
      <Details />
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <TweetBox />
    </div>
  );
}

function RecentlyUsedPage() {
  return (
    <div>
      <Feed />
    </div>
  );
}

export default App;
