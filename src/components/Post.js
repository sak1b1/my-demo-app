import React, { forwardRef, useContext, useState } from "react";
import "../styles/Post.css";
import { Avatar, Button } from "@material-ui/core";
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

const Post = forwardRef(
  (
    {
      displayName,
      username,
      verified,
      text,
      image,
      avatar,
      comments,
      id,
      like,
    },
    ref
  ) => {
    const { postList, setPostList, accessToken, setAccessToken, error, setError } = useContext(AppContext);
    const [commentBox, setCommentBox] = useState("");
    // console.log(postList);

    const addComment = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "" +token
      };

      axios
        .post(
          "http://localhost:5000/comment",
          {
            content: String(commentBox),
            product_id: id,
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
              console.log(accessToken);
              // setAccessToken("yeeeeeeee");
            });
        })
        .catch((error) => {
          console.log("Error ========>", error);
        setError("Failed to add comment.");
        const timer = setTimeout(() => {
            setError("");
          }, 5000);
        });

      setCommentBox("");
    };

    const addLike = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "" +token
      };

      axios
        .put(
          "http://localhost:5000/add_like/" + String(id),

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
        });

      setCommentBox("");
    };

    const deleteTweet = (e) => {
      e.preventDefault();
      console.log("delete korlam! " + username);

      // setPostList([...postList, {"name":String(Math.random())}]);

      let arr1 = [];

      for (let i = 0; i < postList.length; i++) {
        if (String(postList[i].id) !== String(username)) {
          arr1.push(postList[i]);
        }
      }

      setPostList(arr1);

      const headers = {
        "Content-Type": "application/json",
      };

      axios
        .delete(
          "http://localhost:5000/product/" + String(id),

          { headers }
        )
        .then((response) => {
          console.log("Success ========>", response);
        })
        .catch((error) => {
          console.log("Error ========>", error);
        });
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <FlipMove>
            {comments.map(function (comment, idx) {
              return <Comment content={comment.content} />;
            })}
          </FlipMove>

          <input
            onChange={(e) => setCommentBox(e.target.value)}
            value={commentBox}
            placeholder="Add a comment.."
            type="text"
            className="post__commentBox"
            onKeyPress={(ev) => {
              if (ev.ctrlKey && ev.key === 'Enter') {
               return this.setCommentBox(ev.target.value); // here was the mistake
                
              }
            }}
          />
          <Button
            onClick={addComment}
            type="submit"
            className="post__addCommentButton"
          >
            Add
          </Button>

          <div className="post__footer">
            {/* <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" /> */}

            {like > 0 ? (
              <span className="post__headerSpecial">
                <div className="post__likesWithCount">
                  <FavoriteIcon
                    onClick={addLike}
                    className="post__redFavoriteIcon"
                    fontSize="small"
                  />
                  <span>{like}</span>
                </div>
              </span>
            ) : (
              <span className="post__headerSpecial">
                <FavoriteBorderIcon onClick={addLike} fontSize="small" />
              </span>
            )}

            <DeleteIcon
              fontSize="small"
              onClick={deleteTweet}
              className="post__deleteButton"
            />

            {/* <PublishIcon fontSize="small" /> */}
            {/* <Button
              onClick={deleteTweet}
              type="submit"
              className="tweetBox__deleteButton"
              startIcon={<DeleteIcon />}
              fontSize="small"
            >
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
