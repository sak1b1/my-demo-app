import React, { forwardRef, useContext, useState } from "react";
import "../styles/Post.css";
import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import AppContext from "../AppContext";
import Comment from "./Comment";
import MainHelper from "../helper/MainHelper";
import FlipMove from "react-flip-move";

const Details = forwardRef(
  (
    {
      id,
      title,
      year,
      writer,
      director,
      poster,
      ratings,
      type_of,
      imdb_id,
      comments,
      showComments,
    },
    ref
  ) => {
    const {
      postList,
      setPostList,
      accessToken,
      setAccessToken,
      error,
      setError,
    } = useContext(AppContext);
    const [commentBox, setCommentBox] = useState("");
    // console.log(postList);

    const addComment = (e) => {
      e.preventDefault();

      const user = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : "default";

      const token = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : "";
      const headers = {
        "Content-Type": "application/json",
        Authorization: "" + token,
      };

      axios
        .post(
          "http://localhost:5000/comment",
          {
            content: String(commentBox),
            product_id: id,
            posted_by: user,
          },
          { headers }
        )
        .then((response) => {
          console.log("Success ========>", response);

          axios
            .get("http://localhost:5000/product", { headers })
            .then((response) => {
              // console.log("Success ========>", response);
              const arr = MainHelper(response);
              setPostList(arr);
              console.log(accessToken);
            });
        })
        .catch((error) => {
          // console.log("Error ========>", error);
          setError("Failed to add comment.");
          const timer = setTimeout(() => {
            setError("");
          }, 5000);
        });

      setCommentBox("");
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__body">
          <Card className="" variant="outlined" style={{}}>
            <CardContent>
              <h3>{title}</h3>
              <p>Year: {year}</p>
              <p>Writer: {writer}</p>
              <p>Director: {director}</p>
              {/* <p>{result.ratings}</p> */}
              <p>Type: {type_of}</p>
              {/* <p>{result.imdbID}</p> */}
              <img src={poster} />
              {/* <p>{comments.length}</p> */}
            </CardContent>
          </Card>
          {showComments == true && (
            <div>
              <FlipMove>
                {comments.map(function (comment, idx) {
                  return (
                    <Comment
                      content={comment.content}
                      posted_by={comment.posted_by}
                    />
                  );
                })}
              </FlipMove>

              <input
                onChange={(e) => setCommentBox(e.target.value)}
                value={commentBox}
                placeholder="Add a review.."
                type="text"
                className="post__commentBox"
              />
              <Button
                onClick={addComment}
                type="submit"
                className="post__addCommentButton"
              >
                Add
              </Button>
            </div>
          )}

          <div className="post__footer"></div>
        </div>
      </div>
    );
  }
);

export default Details;
