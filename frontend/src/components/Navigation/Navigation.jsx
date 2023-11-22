// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <ul>
      <li>
        <NavLink id='icon' exact='true' to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton id='profile' user={sessionUser} />
        </li>
      )}
    </ul>
    <hr></hr>
      </>
  );
}

export default Navigation;
