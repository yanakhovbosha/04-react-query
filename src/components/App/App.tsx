import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };
  const handleMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoader(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid onSelect={handleMovie} movies={movies} />
      )}
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
