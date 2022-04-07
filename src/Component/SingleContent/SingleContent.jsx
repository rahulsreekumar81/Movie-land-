import { Badge, Grid } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import Button from "@material-ui/core/Button";
import "./SingleContent.css";
import useStore from "../../store/store";
const SingleContent = ({ id, poster, title, date, media_type, vote_avg }) => {
  const watchlater = useStore((state) => state.watchlater);
  return (
    <div className="media">
      <Badge
        badgeContent={vote_avg}
        color={vote_avg > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
        <span className="subTitle">{id}</span>
      </span>
      <div className="addButton">
        <Grid container justifyContent="center">
          <Button
            onClick={() => watchlater(id)}
            color="primary"
            size="small"
            type="submit"
            variant="contained"
          >
            Watch Later
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default SingleContent;
