import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/ThankYou.css";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedMovie, selectedShowtime, numTickets } = location.state || {};

  if (!selectedMovie || !selectedShowtime || !numTickets) {
    alert("Please complete your booking details first.");
    navigate("/"); 
    return null; 
  }

  const goHome = () => navigate("/");

  return (
    <div className="thank-you-container">
      <Navbar />
      <div className="thank-you-content">
        <h1>Thank You for Your Booking!</h1>
        <h2>Movie: {selectedMovie.title}</h2>
        <p>Showtime: {selectedShowtime}</p>
        <p>Number of Tickets: {numTickets}</p>
        <p>Your tickets have been sent to your email.</p>
        <button onClick={goHome} className="home-button">Go Home</button>
      </div>
      <Footer />
    </div>
  );
}

export default ThankYou;

