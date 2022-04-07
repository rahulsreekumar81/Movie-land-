import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set, get) => ({
  watch: [],
  watchLater: async (id) => {
    let watch = get().watch;
    const movie = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));

    if (!watch.find((item) => item.itemId === id)) {
      set((state) => ({
        watch: [...state.watch, { movie, itemId: id, quantity: 1 }],
      }));
    }
  },

  removeWatch: (id) => {
    set((state) => ({
      watch: state.watch.filter((item) => item.itemId !== id),
    }));
    window.location.reload();
  },
  clearAllWatchLater: () => {
    set((state) => ({
      watch: [],
    }));
  },
});

const useStore = create(devtools(persist(store)));

export default useStore;
