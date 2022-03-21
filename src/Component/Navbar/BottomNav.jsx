import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
//Icons for the Bottom-Nav from Material-UI
import MovieIcon from "@mui/icons-material/Movie";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          style={{ color: "white" }}
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          label="Movies"
          style={{ color: "white" }}
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          label="Series"
          style={{ color: "white" }}
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          label="Search"
          style={{ color: "white" }}
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
