const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GenreID = selectedGenres.map((g) => g.id);
  return GenreID.reduce((acc, cur) => acc + " ," + cur);
};

export default useGenre;
