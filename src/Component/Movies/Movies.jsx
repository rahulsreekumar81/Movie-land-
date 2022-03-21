import React, { useState, useEffect } from "react";
import SingleContent from "../SingleContent/SingleContent";
import CustomPagination from "../CustomPagination/CustomPagination";
import axios from "axios";
import Genres from "../Genres/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(400);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    //console.log(data);
    setContent(data.results);
    // setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pagetitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
        setGenres={setGenres}
      />
      <div className="trending">
        {content &&
          content.map((con) => (
            <SingleContent
              key={con.id}
              id={con.id}
              poster={con.poster_path}
              title={con.title || con.name}
              date={con.first_air_date || con.release_date}
              media_type="movie"
              vote_avg={con.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
