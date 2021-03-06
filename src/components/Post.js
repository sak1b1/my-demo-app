import React, { forwardRef, useContext, useState } from "react";
import "../styles/Post.css";
import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import AppContext from "../AppContext";
import Comment from "./Comment";
import MainHelper from "../helper/MainHelper";
import FlipMove from "react-flip-move";

const Post = forwardRef(
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
    const [commentsVisible, SetCommentsVisible] = useState(showComments);
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
          //console.log("Success ========>", response);

          axios
            .get("http://localhost:5000/product", { headers })
            .then((response) => {
              // console.log("Success ========>", response);
              const arr = MainHelper(response);
              setPostList(arr);
              for (let i = 0; i < postList.length; i++) {
                if (postList[i].id == id) {
                  const singlePost = postList[i];
                  setPostList([singlePost]);
                }
              }
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

    const viewResult = (e) => {
      e.preventDefault();

      SetCommentsVisible(true);
      for (let i = 0; i < postList.length; i++) {
        if (postList[i].id == id) {
          const singlePost = postList[i];
          setPostList([singlePost]);
        }
      }
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__body">
          <Card className="" variant="outlined" style={{}} onClick={viewResult}>
            <CardContent>
              <h3>{title}</h3>
              <p>Year: {year}</p>
              <p>Writer: {writer}</p>
              <p>Director: {director}</p>

              <p>Type: {type_of}</p>

              <img src={poster} />
            </CardContent>
          </Card>
          {commentsVisible == true && (
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

export default Post;
