import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNavBar from '../partials/SideNavBar';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';

function UserManagement() {
  const location = useLocation();
  return (
    <div className="app-container">
      <SideNavBar />
      <div className="content">
        {/* <FormContents /> */}
       { location.pathname === '/userlist' ? <UserList />: <RegistrationForm /> }
      </div>
    </div>
  );
}

export default UserManagement;
