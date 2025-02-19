import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate(); 

  const goHome = () => {
    navigate("/");  
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-header">Oops! Page Not Found</h1>
      <p className="notfound-message">
        Sorry, the page you're looking for does not exist.
      </p>
      <button onClick={goHome} className="notfound-link">
        Go back to Home
      </button>
    </div>
  );
};

export default NotFound;
