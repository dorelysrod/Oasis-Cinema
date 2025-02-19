import { useState, useEffect, useContext } from "react";
import BookingContext from "../context/BookingContext";
import "../styles/BookingForm.css";

function BookingForm({ movie, navigate }) {
  const { setBookingDetails, showtime, numTickets, userDetails } = useContext(BookingContext);

  const [localShowtime, setLocalShowtime] = useState(showtime || "");
  const [localNumTickets, setLocalNumTickets] = useState(numTickets || 1);
  const [bookingDate, setBookingDate] = useState("");
  const [name, setName] = useState(userDetails?.name || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [confirmEmail, setConfirmEmail] = useState(userDetails?.confirmEmail || "");
  const [emailError, setEmailError] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const savedBooking = JSON.parse(localStorage.getItem("bookingDetails"));
    if (savedBooking) {
      setLocalShowtime(savedBooking.showtime || "");
      setLocalNumTickets(savedBooking.numTickets || 1);
      setBookingDate(savedBooking.bookingDate || "");
      setName(savedBooking.userDetails?.name || "");
      setEmail(savedBooking.userDetails?.email || "");
      setConfirmEmail(savedBooking.userDetails?.confirmEmail || "");
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const min = today.toISOString().split("T")[0];
    const max = new Date(today.setDate(today.getDate() + 7)).toISOString().split("T")[0];
    setMinDate(min);
    setMaxDate(max);
  }, []);

  const handleEmailValidation = (emailValue, confirmEmailValue) => {
    setEmailError(emailValue !== confirmEmailValue ? "Emails do not match." : "");
  };

  const handleBookingSubmit = () => {
    if (!movie) {
      alert("Please select a movie first.");
      return;
    }

    if (localShowtime && localNumTickets && bookingDate && name && email && !emailError) {
      setBookingDetails(movie, localShowtime, localNumTickets, { name, email, confirmEmail });

      navigate("/thank-you", {
        state: {
          selectedMovie: movie,
          selectedShowtime: localShowtime,
          numTickets: localNumTickets,
          bookingDate,
          name,
          email,
        },
      });
    } else {
      alert("Please fill in all the fields correctly.");
    }
  };

  return (
    <div className="booking-form">
      <h3>Book Your Tickets</h3>
      {movie ? <h4>{movie.title}</h4> : <p>Please select a movie first.</p>}

      <label htmlFor="name">Full Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <label htmlFor="email">Email Address:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          handleEmailValidation(e.target.value, confirmEmail);
        }}
        placeholder="Enter your email"
      />

      <label htmlFor="confirm-email">Confirm Email:</label>
      <input
        type="email"
        id="confirm-email"
        value={confirmEmail}
        onChange={(e) => {
          setConfirmEmail(e.target.value);
          handleEmailValidation(email, e.target.value);
        }}
        placeholder="Confirm your email"
      />
      {emailError && <span className="error">{emailError}</span>}

      <label htmlFor="showtime">Select Showtime:</label>
      <select
        id="showtime"
        value={localShowtime}
        onChange={(e) => setLocalShowtime(e.target.value)}
      >
        <option value="">Select Showtime</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="03:00 PM">03:00 PM</option>
        <option value="06:00 PM">06:00 PM</option>
        <option value="09:00 PM">09:00 PM</option>
      </select>

      <label htmlFor="tickets">Number of Tickets:</label>
      <input
        type="number"
        id="tickets"
        value={localNumTickets}
        min="1"
        max="10"
        onChange={(e) => setLocalNumTickets(e.target.value)}
      />

      <label htmlFor="booking-date">Booking Date:</label>
      <input
        type="date"
        id="booking-date"
        value={bookingDate}
        min={minDate}
        max={maxDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />

      <button onClick={handleBookingSubmit} disabled={!movie}>
        {movie ? "Pay Now" : "Select a Movie First"}
      </button>
    </div>
  );
}

export default BookingForm;
