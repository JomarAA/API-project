// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <nav className="navigation-container">
        <div className="home-link">
          <NavLink exact='true' to="/">
            <div className='home-icon'>
              <i className="fa-brands fa-airbnb fa-flip"></i>
            </div>
          </NavLink>
          <div className='home-text'>
            <NavLink exact='true' to="/">
              FlairBnB
            </NavLink>
          </div>
        </div>
        <div className='user-actions'>
          <div className='create-spot-option'>
            <NavLink exact='true' to='/spots/new'>
              {sessionUser && <p>Create a New Spot</p>}
            </NavLink>
          </div>
          <div className="profile-link">
            {isLoaded && (
              <ProfileButton user={sessionUser} />
            )}
          </div>
        </div>
      </nav>
      <hr></hr>
    </>
  );
}

export default Navigation;
