import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleContent from "../SingleContent/SingleContent";
import CustomPagination from "../CustomPagination/CustomPagination";
import "./style.css";
const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    // console.log(data);
    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pagetitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((con) => (
            <SingleContent
              key={con.id}
              id={con.id}
              poster={con.poster_path}
              title={con.title || con.name}
              date={con.first_air_date || con.release_date}
              media_type={con.media_type}
              vote_avg={con.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
