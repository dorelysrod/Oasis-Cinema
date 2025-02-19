import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import QuickBooking from "../pages/QuickBooking";
import ThankYou from "../pages/ThankYou"; 
import NotFound from "../pages/NotFound"; 

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/quick-booking" element={<QuickBooking />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
