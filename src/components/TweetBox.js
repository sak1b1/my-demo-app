import React, { useState, useContext } from "react";
import "../styles/TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
// import db from "./firebase";
import axios from "axios";
import AppContext from "../AppContext";
import MainHelper from "../helper/MainHelper";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [description, setDescription] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const { postList, setPostList, accessToken, setAccessToken, error, setError } = useContext(AppContext);

  const sendTweet = (e) => {
    e.preventDefault();

    console.log(tweetMessage);

    const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "" +token
    };


    axios
      .post(
        "http://localhost:5000/product",
        {
          name: tweetMessage,
          description: description,
          price: "0.0",
          qty: "0",
        },
        { headers }
      )
      .then((response) => {
        // console.log("Success ========>", response);

        axios
          .get("http://localhost:5000/product", { headers })
          .then((response) => {
            // console.log("Success ========>", response);

            const arr = MainHelper(response);
            setPostList(arr);
          });
      })
      .catch((error) => {
        console.log("Error ========>", error);
        setError("Failed to post.");
        const timer = setTimeout(() => {
            setError("");
          }, 5000);
      });

    setTweetMessage("");
    setTweetImage("");
    setDescription("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's the happening?"
            type="text"
          />
        </div>
        {/* <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        /> */}
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="What's the description?"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
