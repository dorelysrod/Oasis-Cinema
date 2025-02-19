import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
        <img src="/oasis-logo.png" alt="Oasis Cinema Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links">
         <Link to="/movies">Movies</Link>
          <Link to="/quick-booking">Quick Booking</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
