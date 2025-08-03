import axios from "axios";
import { Movie } from "../types/movie";

interface MovieResults {
  results: Movie[];
}

const myKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResults>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data.results;
};
