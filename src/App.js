import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header";
import Trending from "./Component/Trending/Trending";
import Movies from "./Component/Movies/Movies";
import Series from "./Component/Series/Series";
import SearchPage from "./Component/Search/SearchPage";
import SimpleBottomNavigation from "./Component/Navbar/BottomNav";
import WatchLater from "./Component/WatchLater/WatchLater";
function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlater" element={<WatchLater />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
