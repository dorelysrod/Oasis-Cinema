import { useEffect, useState } from "react";

function useFooterVisibility() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10);
    };

    const handleResize = () => {
      handleScroll(); 
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  return showFooter;
}

export default useFooterVisibility;

