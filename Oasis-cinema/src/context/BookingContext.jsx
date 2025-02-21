import { createContext, useState, useEffect } from 'react';
import useFetch from "../hooks/useFetch";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const { data: movies, error, loading } = useFetch(API_URL);

  const [movieDetails, setMovieDetails] = useState(null);
  const [showtime, setShowtime] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", confirmEmail: "" });

  useEffect(() => {
    const savedBooking = JSON.parse(localStorage.getItem('bookingDetails'));
    if (savedBooking) {
      setMovieDetails(savedBooking.movieDetails);
      setShowtime(savedBooking.showtime);
      setNumTickets(savedBooking.numTickets);
      setUserDetails(savedBooking.userDetails);
    }
  }, []);

  const setBookingDetails = (movie, showtime, tickets, user) => {
    setMovieDetails(movie);
    setShowtime(showtime);
    setNumTickets(tickets);
    setUserDetails(user);

    const bookingDetails = {
      movieDetails: movie,
      showtime: showtime,
      numTickets: tickets,
      userDetails: user,
    };
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  };

  return (
    <BookingContext.Provider
      value={{
        movies,
        movieDetails,
        showtime,
        numTickets,
        userDetails,
        setBookingDetails,
        loading,
        error
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
