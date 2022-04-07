import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
//Icons for the Bottom-Nav from Material-UI
import MovieIcon from "@mui/icons-material/Movie";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import { makeStyles } from "@material-ui/core";
import useStore from "../../store/store";
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
  const watch = useStore((state) => state.watch);
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
    } else if (value === 4) {
      navigate("/watchlater");
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
        <BottomNavigationAction
          label="Watchlist"
          style={{ color: "white" }}
          icon={
            <Badge badgeContent={watch.length} color="error">
              <WatchLaterIcon />
            </Badge>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
