import React, { useState, useEffect, useContext } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "../styles/Demo.css";
// import db from "./firebase";
import FlipMove from "react-flip-move";
import axios from 'axios';
import AppContext from '../AppContext';

function Demo() {

const [posts, setPosts] = useState([]);
const { postList, setPostList } = useContext(AppContext);



//   useEffect(() => {

//     const headers = {
//         'Content-Type': 'text/plain'
//     };

//     axios.get(
//         'http://localhost:5000/product'
//         ,
//         {headers}
//         ).then(response => {
//             console.log("Success ========>");

//             let item;
//             let arr = [];
//             for (let i=0; i < response.data.length; i++) {

//                 item=response.data[i];
//                 arr.push(
//                     {"name": String(item.name),
//                     "id": String(item.id)
//                     }
//                 );

//             }

//             setPostList(arr);
//             setPosts(response.data);
            
            
//         })
//         .catch(error => {
//             console.log("Error ========>", error);
//         }
//     )


//   }, []);

  return (
    <div className="demo-1">
        <h2>Demo </h2>
    </div>
  );
}

export default Demo;