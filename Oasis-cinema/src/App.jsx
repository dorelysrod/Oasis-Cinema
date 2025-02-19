import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import "./App.css";

function App() {
  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
}

export default App;