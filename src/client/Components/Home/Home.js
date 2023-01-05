import './Home.scss';

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Card from './Card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Home = () => {
  const [arrCards, setArrCards] = useState([]);
  const collection_id = useSelector((state) => {
    // console.log('is colleciton_id right?',  state.collection);
    return state.collection.collection_id;
  });

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'post',
      withCredentials: true,
      data: { collection_id },
      url: 'http://localhost:8080/api/collections/cards',
    }).then((res) => {
      setArrCards(res.data);
    });
  }, []);

  return (
    <div className="card-holder-container">
      <Link to="/createCard" style={{ textDecoration: 'none' }}>
        <div id="create-new-card" className="card-button create-new-card">
          Create New Card <strong>+</strong>
        </div>
      </Link>

      <div id="card-container" className="card-container">
        {arrCards.map((card) => (
          <Card data={card} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Home;
