import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookingContext from "../context/BookingContext";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import BookingForm from "../components/BookingForm";
import "../styles/QuickBooking.css";

function QuickBooking() {
  const navigate = useNavigate();
  const { movies, setBookingDetails, loading, error } = useContext(BookingContext);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (loading) {
    return <Spinner />;
  }
  if (error) return <div>Error loading movies</div>;

  const handleMovieSelection = (event) => {
    const movieId = event.target.value;
    const selected = movies.find((movie) => movie.id === parseInt(movieId));
    setSelectedMovie(selected);

    if (selected) {
      setBookingDetails(selected, "", 1, { name: "", email: "" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="quick-booking-container">
        <div className="progress-bar-container">
          <div className="progress-step">
            <div className="circle">1</div>
            <p>Select Movie</p>
          </div>
          <div className="connector"></div>
          <div className="progress-step">
            <div className="circle">2</div>
            <p>Choose Tickets</p>
          </div>
          <div className="connector"></div>
          <div className="progress-step">
            <div className="circle">3</div>
            <p>Confirm & Pay</p>
          </div>
        </div>

        <div className="step-content">
          <h2>Select a Movie</h2>
          <select
            value={selectedMovie ? selectedMovie.id : ""}
            onChange={handleMovieSelection}
            className="movie-select"
          >
            <option value="">Select a movie</option>
            {movies?.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {selectedMovie && (
          <div className="booking-form">
            <BookingForm movie={selectedMovie} navigate={navigate} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default QuickBooking;

