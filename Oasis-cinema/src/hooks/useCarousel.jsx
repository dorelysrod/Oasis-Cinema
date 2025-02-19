import { useState } from "react";

function useCarousel(movies, isMobile) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    const step = isMobile ? 1 : 3;
    setSelectedIndex((prev) => {
      if (prev <= 0) return 0;
      return prev - step < 0 ? 0 : prev - step;
    });
  };

  const handleNext = () => {
    const step = isMobile ? 1 : 3;
    setSelectedIndex((prev) => {
      const maxIndex = Math.max(0, movies.length - 3);
      return prev + step > maxIndex ? maxIndex : prev + step;
    });
  };

  return { selectedIndex, handlePrev, handleNext };
}

export default useCarousel;
