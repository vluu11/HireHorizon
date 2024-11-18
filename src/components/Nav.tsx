import { NavLink } from 'react-router-dom';
import './Nav.css'; 

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/SavedCandidates"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
