import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField, Button, Tab, Tabs } from "@material-ui/core";
import React from "react";
import axios from "axios";
import "./style.css";
import { useState, useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import SingleContent from "../SingleContent/SingleContent";
import { Search } from "@material-ui/icons/";

const SearchPage = () => {
  const [type, setType] = useState();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={{ darkTheme }}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <Search fontSize="large" />
          </Button>
        </div>
        {/* Tab component in material UI to switch between TV series and movie */}
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      {/*  Bug after taking search component , chip component does not works properly, need fix*/}
      <div className="trending">
        {content &&
          content.map((con) => (
            <SingleContent
              key={con.id}
              id={con.id}
              poster={con.poster_path}
              title={con.title || con.name}
              date={con.first_air_date || con.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={con.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {/* Only load pagination if number of page is greater than 1 */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default SearchPage;
