import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAddGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemoveGenre = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  //console.log(genres);
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            color="secondary"
            label={genre.name}
            onDelete={() => handleRemoveGenre(genre)}
            style={{ margin: 2 }}
            clickable
            size="small"
            key={genre.id}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            color="primary"
            onClick={() => handleAddGenres(genre)}
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            size="small"
            key={genre.id}
          />
        ))}
    </div>
  );
};

export default Genres;
