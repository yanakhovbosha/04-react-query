import axios from "axios";
import { Movie } from "../types/movie";

interface MovieResults {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (query: string, page: number) => {
  const response = await axios.get<MovieResults>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
        page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  console.log(response.data);

  return response.data;
};
