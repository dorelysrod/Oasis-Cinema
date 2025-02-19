import { useState, useContext } from "react";
import BookingContext from "../context/BookingContext";

function useMovieSelection() {
  const { setBookingDetails } = useContext(BookingContext);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setBookingDetails(movie, "", 1, { name: "", email: "" });
  };

  return { hoveredMovie, setHoveredMovie, handleMovieSelect };
}

export default useMovieSelection;
