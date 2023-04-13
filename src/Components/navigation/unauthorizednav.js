import { Link } from "react-router-dom";

export default function UnauthorizedNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">BadBank</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
        <a className="nav-link" href="/signup/">Create Account</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="/signin/">Sign In</a>
        </li>
      </ul>
      </div>
    </nav>
  );
}