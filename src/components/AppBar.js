// import React from "react";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import GitHubIcon from "@material-ui/icons/GitHub";
import "../styles/AppBar.css";

// export default function ButtonAppBar() {
//   return (
//     <div className="appBar__root">
//       <AppBar position="static" className="appBar__appBar">
//         <Toolbar>
//           <IconButton edge="start" color="white" aria-label="menu">
//             <GitHubIcon />
//           </IconButton>
          
//         </Toolbar>
//         <Button variant="contained" className="appBar__button">Logout</Button>
//       </AppBar>
//     </div>
//   );
// }


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignItems: "left",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className="appBar__root">
      <AppBar position="static" className="appBar__appBar">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            My APP
          </Typography>
          <Button className="appBar__button" color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

