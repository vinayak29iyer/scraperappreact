import React from 'react';
import SideNavBar from '../partials/SideNavBar';
import FormContents from './FormContents';
import './FormContents.scss';

function App() {
  return (
    <div className="app-container">
      <SideNavBar />
      <div className="content">
        <FormContents />
      </div>
    </div>
  );
}

export default App;
