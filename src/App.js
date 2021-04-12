import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Feed from "./components/Feed";
import SearchBox from "./components/SearchBox";
import Details from "./components/Details";
import AppBar from "@material-ui/core/AppBar";
import AppContext from "./AppContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
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
      <SearchBox />
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
