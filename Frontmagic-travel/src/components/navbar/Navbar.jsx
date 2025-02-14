import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);

  const notify = () => {
    toast.success("Logged out");
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-light bg-light ${
        navbar ? "active" : ""
      }`}
    >
      <ToastContainer autoClose={800} />

      <div className="container">
        <Link className="navbar-brand" to="/">
          Magic Travel
        </Link>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {user ? (
            <>
              <li className="nav-item me-3">
                <Link to="/profile" className="nav-link btn px-3 btn-md btn-primary">
                  Mi Cuenta
                </Link>
              </li>
              <li
                className="nav-item me-3"
                onClick={() => {
                  notify();
                  setTimeout(() => {
                    window.location.reload();
                  }, 800);
                  localStorage.setItem("user", null);
                }}
              >
                <a href="##" className="nav-link btn px-2 btn-md d-flex align-items-center">
                  <i className="bx bx-power-off me-1"></i> {user.username}
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item me-3">
              <Link className="nav-link btn px-2 btn-md login-btn" to="/login">
                Iniciar Sesion <i className="bx bx-log-in-circle"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;