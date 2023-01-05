import './Navbar.scss';

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Navbar = ({ leftItems }) => {
  // This is how you interact with Redux store with hooks
  // syntax:
  // 'user' is the name of the slice (see userSlice.js)
  // 'email' is a field in the slice
  const email = useSelector((state) => state.user.email);

  return (
    <>
      {email && (
        <div className="nav">
          <div className="nav-title-container">
            {Object.entries(leftItems).map((e) => {
              const [title, url] = e;
              return (
                <Link to={url} style={{ textDecoration: 'none' }}>
                  <div className="card-button nav-title" key={uuid()}>
                    {title}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="logout-button-container">
            {email ? (
              <a
                className="card-button logout-button"
                href="http://localhost:8080/auth/logout"
              >
                logout
              </a>
            ) : (
              <a href={`http://localhost:8080/auth/google`}>log in</a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
