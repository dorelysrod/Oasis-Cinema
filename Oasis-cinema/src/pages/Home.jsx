import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import BookingContext from "../context/BookingContext";
import useCarousel from "../hooks/useCarousel";
import useMovieSelection from "../hooks/useMovieSelection";

import "../styles/Home.css";

function Home() {
  const { movies, loading, error } = useContext(BookingContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { selectedIndex, handlePrev, handleNext } = useCarousel(movies, isMobile);
  const { hoveredMovie, setHoveredMovie, handleMovieSelect } = useMovieSelection();

  if (loading) {
    return (
        <Spinner />
    );
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <div>
      <Navbar />
      
      <div className="home-container">
        <div
          className="background"
          style={{
            backgroundImage: hoveredMovie
              ? `url(https://image.tmdb.org/t/p/original${hoveredMovie.backdrop_path})`
              : "none",
          }}
        ></div>

        <div className="carousel-container">
          <button className="nav-button left" onClick={handlePrev}>❮</button>
          <div className="carousel">
            {movies?.slice(selectedIndex, selectedIndex + (isMobile ? 1 : 3)).map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-item"
                onMouseEnter={() => setHoveredMovie(movie)}
                onMouseLeave={() => setHoveredMovie(null)}
                onClick={() => handleMovieSelect(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <p id="movie-title">{movie.title}</p>
              </Link>
            ))}
          </div>
          <button className="nav-button right" onClick={handleNext}>❯</button>
        </div>
      </div>

      <Footer /> 
    </div>
  );
}

export default Home;
