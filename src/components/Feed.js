import React, { useState, useEffect, useContext } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "../styles/Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";
import authAxios from "../helper/AuthAxios";
import AppContext from "../AppContext";
import MainHelper from "../helper/MainHelper";
import { Card, CardContent, CardHeader } from "@material-ui/core";
// import FlashMessage from "react-flash-message";

function Feed() {
  const {
    postList,
    setPostList,
    accessToken,
    setAccessToken,
    error,
    setError,
  } = useContext(AppContext);

  useEffect(() => {
    //   const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "";
    const headers = {
      "Content-Type": "text/plain",
      // "Authorization": "" +token
    };

    //   // authAxios
    //   //   .get("/product")
    //   //   .then((response) => {
    //   //     // console.log("Success ========>", response);
    //   //     const arr = MainHelper(response);
    //   //     setPostList(arr);
    //   //   })
    //   //   .catch((error) => {
    //   //     console.log("Error ========>", error);
    //   //   });

    axios
      .get("http://localhost:5000/product", { headers })
      .then((response) => {
        console.log("Success ========>", response);
        const arr = MainHelper(response);
        setPostList(arr);
        console.log(arr);
      })
      .catch((error) => {
        // console.log("Error ========>", error);
        // console.log(error.response.data);
        setError("couldn't fetch ");
      });
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
        {/* <h4>{accessToken}</h4> */}
        <h4>{error}</h4>
      </div>
      {/* {postList.length!=} */}
      {/* <TweetBox /> */}
      {/* <listItems /> */}
      <h1>Recently Viewed</h1>
      <FlipMove>
        {postList.map(function (post, idx) {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              year={post.year}
              writer={post.writer}
              director={post.director}
              poster={post.poster}
              ratings={post.ratings}
              type_of={post.type_of}
              imdb_id={post.imdb_id}
              comments={post.comments}
            />
          );
        })}
      </FlipMove>
    </div>
  );
}

export default Feed;
