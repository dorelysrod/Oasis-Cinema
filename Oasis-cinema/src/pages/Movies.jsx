import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import BookingContext from "../context/BookingContext";
import useFooterVisibility from "../hooks/useFooterVisibility";
import "../styles/Movies.css";

function Movies() {
  const { movies, loading, error } = useContext(BookingContext);
  const showFooter = useFooterVisibility();

  if (loading) {
    return (
        <Spinner />
    );
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="movies-container">
        <h1 className="movie-title">Movies</h1>
        <div className="movie-grid">
          {movies?.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className={`footer-container ${showFooter ? "visible" : ""}`}>
        <Footer />
      </div>
    </div>
  );
}

export default Movies;
