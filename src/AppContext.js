import React from "react";

// set the defaults
const AppContext = React.createContext({
    postList: [],
    setPostList: () => {},
    accessToken: "",
    setAccessToken: () => {},
    error: "",
    setError: () => {},
});

export default AppContext;
