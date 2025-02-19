import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import "../styles/MovieDetails.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(id);
    fetchTrailer(id);
  }, [id]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      const trailerVideo = data.results.find((video) => video.type === "Trailer");
      setTrailer(trailerVideo);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleBookingClick = () => {
    setShowBooking((prev) => !prev);
    console.log("Booking Form Toggle:", !showBooking);
  };

  return (
    <div>
      <Navbar />
      <div className="movie-details">
        {movie && (
          <div className="movie-details-container">
             <h1 className="movie-title">{movie.title}</h1>
            {trailer && (
              <div className="trailer-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube trailer"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="movie-info">
             
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Category:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
              <p>{movie.overview}</p>
              <button className="book-now-button" onClick={handleBookingClick}>
                {showBooking ? "Close Booking" : "Book Now"}
              </button>
            </div>
            {showBooking && (
              <>
                <p>Booking Form is Open</p>
                <BookingForm key={showBooking} movie={movie} navigate={navigate} />
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetails;



