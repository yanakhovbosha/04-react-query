import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovie, setIsMovie] = useState<Movie | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleMovie = (movie: Movie) => {
    setIsMovie(movie);
    openModal();
  };

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoader(true);
      setIsError(false);
      setIsEmpty(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        setIsEmpty(true);
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
      {isEmpty && <Toaster />}
      {isError && <ErrorMessage />}
      {isModalOpen && isMovie && (
        <MovieModal movie={isMovie} onClose={closeModal} />
      )}
    </div>
  );
}
