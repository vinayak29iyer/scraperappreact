import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons'; 

import './SideNavBar.scss';
import scapperLogoImg from '../../assets/images/favicon.ico'
// scapper-img.jpg';

const SideNavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  

  // Toggle on small screen, and ensure it closes on navigation
  useEffect(() => {
    const shouldOpen = window.innerWidth < 768; // Open only on small screens
    setIsOpen(shouldOpen);
  }, [location]); // Dependency on location ensures closure on navigation

  const handleToggle = () => {
    if (window.innerWidth <= 768) { // Only toggle on small screens
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to relogin once you confirm!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  }
  

  return (
    <>
    <button className={`side-nav-bar-toggle-button ${isOpen ? 'open' : 'closed'}`} onClick={handleToggle}>
        ☰
    </button>
    <div className={`side-nav-bar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <img src={scapperLogoImg} alt="Your Logo" />
      </div>

      

      <ul className="nav-links">
      {/* {!isOpen && ( */}
        <><li className={location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </Link>
            </li>
            {/* <li className={location.pathname === '/userlist' || '/usersave' ? 'active' : ''}> */}
            <li className={['/userlist','/usersave'].includes(location.pathname) ? 'active' : ''}>
              <Link to="/userlist">
                <FontAwesomeIcon icon={faHome} /> List Users
              </Link>
            </li>
            {/* <li className={location.pathname === '/usersave' ? 'active' : ''}>
              <Link to="/usersave">
                <FontAwesomeIcon icon={faHome} /> Save Users
              </Link>
            </li> */}
            {/* <li className={location.pathname === '/settings' ? 'active' : ''}>
                <Link to="/about">
                  <FontAwesomeIcon icon={faSignOutAlt} /> About
                </Link>
              </li> */}
              <li className={location.pathname === '/settings' ? 'active' : ''}>
                <Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
              </li></>
      {/* )} */}
        
        
        {/* ...other links */}
      </ul>
    </div>
      </>
  );
}

export default SideNavBar;
