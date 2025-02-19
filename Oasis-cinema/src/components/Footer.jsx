import useFooterVisibility from "../hooks/useFooterVisibility";
import "../styles/Footer.css";

function Footer() {
  const showFooter = useFooterVisibility();

  return (
    <footer className="footer">
      <div className={`footer-container ${showFooter ? "visible" : ""}`}>
        <p>&copy; 2025 Oasis Cinema. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;




