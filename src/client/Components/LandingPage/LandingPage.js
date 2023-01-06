import './LandingPage.scss';

import React from 'react';
import landingPageImage from '../../assets/animation.png';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="text-image-container">
        <div className="text-container">
          "Learning is the key to unlocking your full potential and achieving
          greatness."
        </div>
        <div className="image-container">
          <img className="landing-image" alt="" src={landingPageImage} />
        </div>
      </div>
      <a
        className="card-button login-button"
        id="landing-page-login"
        href={`http://localhost:8080/auth/google`}
      >
        Login
      </a>
    </div>
  );
};

export default LandingPage;
