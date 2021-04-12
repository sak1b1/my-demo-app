import React, { useState, useContext } from "react";
import "../styles/SearchBox.css";
import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import Post from "./Post";
import axios from "axios";
import AppContext from "../AppContext";
import MainHelper from "../helper/MainHelper";

function SearchBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState({});
  const [details, setDetails] = useState(false);

  const {
    postList,
    setPostList,
    accessToken,
    setAccessToken,
    error,
    setError,
  } = useContext(AppContext);

  const sendTweet = (e) => {
    e.preventDefault();

    console.log(tweetMessage);
    const headers = {
      "Content-Type": "application/json",
      // "Authorization": "" +token
    };

    axios
      .get(
        "http://www.omdbapi.com/?apikey=4cef16f0&t=" + String(tweetMessage),
        { headers }
      )
      .then((response) => {
        // console.log("Success ========>", response);
        // console.log(response.data.Response);
        if (response.data.Response == "True") {
          const movie = {
            title: response.data.Title,
            year: response.data.Year,
            writer: response.data.Writer,
            director: response.data.Director,
            poster: response.data.Poster,
            ratings: response.data.Ratings,
            type_of: response.data.Type,
            imdbID: response.data.imdbID,
          };
          setResult(movie);
          
        } else {
          setError("No results found.");
          const timer = setTimeout(() => {
            setError("");
          }, 5000);
        }
        // axios
        //   .get("http://localhost:5000/product", { headers })
        //   .then((response) => {
        //     // console.log("Success ========>", response);

        //     const arr = MainHelper(response);
        //     setPostList(arr);
        //   });
      })
      .catch((error) => {
        console.log("Error ========>", error);
        setError("Failed to search.");
        const timer = setTimeout(() => {
          setError("");
        }, 5000);
      });

    setTweetMessage("");
    setDescription("");
  };

  const addResult = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      // "Authorization": "" +token
    };

    axios
      .post("http://localhost:5000/product", result, { headers })
      .then((response) => {
        // console.log("Success ========>", response);
        // setResult({});
        setDetails(true);
        
      })
      .catch((error) => {
        console.log("Error ========>", error);
        // setError("Failed to add.");
        setResult({});
        const timer = setTimeout(() => {
          setError("");
        }, 5000);
      });
    
    setTweetMessage("");
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
            placeholder="Enter movie/series name..."
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Search
        </Button>
        {error}
      </form>
      {typeof result.title != "undefined" && (
        <Card
          className="login__card"
          variant="outlined"
          style={{ height: "700px" }}
          onClick={addResult}
        >
          <CardContent>
            <h3>{result.title}</h3>
            <p>Year: {result.year}</p>
            <p>Writer: {result.writer}</p>
            <p>Director: {result.director}</p>
            {/* <p>{result.ratings}</p> */}
            <p>Type: {result.type_of}</p>
            {/* <p>{result.imdbID}</p> */}
            <img src={result.poster} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SearchBox;
